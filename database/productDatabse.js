const { default: mongoose } = require('mongoose')
const mongo = require('mongoose')

const productDatabseSchema = new mongo.Schema({

        sellerEmail: {
            type: String,
            required: true
        },
        productName: {
            type: String,
            required: true
        },
        shortDes: {
            type: String,
        },
        Description: {
            type: String,
        },
        imagesPaths: {
            type: Array,
        },
        sizes: {
            type: Array,
        },
        actualPrice: {
            type: String,
        },
        discountPrecent: {
            type: String,
        },
        sellingPrice: {
            type: String,
        },
        stock: {
            type: Number,
        },
        tags:{
            type: Array,
        },
        tac: {
            type: Boolean,
        },
        draft:{
            type: Boolean,
            require: true
        }
 })

 const productDataBase = new mongoose.model('productDatabse', productDatabseSchema);

 module.exports = productDataBase