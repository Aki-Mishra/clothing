let tag;
if (location.pathname != '/search') {
    console.log("working");
    let loca = location.pathname.split("/");
    tag = loca[loca.length - 1].toLowerCase();

}
fetchDataAcToTags(tag).then(async (data) => {
    let productContainer = document.querySelector('.product-container');
    let productName = document.querySelector('.heading');
    console.log(data)
    if (data != 'no products') {
        productName.innerHTML =`search result for <span class="productName">${tag}</span>`
        createProductCards(data).then(data => {
            productContainer.innerHTML = data;
        }).catch(err => { console.log(err) });
    } else {
        productName.innerHTML = 'No results found'
    }

})