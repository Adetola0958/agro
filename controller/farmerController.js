"use strict"

const Farmer = require("../model/farmers")
const Produce = require("../model/produce")

class App {
    postFarmerPage = async(req, res, next) => {
        try {
            const{firstName, lastName, middleName, mobileNumber, email, password, farmNumber, streetName, state, gender} = req.body
            const farmer = await new Farmer({
                firstName : firstName,
                lastName : lastName,
                middleName : middleName,
                mobileNumber : mobileNumber,
                email : email,
                password : password,
                location : {
                    farmNumber : farmNumber,
                    streetName : streetName,
                    state : state
                },
                gender: gender
            })
            const registeredFarmer = await farmer.save()
            if(registeredFarmer) {
                res.redirect("farmer-dashboard", { title  : "Dashboard", farmer : farmer })
            }else {
                res.render("/farmer" ({error : "invalid login details"}))
            }
        }catch {
            res.render('/farmer' , {error : errors})
        }
    }
    getFarmerSignIn = (req, res, next) => {
        res.render("farmer-signin", {title : "Sign in Page"})
    }
    postFarmerSignIn = async (req , res , next) => {
        try { 
            // res.send(req.body.email)
            let validFarmer = await Farmer.findOne({email : req.body.email , password : req.body.password})  
            if (validFarmer) {
                req.session.email = validFarmer.email
                res.redirect(303 , '/farmer/dashboard')
            }else {
                res.redirect('farmer-signin' , { error : 'Invalid Login details'})
            }
        }catch(errors) {
            res.render("farmer-signin", {error : errors})
        }
    }
    getFarmerDashboard = async(req , res , next) => {
        if(req.session.email){
            const farmer = await Farmer.findOne({email : req.session.email})
            res.render('farmer-dashboard' , { title  : "Dashboard", farmer : farmer })
        }else{
            res.redirect(303, '/farmer')
        }
    }
    
