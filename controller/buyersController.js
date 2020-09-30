"use strict"

const Buyer = require("../model/buyers")
const Produce = require("../model/produce")

class App {
    postBuyerPage = async(req, res, next) => {
        try {
            const{firstName, lastName, middleName, mobileNumber, email, password, houseNumber, streetName, lga, state, gender} = req.body
            const buyer = await new Buyer({
                firstName : firstName,
                lastName : lastName,
                middleName : middleName,
                mobileNumber : mobileNumber,
                email : email,
                password : password,
                location : {
                    houseNumber : houseNumber,
                    streetName : streetName,
                    lga : lga,
                    state : state
                },
                gender: gender
            })
            const registeredBuyer = await buyer.save()
            if(registeredBuyer) {
                res.redirect("buyer-dashboard", { title  : "Dashboard", buyer : buyer })
            }else {
                res.render("/buyer" ({error : "invalid login details"}))
            }
        }catch {
            res.render('/buyer' , {error : errors})
        }
    }
    getBuyerSignIn = (req, res, next) => {
        res.render("buyer-signin", {title : "Sign in Page"})
    }
    postBuyerSignIn = async (req , res , next) => {
        try { 
            // res.send(req.body.email)
            let validBuyer = await Buyer.findOne({email : req.body.email , password : req.body.password})  
            if (validBuyer) {
                req.session.email = validBuyer.email
                res.redirect(303 , '/buyer/dashboard')
            }else {
                res.render('buyer-signin' , { error : 'Invalid Login details'})
            }
        }catch(errors) {
            res.render("buyer-signin", {error : errors})
        }
    }
    getBuyerDashboard = async(req , res , next) => {
        if(req.session.email){
            const buyer = await Buyer.findOne({email : req.session.email})
            res.render('buyer-dashboard' , { title  : "Dashboard", buyer : buyer })
        }else{
            res.redirect(303, '/buyer')
        }
    }
    getProduces = async(req, res, next) => {
        if(req.session.email) {
            try{
                const buyer = await Buyer.findOne({email : req.session.email})
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
                Produce.find({})
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
                            name : "No produce found"
                        }
                        res.render("buy-produce", {title : "Produce-Page", noProduce : produceMessage.name, buyer : buyer})
                        return
                    }else if(produce_list.length > 0) {
                        res.render("buy-produce" , {
                            produces : produce_list,
                            currentPage : pageNumber,
                            pages : pageCount,
                            skipIt : skipSize,
                            title : "Produces",
                            buyer : buyer
                        })
                    }
                })
            }catch(err) {
                res.send(err.message)
            }
        }else {
            res.redirect(303, "/buyer/dashboard")
        }
    }
    getBuyerUpdate = (req, res, next) => {
        res.render("buyer-update", {title : "Update your details"})
    }
    updateBuyer = async(req, res, next) => {
        if(req.session.email) {
            try{
                const buyer = await Buyer.findOne({_id : req.params.buyerId})

                if(buyer) {
                    const updatedBuyer = buyer._id
                    Buyer.findByIdAndUpdate(updatedBuyer, {
                        firstName : req.body.firstName,
                        lastName : req.body.lastName,
                        middleName : req.body.middleName,
                        mobileNumber : req.body.mobileNumber,
                        email : req.body.email,
                        password : req.body.password,
                        location : {
                            farmNumber : req.body.farmNumber,
                            streetName : req.body.streetName,
                            lga : req.body.lga,
                            state : req.body.state
                        },
                        gender: req.body.gender
                    }, {new : true, useFindAndModify : false}, (err, item) => {
                        if(updatedBuyer) {
                            res.redirect(303, "/buyer/dashboard")
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
    getOwnProfile = async (req , res , next) => {
        if(req.session.email){
            try{
                let validBuyer = await Buyer.findOne({_id : req.params.buyer})
                const buyer = await Buyer.findOne({email : req.session.email})
                if(validBuyer){
                    res.render('buyer' , { title  : "Buyer", buyerDB: validBuyer, buyer : buyer})
                }else{
                    throw{
                        message : "You do not exist"
                    }
                }
            }catch(err){
                res.json(err.message)
            }
            
        }else{
            res.redirect(303, '/buyer/dashboard')
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
    deleteBuyer = async (req, res, next) => {
		if(req.session.email){
			try{
                let buyer = await Buyer.findById(req.params.buyerId)
                if (buyer) {
                    let delBuyer = await Buyer.findByIdAndRemove(buyer._id)
                    if(delBuyer){
                        res.redirect(303, "/buyer")
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