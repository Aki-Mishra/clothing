

let user = JSON.parse(localStorage.getItem('clothingUser'))
console.log(user)
window.onload = () => {
    localStorage.removeItem('productData')
    if (user == null) {
        location.href = '/login'
    }
    else if (user.seller == true) {
        loader.classList.remove('display-none')
        becomeSeller.classList.add('display-none')
        productListing.classList.remove('display-none')
        productSetup();
    }

}

const alertBox = document.querySelector('.alert-box')
const becomeSeller = document.querySelector('.become-seller')
const applyForFormBtn = document.querySelector('.apply-btn')
const sellerForm = document.querySelector('.seller-form')
const productListing = document.querySelector(".product-listing")

applyForFormBtn.addEventListener('click', () => {
    becomeSeller.classList.add('display-none')
    sellerForm.classList.remove('display-none')
})







// filling form process
const BussinessName = document.querySelector('#Bussinessname')
const address = document.querySelector('#address')
const about = document.querySelector('#about')
const number = document.querySelector('#number')
const TAC = document.querySelector('#TAC')
const ligit = document.querySelector('#ligit')
const submitbtn = document.querySelector('.seller-form-btn')
submitbtn.addEventListener('click', () => {
    if (!BussinessName.value || !address.value || !about.value || !number.value) {
        showAlert('please fill all the details')
    }
    else if (number.value.length < 10 || !Number(number.value)) {
        showAlert('Enter a valid number')
    }
    else if (!TAC.checked || !ligit.checked) {
        showAlert('You must agree to our term and conditions')
    }
    else {
        loader.classList.remove('display-none')
        console.log('form submitted suncessfully')
        sendData('/seller', {
            BussinessName: BussinessName.value,
            address: address.value,
            about: about.value,
            number: number.value,
            TAC: TAC.checked,
            ligit: ligit.checked
        })
    }
})



const productSetup = () => {
    fetch('/get-product', {
        method: 'POST',
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(user)
    }).then(res =>
        res.json()
    ).then((data) => {
        if (data == 'no products') {
            loader.classList.add('display-none')
            let noProductImg = document.querySelector('.no-products')
            noProductImg.classList.remove('display-none')
            return
        } else {
            loader.classList.add('display-none')
            console.log(data)
            createproduct(data);
        }
    })
}