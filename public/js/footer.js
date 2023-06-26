const createFotter = ()=>{
    const footer = document.querySelector('footer');
    // console.log(footer)
    footer.innerHTML = `
    <div class="footer-content">
    <img src="../img/light-logo.png" alt="" class="footer-logo">
    <div class="footer-ul-container">
        <ul class="category">
            <li class="category-title">men</li>
            <li><a href="" class="footer-link">T-shirt</a></li>
            <li><a href="" class="footer-link">shirt</a></li>
            <li><a href="" class="footer-link">trousers</a></li>
            <li><a href="" class="footer-link">Casual</a></li>
            <li><a href="" class="footer-link">sports</a></li>
            <li><a href="" class="footer-link">sweatshirt</a></li>
            <li><a href="" class="footer-link">jeans</a></li>
            <li><a href="" class="footer-link">soes</a></li>
            <li><a href="" class="footer-link">formals</a></li>
            <li><a href="" class="footer-link">watch</a></li>
        </ul>
        <ul class="category">
            <li class="category-title">women</li>
            <li><a href="" class="footer-link">T-shirt</a></li>
            <li><a href="" class="footer-link">shirt</a></li>
            <li><a href="" class="footer-link">trousers</a></li>
            <li><a href="" class="footer-link">Casual</a></li>
            <li><a href="" class="footer-link">sports</a></li>
            <li><a href="" class="footer-link">sweatshirt</a></li>
            <li><a href="" class="footer-link">jeans</a></li>
            <li><a href="" class="footer-link">soes</a></li>
            <li><a href="" class="footer-link">formals</a></li>
            <li><a href="" class="footer-link">watch</a></li>
        </ul>

    </div>
</div>
<p class="footer-title"> About company</p>
<p class="footer-info">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint eius amet modi nesciunt
    sequi dolores illum, blanditiis laudantium praesentium odit at atque, quo itaque. Officia earum qui voluptas
    laborum alias? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos beatae sit excepturi facilis
    distinctio neque quas suscipit at, incidunt quasi earum esse sed iure saepe perferendis deleniti ea, tempore
    doloremque!
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum ut cupiditate, et voluptates voluptatem esse,
    nisi dicta qui nulla, ipsum animi assumenda porro. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
    Nihil recusandae odit nemo et, nulla molestiae quasi totam dicta at facilis.</p>

<p class="footer-email">supprot Emails: help@clothing.com , customersupport@clothing.com</p>

<p class="footer-telephone-no">telephone: 180 00 00 001, 180 00 00 002</p>
<div class="footer-social-container">
    <div>
        <a href="" class="social-link">terms and services</a>
        <a href="" class="social-link">privacy page</a>
    </div>
    <div>
        <a href="" class="social-link">instagram</a>
        <a href="" class="social-link">facebook</a>
        <a href="" class="social-link">twitter</a>
    </div>
</div>
<div class="social-credit">
    <p>clothing, best appearls online store</p>
</div>
`
}
createFotter()