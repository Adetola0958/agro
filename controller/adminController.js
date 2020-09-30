"use strict"

const Admin = require('../model/admin')
const Farmer = require('../model/farmers')
const Buyer = require('../model/buyers')
const Produce = require('../model/produce')

class App {
    getAdminLogin = (req, res, next) => {
        res.render("admin", {title : "Admin"})
    }
    postAdminLogin = async(req, res, next) => {
        try{
            const validUser = await Admin.findOne({email : req.body.email, password : req.body.password})
            if (validUser) {
                req.session.email = validUser.email
                res.redirect(303, '/admin/dashboard')
            }else {
                res.render("admin", { error : 'Invalid Login details'})
            }
        }catch(errors) {
            res.render('admin' , {error : errors})
        }
    }
    getAdminDashboard = async(req, res, next) => {
        if(req.session.email) {
            const admin = await Admin.findOne({email : req.session.email})
            res.render("admin-dashboard", {title : "Admin", admin : admin})
        }else {
            res.redirect(303, '/admin')
        }
    }
    getFarmers = async(req, res, next) => {
        if(req.session.email) {
            try{
                const admin = await Admin.findOne({email : req.session.email})
                let totalProduces = await Farmer.find({})
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
                Farmer.find({})
                .sort([["firstName", "ascending"]])
                .skip(skipSize)
                .limit(displaySize)
                .populate("user")
                .exec(function(err, farmer_list) {
                    if(err) {
                        res.status(500).send("Internal Server Error")
                        return
                    }
                    if(farmer_list.length == 0) {
                        let farmerMessage = {
                            name : "No farmer found"
                        }
                        res.render("admin-farmer", {title : "Admin-farmer Page", noFarmer : farmerMessage.name, admin : admin})
                        return
                    }else if(farmer_list.length > 0) {
                        res.render("admin-farmer" , {
                            farmers : farmer_list,
                            currentPage : pageNumber,
                            pages : pageCount,
                            skipIt : skipSize,
                            title : "Farmers",
                            admin : admin
                        })
                    }
                })
            }catch(err) {
                res.send(err.message)
            }
        }else {
            res.redirect(303, "/admin/dashboard")
        }
    }
    getBuyers = async(req, res, next) => {
        if(req.session.email) {
            try{
                const admin = await Admin.findOne({email : req.session.email})
                let totalProduces = await Buyer.find({})
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
                Buyer.find({})
                .sort([["firstName", "ascending"]])
                .skip(skipSize)
                .limit(displaySize)
                .populate("user")
                .exec(function(err, buyer_list) {
                    if(err) {
                        res.status(500).send("Internal Server Error")
                        return
                    }
                    if(buyer_list.length == 0) {
                        let buyerMessage = {
                            name : "No buyers found"
                        }
                        res.render("admin-buyer", {title : "Admin-Farmer", noBuyer : buyerMessage.name, admin : admin})
                        return
                    }else if(buyer_list.length > 0) {
                        res.render("admin-buyer" , {
                            buyers : buyer_list,
                            currentPage : pageNumber,
                            pages : pageCount,
                            skipIt : skipSize,
                            title : "Buyers",
                            admin : admin
                        })
                    }
                })
            }catch(err) {
                res.send(err.message)
            }
        }else {
            res.redirect(303, "/admin/dashboard")
        }
    }
    getProduces = async(req, res, next) => {
        if(req.session.email) {
            try{
                const admin = await Admin.findOne({email : req.session.email})
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
                        res.render("admin-produce", {title : "Produce-Page", noProduce : produceMessage.name, admin : admin})
                        return
                    }else if(produce_list.length > 0) {
                        res.render("admin-produce" , {
                            produces : produce_list,
                            currentPage : pageNumber,
                            pages : pageCount,
                            skipIt : skipSize,
                            title : "Produces",
                            admin : admin
                        })
                    }
                })
            }catch(err) {
                res.send(err.message)
            }
        }else {
            res.redirect(303, "/admin/dashboard")
        }
    }
    getSingleFarmer = async (req , res , next) => {
        if(req.session.email){
            try{
                let validFarmer = await Farmer.findOne({_id : req.params.farmer})
                const admin = await Admin.findOne({email : req.session.email})
                if(validFarmer){
                    res.render('single-farmer' , { title  : "Admin", farmerDB: validFarmer, admin : admin})
                }else{
                    throw{
                        message : "Farmer not found"
                    }
                }
            }catch(err){
                res.json(err.message)
            }
            
        }else{
            res.redirect(303, '/admin-farmer')
        }
    }
    getSingleBuyer = async (req , res , next) => {
        if(req.session.email){
            try{
                let validBuyer = await Buyer.findOne({_id : req.params.buyer})
                const admin = await Admin.findOne({email : req.session.email})
                if(validBuyer){
                    res.render('single-buyer' , { title  : "Admin", buyerDB: validBuyer, admin : admin})
                }else{
                    throw{
                        message : "Buyer not found"
                    }
                }
            }catch(err){
                res.json(err.message)
            }
            
        }else{
            res.redirect(303, '/admin-buyer')
        }
    }
    getAdminLogout = (req , res , next ) => {
        try {
            if (req.session.email) {
                delete req.session.email
                res.redirect(303 , '/admin')
            }else {
                throw new Error("Problem signing out. We will handle this shortly")
            }
        }catch(error) {
            res.status(400).send(error)
        }
    }
}

const returnApp = new App()

module.exports = returnApp