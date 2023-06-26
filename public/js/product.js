
const productImages = document.querySelectorAll('.product-images img');
const productImageSlide = document.querySelector('.image-slider')
productImages.forEach((element) => {
    element.addEventListener('click', () => {
        let src = element.getAttribute('src');
        productImageSlide.style.backgroundImage = `url(${src})`;
    })
})


const sizeBtns = document.querySelectorAll('.size-radio-buttons'); // selecting size buttons
let checkedBtn = 0; // current selected button

sizeBtns.forEach((item, i) => { // looping through each button
    item.addEventListener('click', () => { // adding click event to each 
        sizeBtns[checkedBtn].classList.remove('check'); // removing check class from the current button
        item.classList.add('check'); // adding check class to clicked button
        checkedBtn = i; // upading the variable
    })
})




const addToCartAndWhislistBtnWorking = (productData, type) => {
    let array = JSON.parse(localStorage.getItem(type));

    if (array == null) {
        array = [];
    }

    let product = {
        item: 1,
        name: productData.productName,
        price: productData.sellingPrice,
        shortDes: productData.shortDes,
        productImage: productData.imagesPaths[0]
    }
    array.push(product)
    localStorage.setItem(type, JSON.stringify(array));
    return 'Added'



}

let fillData = async () => {

    let loca = location.pathname.split('/')
    let productId = loca[loca.length - 1]
    const productData = await fetch('/get-product', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ id: productId })

    }).then((res) => {
        return res.json();
    }).then(data => {
        return data[0];
    })
    // Getting Dom elememts
    let productName = document.querySelector('.product-Name')
    let productShortDes = document.querySelector('.product-short-des')
    let productDes = document.querySelector('.discription')
    let productSellingPrice = document.querySelector('.price')
    let productActualPrice = document.querySelector('.actual-price')
    let productDiscount = document.querySelector('.product-discount')
    let prdouctCardImage = document.querySelectorAll('.product-images img')
    let whishlistBtn = document.querySelector('.whislist-btn')
    let cartBtn = document.querySelector('.cart-btn')

    //  filling data
    productName.innerHTML = productData.productName
    productShortDes.innerHTML = productData.shortDes
    productDes.innerHTML = productData.Description;
    productSellingPrice.innerHTML = productData.sellingPrice;
    productActualPrice.innerHTML = productData.actualPrice;
    productDiscount.innerHTML = `(${productData.discountPrecent}%off)`;
    prdouctCardImage.forEach((element, index) => {
        element.src = productData.imagesPaths[index];
    })
    productImageSlide.style.backgroundImage = `url(${productData.imagesPaths[0]})`;

    // removing size buttons if sizes are not available
    sizeBtns.forEach((element, i) => {

        productData.sizes.forEach(size => {
            if (size == element.innerHTML) {
                element.classList.remove('hide')
            }
        })
    })



    // cart and whislist Btn working
    whishlistBtn.addEventListener('click', () => {
        console.log('this is working')
        if (whishlistBtn.innerHTML == 'Add to whislist') {
            whishlistBtn.innerHTML = addToCartAndWhislistBtnWorking(productData, 'wishlist')
        }
    })
    cartBtn.addEventListener('click', () => {
        console.log('this is working')
        if (cartBtn.innerHTML == 'Add to cart') {
            cartBtn.innerHTML = addToCartAndWhislistBtnWorking(productData, 'cart')
        }
    })

    // setting up simirlar productSection
    fetchDataAcToTags(productData.tags[0]).then(data => {
        createProductSliders(data, "container-for-card-slider", "Similar Product");
    })

}

if (location.pathname != "/product") {
    fillData()
}




