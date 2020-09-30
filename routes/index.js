const express = require('express');
const router = express.Router();
//const multer = require('multer')
const IndexController = require("../controller/indexController")
const FarmerController = require("../controller/farmerController")
const BuyerController = require("../controller/buyersController")
const AdminController = require("../controller/adminController")
const CartController = require("../controller/cartController")


router.get('/', IndexController.getIndex)
router.get("/admin", AdminController.getAdminLogin)
router.post('/admin', AdminController.postAdminLogin)
router.get("/admin/dashboard", AdminController.getAdminDashboard)
router.get("/admin/farmer", AdminController.getFarmers)
router.get("/admin/buyer", AdminController.getBuyers)
router.get("/admin/produce", AdminController.getProduces)
router.get("/admin/logout", AdminController.getAdminLogout)
router.get("/admin/farmer/:farmer", AdminController.getSingleFarmer)
router.get("/admin/buyer/:buyer", AdminController.getSingleBuyer)


router.get("/farmer", IndexController.getFarmerPage)
router.post("/farmer", FarmerController.postFarmerPage)
router.get("/farmer-signin", FarmerController.getFarmerSignIn)
router.post("/farmer-signin", FarmerController.postFarmerSignIn)
router.get("/farmer/dashboard", FarmerController.getFarmerDashboard)
router.get('/farmer/logout', FarmerController.getLogout)
router.get('/farmer/dashboard/:farmerId/delete', FarmerController.deleteFarmer)
router.get("/farmer/dashboard/produce", FarmerController.getProduces)
router.post("/farmer/dashboard/produce", FarmerController.postProduces)
router.get("/farmer/dashboard/produce/:produce", FarmerController.getUpdate)
router.post("/farmer/dashboard/produce/:produceId", FarmerController.updateSingleProduce)
router.get("/farmer/:farmer/dashboard", FarmerController.getFarmerUpdate)
router.post("/farmer/:farmerId/dashboard", FarmerController.updateFarmer)
router.get("/farmer/:farmer", FarmerController.getOwnProfile)

router.get("/buyer", IndexController.getBuyerPage)
router.post("/buyer", BuyerController.postBuyerPage)
router.get("/buyer-signin", BuyerController.getBuyerSignIn)
router.post("/buyer-signin", BuyerController.postBuyerSignIn)
router.get("/buyer/dashboard", BuyerController.getBuyerDashboard)
router.get("/buyer/dashboard/produce", BuyerController.getProduces)
router.get('/buyer/logout', BuyerController.getLogout)
router.get('/buyer/dashboard/:buyerId/delete', BuyerController.deleteBuyer)
router.get("/buyer/:buyer/dashboard", BuyerController.getBuyerUpdate)
router.post("/buyer/:buyerId/dashboard", BuyerController.updateBuyer)
router.get("/buyer/:buyer", BuyerController.getOwnProfile)

router.get("/cart", CartController.getCart)
router.post("/cart/produce", CartController.postProduce)


module.exports = router;