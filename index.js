require('dotenv').config();   // Make sure this is on top
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const collection = require('./database/userDatabase');
const sellerDatabase = require('./database/sellerDatabase');
const productDatabase = require('./database/productDatabse');
const orderDatabase = require('./database/orderDatabase');
const auth = require('./auth');


// aws setup
const aws = require('aws-sdk');
const crypto = require('crypto');









// aws paremeter 
const region = "ap-south-1";
const bucketName = "my-second-bucket99";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKeyId = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
    region,
    apiVersion: "letest",
    accessKeyId,
    secretAccessKeyId,
    signatureVersion: 'v4'
})


async function genrateUrl() {
    const rawBytes = await crypto.randomBytes(16)
    const imageName = rawBytes.toString('hex')

    const prams = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 600
    })

    const uploadUrl = await s3.getSignedUrlPromise('putObject', prams);
    return uploadUrl
}

// coonecting with mogoose


mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection sucessfull");
}).catch(err => {
    console.log("not connected " + err);
})




// declare static path
const staticPath = path.join(__dirname, 'public');
// initializing express
const app = express();
// middlewares
app.use(express.static(staticPath))
app.use(express.json());
app.use(cookieParser());






//routes
app.get('/', async (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
    // 6479f1c786b39e4c40b26c02'
})
app.get('/secret', auth, (req, res) => {

    // console.log('The cookiew value is ' + req.cookies.clothing)
    res.sendFile(path.join(staticPath, 'secret.html'))
})
app.get('/signup', (req, res) => {
    res.sendFile(path.join(staticPath, 'signup.html'));
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, 'login.html'));
})
app.get('/seller', auth, async (req, res) => {
    res.sendFile(path.join(staticPath, 'seller.html'))
})
app.get('/addProduct', auth, async (req, res) => {
    res.sendFile(path.join(staticPath, 'addProduct.html'))
})
app.get('/addProduct/:_id', auth, async (req, res) => {
    res.sendFile(path.join(staticPath, 'addProduct.html'))
})
app.get('/s3Url', async (req, res) => {
    let url = await genrateUrl()
    res.send({ url })
})

