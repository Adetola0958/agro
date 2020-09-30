const mongoose = require('mongoose') 
const Schema   = mongoose.Schema 

const BuyersSchema = new Schema ({
    firstName : {type : String},
    lastName : {type : String},
    middleName : {type : String},
    mobileNumber : {type : Number},
    email : {type : String},
    password : {type : String},
    location : {
        houseNumber : {type : String},
        streetName : {type : String},
        lga : {type : String},
        state : {type : String}
    },
    gender : {type : String},
    //profilePhoto : {type : String}
})

BuyersSchema.virtual('buyer').get(function() {
	return `${this._id}`
})

module.exports = mongoose.model("Buyer" , BuyersSchema)