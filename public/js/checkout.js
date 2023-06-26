

window.onload = () => {
    setData('cart')
}

const getAddress = () => {
    let address = document.querySelector('#Address')
    let street = document.querySelector('#Street')
    let city = document.querySelector('#City')
    let state = document.querySelector('#State')
    let pinCode = document.querySelector('#Pin-code')
    let landMark = document.querySelector('#land-mark')
    if (!address.value.length || !street.value.length || !city.value.length || !state.value.length || !pinCode.value.length || !landMark.value.length) {
        showAlert("Fill all the details")
        return false;
    } else {
        return {
            address: address.value,
            street: street.value,
            city: city.value,
            state: state.value,
            pinCode: pinCode.value,
            landMark: landMark.value,
        }
    }
}
placeOrderBtn = document.querySelector('.placeOrder-btn')
console.log(placeOrderBtn)
placeOrderBtn.addEventListener('click', async () => {
    let address = await getAddress()
    if (address) {
        fetch("/order", {
            method: 'POST',
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify({
                cart: JSON.parse(localStorage.getItem('cart')),
                email: JSON.parse(localStorage.getItem('clothingUser')).email,
                address: address,
            })
        }).then(res => res.json()).then((data) => {
            if (data.alert == "Order placed sucessfully") {
                showAlert(data.alert, "sucesss")
            } 

        })
        console.log('click is working')
    }
})