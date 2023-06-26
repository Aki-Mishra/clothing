const { default: mongoose } = require('mongoose');
let mogoose = require('mongoose');


let orderDatabaseSchema = new mongoose.Schema({
    email:{
        require: true,
        type :String
    },
    cart:{
        require: true,
        type: Object
    },
    address:{
        require: true,
        type: Object
    }
})


const order = new mongoose.model('Order', orderDatabaseSchema);

module.exports = order;