app.get('/product/:id', (req, res) => {
    res.sendFile(path.join(staticPath, 'product.html'));

})
app.get('/cart', (req, res) => {
    res.sendFile(path.join(staticPath, 'cart.html'))
})
app.get('/search', (req, res)=>{
    res.sendFile(path.join(staticPath, 'search.html'));
})
app.get('/search/:value', (req, res)=>{
    res.sendFile(path.join(staticPath, 'search.html'));
})
app.get("/checkout", (req, res) => {
    res.sendFile(path.join(staticPath, 'checkout.html'))
})
app.post('/signup', async (req, res) => {
    // checking form details second time
    try {
        if (req.body.name.length < 4) {
            return res.json({ 'alert': 'Name must be 4 charecter long' })
        }
        else if (!req.body.email.length) {
            return res.json({ 'alert': 'Enter your email' })
        }
        else if (req.body.password.length < 8) {
            return res.json({ 'alert': 'password must be 8 charecter long' })
        }
        else if (!Number(req.body.number) || req.body.number.length < 10) {
            return res.json({ 'alert': 'invalid number , please enter valid one' })
        }
        else if (!req.body.tAc) {
            return res.json({ 'alert': 'you must agree to our term and conditions' })
        }
        else {
            let originalPassword = req.body.password
            const newCollection = new collection({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                number: req.body.number,
                tAc: req.body.tAc,
                notifiacation: req.body.notifiacation,
                seller: req.body.seller,
                originalPassword: originalPassword,

            })
            // getting the token
            let token = await newCollection.genrateToken();
            console.log('the token is ' + token)
            //  Saving  cookie 
            let options = {
                expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie('Clothing', token, options)

            // storigng the userData in the Database
            const saveCollection = await newCollection.save();


            console.log('form sucessfully submitted')
            return res.status(203).json({ 'signup': 'form submitted' })
        }
    } catch (error) {
        console.log('a error occured' + error)
        return res.json({ 'alert': 'email already exists' })
    }
})

app.post('/login', async (req, res) => {
    try {
        if (!req.body.email.length) {
            return res.json({ 'alert': 'please enter your email' })
        }
        else if (!req.body.password.length) {
            return res.json({ 'alert': 'please enter your password' })
        }
        else {
            console.log(req.body.email)
            let userEmail = req.body.email
            let userPassword = req.body.password
            let recivedData = await collection.findOne({ email: userEmail })


            if (recivedData == null) {
                return res.json({ 'alert': 'Email doesnt exist' })
            }
            else {

                let passwordCompare = await bcrypt.compare(userPassword, recivedData.password)
                console.log(passwordCompare)
                if (passwordCompare) {
                    // saving the cookie
                    let token = recivedData.tokens[0].token
                    console.log(token)
                    let options = {
                        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('Clothing', token, options)

                    res.json({ 'loginUser': recivedData })

                }
                else {
                    res.json({ 'alert': 'invaild login details' })
                }
            }
        }
    } catch (error) {
        console.log('there is error while login ' + error)
        res.json({ 'alert': 'invaild logindetails' })
    }
})
app.post('/seller', async (req, res) => {
    let token = req.cookies.Clothing
    let verify = await jwt.verify(token, process.env.SECRET_KEY)
    let user = await collection.findOne({ _id: verify._id });

    let { BussinessName, address, about, number, TAC, ligit } = req.body;

    if (!BussinessName || !address || !about || !number) {
        return res.json({ 'alert': `please fill all the details's ` })
    }
    else if (number.length < 10) {
        return res.json({ 'alert': 'Enter a valid Number' })
    }
    else if (TAC != true || ligit != true) {
        return res.json({ 'alert': `you must agree our term and conditon's` })
    }
    else {
        //  updating user as a seller in database
        let updataUser = await collection.updateOne({ _id: user._id }, { $set: { seller: true } });
        let updatedUser = await collection.findOne({ _id: user._id })


        const newSellerDatabase = new sellerDatabase({
            email: user.email,
            BussinessName: BussinessName,
            Address: address,
            About: about,
            Number: number,
            TermAndConditions: TAC,
            Ligit: ligit
        })
        const saveSellerDatabse = await newSellerDatabase.save();
        return res.json({ updatedUser })

    }


})
app.post('/addProduct', async (req, res) => {
    let { name, shortDes, Description, imagesPaths, sizes, actualPrice, discountPrecent, sellingPrice, stock, tags, tac, draft } = req.body
    if (!draft) { // this is obly for add product ok
        if (!name.length) {
            return res.json({ 'alert': 'Enter the name of the product' })
        } else if (shortDes.length < 10 || shortDes.length > 100) {
            return res.json({ 'alert': 'Short-description of the product must be between 10 to 100 letters' })
        } else if (!Description.length) {
            return res.json({ 'alert': 'Enter detail description of the product' })
        } else if (!imagesPaths.length) { // image link array 
            return res.json({ 'alert': 'Upload at lest one product image' })
        } else if (!sizes.length) {
            return res.json({ 'alert': 'select at lest on size' })
        } else if (!actualPrice.length || !discountPrecent.length || !sellingPrice.length) {
            return res.json({ 'alert': 'you should add pricing' })
        } else if (stock < 20) {
            return res.json({ 'alert': 'you should have at least 20 items in stock' })
        } else if (!tags.length) {
            return res.json({ 'alert': 'you should at least on tag' })
        } else if (!tac) {
            return res.json({ 'alert': 'you must agree with our term and conditions' })
        }
    }

    let token = req.cookies.Clothing;
    let verify = await jwt.verify(token, process.env.SECRET_KEY)
    let user = await collection.findOne({ _id: verify._id })

    const newproductDataBase = await new productDatabase({
        sellerEmail: user.email,
        productName: name,
        shortDes: shortDes,
        Description: Description,
        imagesPaths: imagesPaths,
        sizes: sizes,
        actualPrice: actualPrice,
        discountPrecent: discountPrecent,
        sellingPrice: sellingPrice,
        stock: stock,
        tags: tags,
        tac: tac,
        draft: draft
    })

    let savEproductDatabase = await newproductDataBase.save()
    // console.log(newproductDataBase)
    // console.log(savEproductDatabase)
    return res.json({ 'addProduct': 'prduct database saved' })


})
app.post('/updateProduct', async (req, res) => {
    let { name, shortDes, Description, imagesPaths, sizes, actualPrice, discountPrecent, sellingPrice, stock, tags, tac, draft, id } = req.body
    console.log(id)
    if (!draft) { // this is obly for add product ok
        if (!name.length) {
            return res.json({ 'alert': 'Enter the name of the product' })
        } else if (shortDes.length < 10 || shortDes.length > 100) {
            return res.json({ 'alert': 'Short-description of the product must be between 10 to 100 letters' })
        } else if (!Description.length) {
            return res.json({ 'alert': 'Enter detail description of the product' })
        } else if (!imagesPaths.length) { // image link array 
            return res.json({ 'alert': 'Upload at lest one product image' })
        } else if (!sizes.length) {
            return res.json({ 'alert': 'select at lest on size' })
        } else if (!actualPrice.length || !discountPrecent.length || !sellingPrice.length) {
            return res.json({ 'alert': 'you should add pricing' })
        } else if (stock < 20) {
            return res.json({ 'alert': 'you should have at least 20 items in stock' })
        } else if (!tags.length) {
            return res.json({ 'alert': 'you should at least on tag' })
        } else if (!tac) {
            return res.json({ 'alert': 'you must agree with our term and conditions' })
        }
    }

    let token = req.cookies.Clothing;
    let verify = await jwt.verify(token, process.env.SECRET_KEY)
    let updateData = {
        productName: name,
        shortDes: shortDes,
        Description: Description,
        imagesPaths: imagesPaths,
        sizes: sizes,
        actualPrice: actualPrice,
        discountPrecent: discountPrecent,
        sellingPrice: sellingPrice,
        stock: stock,
        tags: tags,
        tac: tac,
        draft: draft
    }

    let updated = await productDatabase.updateOne({ _id: id }, { $set: updateData });


    return res.json({ 'addProduct': 'prduct database saved' })


})
app.post('/get-product', async (req, res) => {
    let { email, id, tag } = req.body
    let data;
    if (id) {
        data = await productDatabase.find({ _id: id });
    } else if (email) {
        data = await productDatabase.find({ sellerEmail: email });
    } else if (tag) {
        data = await productDatabase.find({ tags: { $in: [tag]}, draft: false});
    }

    let productArr = [];
    if (data[0] == undefined) { // means no data is present
        console.log('this is nulll response')
        return res.json('no products')
    }
    Object.values(data).forEach(element => {
        productArr.push(element)
    })
    res.json(productArr)


})
app.post('/delete=product', async (req, res) => {
    console.log(req.body)
    let { productId } = req.body;
    try {
        let product = await productDatabase.deleteOne({ _id: productId })
        return res.json('success');
    } catch (err) {
        console.log('there is a error with error ' + err)
        return res.json('Some error occure, Try again')
    }
})
app.post('/order', async (req, res) => {

 
        let { address, email, cart } = req.body;
        let orderDatabase2 = new orderDatabase({
            email: email,
            cart: cart,
            address: address,
        })
        await orderDatabase2.save();
        return res.json({ "alert": 'Order placed sucessfully' });
})
// Error route
app.get('/404', (req, res) => {
    res.sendFile(path.join(staticPath, '404.html'))
})
app.use((req, res) => {
    res.redirect('/404');
})
app.listen(3000, () => {
    console.log('listening on port 3000.........');
})





