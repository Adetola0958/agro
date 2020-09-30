const mongoose = require('mongoose') 
const Schema   = mongoose.Schema 

const FarmersSchema = new Schema ({
    firstName : {type : String},
    lastName : {type : String},
    middleName : {type : String},
    mobileNumber : {type : Number},
    email : {type : String},
    password : {type : String},
    location : {
        farmNumber : {type : String},
        streetName : {type : String},
        state : {type : String}
    },
    gender : {type : String},
    //profilePhoto : {type : String}
})

FarmersSchema.virtual('farmer').get(function() {
	return `${this._id}`
})

module.exports = mongoose.model("Farmer" , FarmersSchema)