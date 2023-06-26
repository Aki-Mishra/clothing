const mongo = require('mongoose');


const sellerDataSchema = new mongo.Schema({
    email:{
        type: String,
        require: true,
        unique: true
    },
    BussinessName:{
        type: String,
        require: true,
    },
    Address:{
        type: String,
        require: true
    },
    About:{
        type: String,
        require:true
    },
    Number:{
        type: String,
        require: true
    },
    TermAndConditions:{
        type: Boolean,
        require:true
    },
    Ligit:{
        type: Boolean,
        require: true
    }
})


const sellerDatabase = new mongo.model('sellerData', sellerDataSchema);

module.exports = sellerDatabase;