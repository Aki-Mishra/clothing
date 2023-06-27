const createnav = () => {
    let nav = document.querySelector('.navbar')
    nav.innerHTML = `
    <div class="nav">
    <img src="../img/dark-logo.png" alt="" class="brand-logo">
    <div class="nav-items">
        <div class="search">
            <input type="text" placeholder="search brand, product" class="search-box">
            <button class="search-button">search</button>
        </div>
        <a>
            <img src="../img/user.png" class="user-btn"></img>
            <div class="login-logout-popup display-none" >
                <p class="account-info">login as <span class="user-name">Name</span></p>
                <button class="login-logout-btn">login</button>
            </div>
        </a>
        <a href="/cart" target="_blank"><img src="../img/cart.png"></img></a>
    </div>
</div>
<div class="nav-link-container">
    <ul class="link-container">
        <li class="link-item"><a href="#" class="link">home</a></li>
        <li class="link-item"><a href="#" class="link">women</a></li>
        <li class="link-item"><a href="#" class="link">men</a></li>
        <li class="link-item"><a href="#" class="link">kids</a></li>
        <li class="link-item"><a href="#" class="link">accessories</a></li>
    </ul>
</div>
`;
}

createnav()
document.cookie = 'MyName' + '=' + 'akshat';
document.cookie = 'MyName =; Path=/; Expires=Thu, 1 Jan 1970 00:00:01 GMT; ';


// nav popup
const userBtn = document.querySelector('.user-btn');
const loginLogoutPopup = document.querySelector('.login-logout-popup');
const accountInfo = document.querySelector('.account-info');
const userName = document.querySelector('.user-name')
const loginBtn = document.querySelector('.login-logout-btn');

userBtn.addEventListener('click', () => {
    loginLogoutPopup.classList.toggle('display-none')
})


window.addEventListener('load', () => {
    let user = localStorage.getItem('clothingUser')
    console.log(user)
    user = JSON.parse(user);

    if (user != null) { // means user is loged in
        accountInfo.innerHTML = `loged in as <span class="user-name">${user.name}</span>`
        loginBtn.innerHTML = 'logout'
        loginBtn.addEventListener('click', () => {
            localStorage.removeItem('clothingUser')
            location.reload();
            // deleting the token stored as cookie
            document.cookie = 'Clothing' + '= ; Path=/; Expires= Thu, 1 Jan 1970 00:00:01 GMT ;';
        })
    }
    else { // means user is not loged in
        accountInfo.innerHTML = 'login to place an order'
        loginBtn.innerHTML = 'login'
        console.log("Hai")
        loginBtn.addEventListener('click', () => {
            location.href = '/login'
        })
    }
})



// search button working
let searchBtn = document.querySelector(".search-button");
console.log(searchBtn)
searchBtn.addEventListener('click', () => {
    let searchBox = document.querySelector('.search-box');
    let search = searchBox.value;
    location.href = `/search/${search}`
})