    getProduces = async(req, res, next) => {
        if(req.session.email) {
            try{
                const farmer = await Farmer.findOne({email : req.session.email})
                let totalProduces = await Produce.find({})
                let displaySize = 10
                let pageCount = Math.ceil(totalProduces.length/displaySize)
                let pageNumber = 0 ,
                skipSize
                if (!req.query.page) {
                    pageNumber = 1
                    skipSize = displaySize*(pageNumber - 1)
                }else {
                    pageNumber = Number(req.query.page) <= pageCount ? Number(req.query.page) : pageCount
                    skipSize = displaySize*(pageNumber - 1)
                }
                Produce.find({farmer : farmer._id})
                .sort([["produceName", "ascending"]])
                .skip(skipSize)
                .limit(displaySize)
                .populate("user")
                .exec(function(err, produce_list) {
                    if(err) {
                        res.status(500).send("Internal Server Error")
                        return
                    }
                    if(produce_list.length == 0) {
                        let produceMessage = {
                            name : "You have not created any produce"
                        }
                        res.render("sell-produce", {title : "Produce-Page", noProduce : produceMessage.name, farmer : farmer})
                        return
                    }else if(produce_list.length > 0) {
                        res.render("sell-produce" , {
                            produces : produce_list,
                            currentPage : pageNumber,
                            pages : pageCount,
                            skipIt : skipSize,
                            title : "Produces",
                            farmer : farmer
                        })
                    }
                })
            }catch(err) {
                res.send(err.message)
            }
        }else {
            res.redirect(303, "/farmer/dashboard")
        }
    }
    postProduces = async(req, res, next) => {
        if(req.session.email) {
            try{
                const farmer = await Farmer.findOne({email : req.session.email})
                const {produceName, quantity, cost} = req.body
                const produce = await new Produce({
                    produceName : produceName,
                    quantity : quantity,
                    cost : cost,
                    farmer : farmer._id
                })
                const uploadedProduce = await produce.save()
                if(uploadedProduce) {
                    res.redirect("/farmer/dashboard/produce")
                    return
                }else {
                    throw {
                        message : "Unable to upload your produce"
                    }
                    return
                }
            }catch(error) {
                res.status(500).send(error.message)
                return
            }
        }else {
            res.redirect(303, "farmer/dashboard")
        }
    }
    getUpdate = (req, res, next) => {
        res.render("produce-update", {title : "Update your produce"})
    }
    getFarmerUpdate = (req, res, next) => {
        res.render("farmer-update", {title : "Update your details"})
    }
    updateFarmer = async(req, res, next) => {
        if(req.session.email) {
            try{
                const farmer = await Farmer.findOne({_id : req.params.farmerId})

                if(farmer) {
                    const updatedFarmer = farmer._id
                    Farmer.findByIdAndUpdate(updatedFarmer, {
                        firstName : req.body.firstName,
                        lastName : req.body.lastName,
                        middleName : req.body.middleName,
                        mobileNumber : req.body.mobileNumber,
                        email : req.body.email,
                        password : req.body.password,
                        location : {
                            farmNumber : req.body.farmNumber,
                            streetName : req.body.streetName,
                            state : req.body.state
                        },
                        gender: req.body.gender
                    }, {new : true, useFindAndModify : false}, (err, item) => {
                        if(updatedFarmer) {
                            res.redirect(303,"/farmer/dashboard")
                            return
                        }else{
                            throw{
                                message : "Fail to upload the record for this produce"
                            }
                        }
                    })
                }else{
                    throw {
                        message : "This Farmer does not exist"
                    } 
                }
            }catch(error) {
                res.send(error.message)
            }
        }else{
			res.send(`You can't access this page.`)
		}
    }
    updateSingleProduce = async(req, res, next) => {
        if(req.session.email) {
            try{
                const produce = await Produce.findOne({_id : req.params.produceId})

                if(produce) {
                    const updatedProduce = produce._id
                    Produce.findByIdAndUpdate(updatedProduce , {
                        produceName : req.body.produceName,
                        quantity : req.body.quantity,
                        cost : req.body.cost
                    }, {new : true, useFindAndModify : false}, (err, item) => {
                        if(updatedProduce) {
                            res.redirect(303, "/farmer/dashboard/produce")
                            return
                        }else {
                            throw{
                                message : "Fail to upload the record for this produce"
                            }
                        }
                    })
                }else {
                    throw {
                        message : "This produce is not found"
                    }
                }
            }catch(error) {
                res.send(error.message)
            }
        }else{
			res.send(`You can't access this page.`)
		}
    }
    getOwnProfile = async (req , res , next) => {
        if(req.session.email){
            try{
                let validFarmer = await Farmer.findOne({_id : req.params.farmer})
                const farmer = await Farmer.findOne({email : req.session.email})
                if(validFarmer){
                    res.render('farmer' , { title  : "Farmer", farmerDB: validFarmer, farmer : farmer})
                }else{
                    throw{
                        message : "You do not exist"
                    }
                }
            }catch(err){
                res.json(err.message)
            }
            
        }else{
            res.redirect(303, '/farmer/dashboard')
        } 
    
    }
    getLogout = (req , res , next ) => {
        try {
            if (req.session.email) {
                delete req.session.email
                res.redirect(303 , '/')
            }else {
                throw new Error("Problem signing out. We will handle this shortly")
            }
        }catch(error) {
            res.status(400).send(error)
        }
    }
    deleteFarmer = async (req, res, next) => {
		if(req.session.email){
			try{
                let farmer = await Farmer.findById(req.params.farmerId)
                if (farmer) {
                    let delFarmer = await Farmer.findByIdAndRemove(farmer._id)
                    if(delFarmer){
                        res.json({message : "Farmer has successfully been deleted"})
                    }else{
                        throw{
                            status : 500,
                            message : "Internal server error"
                        }
                    }
                }else{
                    throw{
                        status : 400,
                        message : "Something went wrong with this request"
                    }
                } 
			}catch(err){
				res.json(err.message)
			}
		}else{
			res.send(`You can't access this page.`)
		}
		
	}

}

const returnApp = new App()

module.exports = returnApp