



let createAccountBtn = document.querySelector('.create-login-account-btn')
let name = document.querySelector('#name')
let email = document.querySelector('#email')
let password = document.querySelector('#password')
let number = document.querySelector('#number')
let tAc = document.querySelector('#term-and-conditions')
let notifiacation = document.querySelector('#notifications')




createAccountBtn.addEventListener('click', () => {
    if (name != null) { // sign up form
        if (name.value.length < 4) {
            showAlert('Name must be 4 charecter long')
        }
        else if (!email.value.length) {
            showAlert('Enter your email')
        }
        else if (password.value.length < 8) {
            showAlert('password must be 8 charecter long')
        }
        else if (!Number(number.value) || number.value.length < 10) {
            showAlert('invalid number , please enter valid one')
        }
        else if (!tAc.checked) {
            showAlert('you must agree to our term and conditions')
        }
        else {
            loader.classList.remove('display-none');
            sendData('/signup', {
                name: name.value,
                email: email.value,
                password: password.value,
                number: number.value,
                tAc: tAc.checked,
                notifiacation: notifiacation.checked,
                seller: false
            })
        }
    }
    else{ //login form
        console.log('this is working')
        if(!email.value.length){
            showAlert('Please enter email')
        }
        else if(!password.value.length){
            showAlert('please enter Password')
        }
        else{
            loader.classList.remove('display-none')
            sendData('/login',{
                email : email.value,
                password : password.value
            })
        }
    }
})


