'use strict'

const Admin = require("../model/admin")

class App {
    getIndex = (req, res, next) => {
        res.render("index", {title : "Home Page"})
    }
    getFarmerPage = (req, res, next) => {
        res.render('farmer-page', {title : "Farmers' Page"})
    }
    getBuyerPage = (req, res, next) => {
        res.render('buyer-page', {title : "Buyers' Page"})
    }
}

const returnApp = new App()

module.exports = returnApp