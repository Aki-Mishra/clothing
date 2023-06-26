const jwt = require('jsonwebtoken')
const ragister = require('./database/userDatabase')

const auth = async(req, res, next)=>{
    try{
        const token = req.cookies.Clothing;
        const verifyUser = jwt.verify(token,'mynameisakshatmishraiamlearningwebdevelopment');
        console.log(verifyUser);

        const user = await  ragister.findOne({_id:verifyUser._id})
   

        next()
    }catch(error){
        res.redirect('signup')
        // res.status(401).send(error + ' please login first ')
        console.log('there is a error occured while authentication ' + error)
    }
}

module.exports = auth;