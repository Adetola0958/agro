"use strict"

const Buyer = require("../model/buyers")
const Produce = require("../model/produce")
const Cart = require("../model/cart")

class App {
    getCart = async(req, res, next) => {
        if(req.session.email){
            const produce = await Produce.find()
            const buyer = await Buyer.findOne({email : req.session.email})
            if(produce.length != 0){       
                res.render('cart' , { title  : "Cart", produce : produce, buyer : buyer})
            }else{
                res.render('cart', {title : "Cart", noProduce : "No Produce has been selected", buyer : buyer})
            }
        }else{
            res.redirect(303, '/buyer/dashboard')
        }
    }
    postProduce = async(req, res, next) => {
        if(req.session.email) {
            try{
                const produce = await Produce.findById(req.params.produce._id)
                const buyer = await Buyer.findById(req.params.buyer._id)
                let cart = await Cart.findOne(buyer)
                if (cart) {
                    let itemIndex = cart.produce.findIndex(p => p.produceId == produceId)
                    if(itemIndex > -1) {
                        let produceItem = cart.produces[itemIndex]
                        produceItem.quantity = quantity
                        cart.produces[itemIndex] = productItem
                    }else{
                        cart.produces.push(produce)
                    }
                    cart = await cart.save()
                    return res.status(201).send(cart)
                }else {
                    throw{
                        status : 400,
                        message : "Something went wrong with this request"
                    }
                }
            }catch(err) {
                console.log(err)
                res.status(500).send("Something went wrong")
            }
        }
    }
}

const returnApp = new App()

module.exports = returnApp