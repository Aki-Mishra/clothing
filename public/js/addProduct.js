let user = JSON.parse(localStorage.getItem('clothingUser'));
window.onload = () => {
    if (user == null) {
        location.href = '/login'
    }
    else if (user.seller == null) {
        location.href = '/seller'
    }
}

// updating prices

const actualPrice = document.querySelector('#actual-price')
const sellingPrice = document.querySelector('#selling-price')
const discountPrecent = document.querySelector('#discount')

discountPrecent.addEventListener('input', function () {
    if (discountPrecent.value > 100) {
        this.value = 90;
    }
    else {
        let discount = (actualPrice.value * this.value) / 100;
        sellingPrice.value = actualPrice.value - discount;
    }

})
sellingPrice.addEventListener('input', function () {
    if (sellingPrice > actualPrice) {
        showAlert('selling price is greater than actual price')
    }
    else {
        let discount = actualPrice.value - sellingPrice.value;
        console.log(discount)
        discountPrecent.value = (discount / actualPrice.value) * 100
    }

})




const uploadImage = document.querySelectorAll('.fileUpload')
const imagePaths = [];  // we will store all images paths here
const sizes = [];  // we  will store all the product sizes here


// storing image sizes function
const storeImageSizes = () => {
    let sizeChecknox = document.querySelectorAll('.size-checkbox');
    sizeChecknox.forEach((item, index) => {
        if (item.checked) {
            sizes.push(item.value);
        }
    })
}

uploadImage.forEach((fileUpload, index) => {
    fileUpload.addEventListener('change', async () => {
        const file = fileUpload.files[0];
        let imageUrl

        console.log(file)
        if (file.type.includes('image')) {
            // means it is a image
            let { url } = await fetch('/s3Url').then(res => res.json())
            console.log(url)

            let resposnse = await fetch(url, {
                method: 'PUT',
                headers: new Headers({ 'Content-Type': "multipart/form-data" }),
                body: file
            })
            console.log(resposnse)

            imageUrl = url.split('?')[0];
            imagePaths[index] = imageUrl;
            //     console.log(fileUpload.id)
            let label = document.querySelector(`label[for=${fileUpload.id}`)
            label.style.backgroundImage = `url("${imageUrl}")`
            let productImage = document.querySelector('.product-image');
            productImage.innerHTML = "";
            productImage.style.backgroundImage = `url(${imageUrl})`
        }
        else {
            showAlert('upload image only')
        }

    })

})
    // form submission

const productName = document.querySelector('#product-name')
const shortDes = document.querySelector('#short-des')
const Des = document.querySelector('#des')

const stock = document.querySelector('#stock');
const tags = document.querySelector('#tags');
const tac = document.querySelector('#tac');

// buttons
const addBtn = document.querySelector("#add-btn")
const draftBtn = document.querySelector("#draft-btn")


// validating form
const validateForm = () => {
    storeImageSizes();
    if (!productName.value.length) {
        showAlert('Enter the name of the product')
        return false
    } else if (shortDes.value.length < 10 || shortDes.value.length > 100) {
        showAlert('Short-description of the product must be between 10 to 100 letters')
        return false
    } else if (!Des.value.length) {
        showAlert('Enter detail description of the product')
        return false
    } else if (!imagePaths.length) { // image link array 
        
        showAlert('Upload at lest one product image')
        return false
    } else if (!sizes.length) {
        showAlert('select at lest on size')
        return false
    } else if (!actualPrice.value.length || !discountPrecent.value.length || !sellingPrice.value.length) {
        showAlert('you should add pricing')
        return false
    } else if (stock.value < 20) {
        showAlert('you should have at least 20 items in stock')
        return false
    } else if (!tags.value.length) {
        showAlert('you should at least on tag')
        return false
    } else if (!tac.checked) {
        showAlert('you must agree with our term and conditions')
        return false
    } else {
        loader.classList.remove('display-none')
        return true
    }
}

const productData = async () => {
    let tagsArr = await tags.value.split(',');
    // removing the white spaces from both sides of tags
    tagsArr.forEach((elem, i)=>{
        tagsArr[i]=  elem.trim().toLowerCase();
    })
    return Data = {
        name: productName.value,
        shortDes: shortDes.value,
        Description: Des.value,
        imagesPaths: imagePaths,
        sizes: sizes,
        actualPrice: actualPrice.value,
        discountPrecent: discountPrecent.value,
        sellingPrice: sellingPrice.value,
        stock: stock.value,
        tags: tagsArr,
        tac: tac.checked,
        draft: false
    }
}



// submitting form 
addBtn.addEventListener('click', async () => {
    let validation = await validateForm();
    console.log(validation)
    if (validation) {
        let data = await productData();
        console.log(data)
        if (location.pathname == '/addProduct') {
            sendData('/addProduct', data);
        } else {
            let loca = location.pathname.split('/')
            let productId = loca[loca.length - 1]
            data.id = productId
            sendData('/updateProduct', data);
        }
    }
})

// draft woriking

draftBtn.addEventListener('click', async () => {
    if (!productName.value.length) {
        showAlert('Enter the name of the product')
    } else {
        storeImageSizes();
        let data = await productData();
        data.draft = true;
        console.log(data)
        
        if (location.pathname == '/addProduct') {
            sendData('/addProduct', data);
        } else {
            let loca = location.pathname.split('/')
            let productId = loca[loca.length - 1]
            data.id = productId
            console.log(data)
            sendData('/updateProduct', data);
        }
    }
})

// handaling existing product data
let productId = null;
if (location.pathname != '/addProduct') {
    let loca = location.pathname.split('/')
    productId = loca[loca.length - 1]

    fetchProductData(productId)
        .then(data => {
            fillFormData(data)
        })

}

async function fetchProductData(productId) {
    let data = {
        id: productId
    }
    let _data = await fetch('/get-product', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    }).then((data) => {
        return data[0];
    })
    return _data;
}


function fillFormData(data) {
    fillImagePics(data.imagesPaths)
    fillimageSizes(data.sizes)
    productName.value = data.productName;
    shortDes.value = data.shortDes
    Des.value = data.Description
    actualPrice.value = data.actualPrice
    discountPrecent.value = data.discountPrecent
    sellingPrice.value = data.sellingPrice
    tags.value = data.tags
}


function fillimageSizes(sizes) {
    let sizeChecknox = document.querySelectorAll('.size-checkbox');
    sizes.forEach(size => {
        sizeChecknox.forEach(element => {
            if (size == element.value) {
                element.setAttribute('checked', '')
            }
        })
    })

}
function fillImagePics(productImages) {
    let lable = document.querySelectorAll('.upload-image')
    console.log(lable);
    productImages.forEach((link, index) => {
        lable.forEach((elment, lableIndex) => {
            if (index == lableIndex) {
                elment.style.backgroundImage = `url(${link})`
                imagePaths[lableIndex] = link;
            }
        })
    })
}


console.log('this updated file is working')