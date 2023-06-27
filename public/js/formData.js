const loader = document.querySelector('.loader')
const showAlert = (msg, type) => {
    let alertBox = document.querySelector('.alert-box')
    let alertImage = document.querySelector('.alert-image')
    let alertMassage = document.querySelector('.alert-massage')
    if (type == "sucesss") {
        alertImage.src = "img/greenTick.png";
        alertMassage.style.color = '#12a92d';
    }
    alertMassage.innerHTML = msg
    alertBox.classList.remove('display-none')
    setTimeout(() => {
        alertBox.classList.add('display-none')
    }, 3000)
    return false

}

// sendData function
const sendData = (path, data) => {
    fetch(path, {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    }).then((res) => {
        // console.log(res)
        return res.json()
    }).then((response) => {
        // console.log(response)
        SecondValidation(response)

    })
}



const SecondValidation = (data) => {
    loader.classList.add('display-none')
    if (data.alert) {
        showAlert(data.alert)
        console.log(data.alert)
    } else if (data.signup) { // this is for if the signup is sucessfull
        location.replace('/login')

    } else if (data.loginUser) {
        console.log(data.loginUser) // this is only for login sucessfull
        localStorage.removeItem('clothingUser')
        localStorage.setItem('clothingUser', JSON.stringify(data.loginUser))
        location.replace('/')
    } else if (data.addProduct) {
        location.replace("/seller")
    } else if (data.updatedUser) {   // this is fired when seller acount setup will complete
        console.log(data.updatedUser)
        localStorage.setItem("clothingUser", JSON.stringify(data.updatedUser))
        location.reload()
    }
}


// whislist button working

    const popWhislistButton = document.querySelectorAll(".whislist-btn");
    console.log(popWhislistButton)

