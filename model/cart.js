const mongoose = require('mongoose') 
const Schema   = mongoose.Schema

const CartSchema = new Schema({
    buyer: {type: Schema.Types.ObjectId, ref: "Buyer"},
    produces: {type: Array}
})

module.exports = mongoose.model("Cart" , CartSchema)