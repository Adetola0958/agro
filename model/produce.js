const mongoose = require('mongoose') 
const Schema   = mongoose.Schema 

const ProduceSchema = new Schema ({
    produceName : {type : String},
    quantity : {type : String},
    cost : {type : String},
    farmer : {type : Schema.Types.ObjectId , ref : 'farmers'}
})

ProduceSchema.virtual('produce').get(function() {
	return `${this._id}`
})

module.exports = mongoose.model("produce", ProduceSchema)