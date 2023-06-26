const jwt = require('jsonwebtoken');

const createToken = async()=>{
    // jwt.sign()  syntax 
    // jwt.sign(object, SecretKey, options) 
    // object(payload) should be unique for every token 
    // secret key should be same for every token (recommended)
    //  it return a promise
    // promise is resolved into a toknem

    let token = await jwt.sign({_id:'tkiecn78me86c9s90ms9j343e333mn3'}, 'SECRETKey');
    console.log(token)
    return token;
}
createToken()



//---> Generated Token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ0a2llY243OG1lODZjOXM5MG1zOWozNDNlMzMzbW4zIiwiaWF0IjoxNjgzODA3NjMxfQ.ukUjeDdFUsVH6w9OtIeNhr5X-jV04zAaHOD0OKpAlvY

//  till the  first dot it reffers type of encoding used to make the token 
//  after first dot it refers the unique object(payload) 
// after second dot it refers the SECRETKey
// it returns a promise 
// promise is resolved into the Payload


const verifyToken = async ()=>{
    // jwt.verify()  syntax
    // jwt.verify(CREATED Token, SECRETKey)
    // 
   let verifiedUser= await jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ0a2llY243OG1lODZjOXM5MG1zOWozNDNlMzMzbW4zIiwiaWF0IjoxNjgzODA3NjMxfQ.ukUjeDdFUsVH6w9OtIeNhr5X-jV04zAaHOD0OKpAlvY', 'SECRETKey')
   console.log(verifiedUser)
}

verifyToken()