const mongodb = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const loginDataSchema = new mongodb.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    tAc: {
        type: Boolean,
        required: true
    },
    notifiacation: {
        type: Boolean
    },
    seller: {
        type: Boolean
    },
    originalPassword: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})
loginDataSchema.methods.genrateToken = async function () {
    try {
        const GeneratedToken = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        // console.log('this is your generated token ' + GeneratedToken)
        this.tokens = this.tokens.concat({token: GeneratedToken}) 
        return GeneratedToken
    } catch (Error) {
        console.log('there is a error while gernerating token ' +Error);
    }
}
loginDataSchema.pre('save', async function () {
    console.log(this.password)
    console.log('your original password is ' + this.password)
    const hashedPassowrd = await bcrypt.hash(this.password, 10)
    console.log('hashed passowrd ' + hashedPassowrd)
    this.password = hashedPassowrd
 
   
})
const MongoDataBase = new mongodb.model('loginData', loginDataSchema)
// console.log(loginDataSchema)
module.exports = MongoDataBase;