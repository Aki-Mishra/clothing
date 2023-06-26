// dotnev config
require('dotenv').config()

// modules
const path = require(['path'])
// creating a path 
const staticPath = path.join(__dirname, 'test')


// express intialization
const expires = require('express')
const app = expires();
const static = 
app.use(express.static(staticPath))





// routes
app.get('/', (req, res)=>{
    res.sendFile(path.join(staticPath,'s3test.html'))
})



app.listen('9999', ()=>{
    console.log('listing on the port 9999..')
})