const mongoose = require('mongoose')
const Schema = mongoose.Schema


const productSchema = new Schema({
 	productName: {
    	type     : String,
    	required : true    	
    },
    specialProduct: String,
    createdAt: {
    	type: Date,
    	default: Date.now()
    },
    productDesc : String,
    addDesc : String,
    category: {
        type     : String,
        required : true     
    },  
    price : Number,
    stock : Number,
    image : String,  	
})


const productModel = mongoose.model('product', productSchema);

module.exports = productModel