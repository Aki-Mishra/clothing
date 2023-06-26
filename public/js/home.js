

const sliderzButtonsWorkingfunc = () => {
    let productContainers = [...document.querySelectorAll('.product-container')];
    let nxtBtn = [...document.querySelectorAll('.next-btn')];
    let preBtn = [...document.querySelectorAll('.pre-btn')];

    productContainers.forEach((item, i) => {
        let containerDimenstions = item.getBoundingClientRect();
        let containerWidth = containerDimenstions.width;

        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        })

        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        })
    })
}
let fetchDataAcToTags = (tags) => {
    let data = fetch('/get-product', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ tag: tags })
    }).then((res) => res.json())
    return data
}


const createProductCards = async (data) => {
    let productInnerHTML = '';
    await data.forEach(e => {

        productInnerHTML += ` 
     <div class="product-card">
            <div class="product-image">
                <span class="discount-tag">${Math.floor(e.discountPrecent)}% off</span>
                <img src="${e.imagesPaths[0]}" alt="" class="product-thumbnail">
                    <button class="whislist-btn" onclick=" whishlistFunc('${e.productName}', '${Number(Math.floor(e.sellingPrice))}', '${e.imagesPaths[0]}', '${e.shortDes}')"> Add to whishlist</button>
            </div>
            <div class="product-info">
                <p class="brand">${e.productName}</p>
                <p class="product-line">${e.shortDes}</p>
                <span class="price">${Math.floor(e.sellingPrice)}</span><span class="actual-price">${Math.floor(e.actualPrice)}</span>
            </div>
        </div>
        `
    })

    return productInnerHTML
}
const createProductSliders = async (data, parentClass, title) => {
    let sliderConatiner = document.querySelector(`.${parentClass}`);
    sliderConatiner.innerHTML = `
    <section class="product">
        <h2 class="category">${title} </h2>
        <div class="product-container">
            <button class="pre-btn"><img src="../img/arrow.png" class="arrow-image" alt=""></button>
            <button class="next-btn"><img src="../img/arrow.png" class="arrow-image" alt=""></button>
            ${await createProductCards(data)}
      </div>
    </section>
  `;
    sliderzButtonsWorkingfunc();
}
const forhomeFunc = () =>{
    fetchDataAcToTags('trending').then(data => { createProductSliders(data, "trending", "trending") })
    fetchDataAcToTags('mens').then(data => { createProductSliders(data, "best-in-mens", "for mens") })
}


async function whishlistFunc(name, price, productImage, shortDes) {

    let product = {
        item: 1,
        name: name,
        price: price,
        productImage: productImage,
        shortDes: shortDes,
    }
    let cartData = JSON.parse(localStorage.getItem('cart'));
    if (cartData == null) {
        cartData = [];
    }
    await cartData.push(product);
    localStorage.setItem('cart', JSON.stringify(cartData));
}