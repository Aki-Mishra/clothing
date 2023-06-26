

let productData;


let createproduct = (data) => {
    let productContainer = document.querySelector('.product-container')
    data.forEach((element, index) => {
        let item = JSON.stringify(element)
        productContainer.innerHTML += `
        <div class="product-card">
       <div class="product-image">
          ${element.draft? ' <span class="draft-tag">draft</span>': ''}
           <img src="${element.imagesPaths[0] || 'img/no image.png' }" alt="" class="product-thumbnail">
           <button class="card-action-btn edit-btn" onclick="location.href='/addProduct/${element._id}'"><img src="img/edit.png" alt=""></button>
           <button class="card-action-btn open-btn" onclick="location.href ='/product/${element._id}'"><img src="img/open.png" alt=""></button>
           <button class="card-action-btn delete-btn" onclick="deleteAlertPopUp('${element._id}')"><img src="img/delete.png" alt=""></button>
 
       </div>
       <div class="product-info">
           <p class="brand">${element.productName}</p>
           <p class="product-line">${element.shortDes}</p>
           <span class="price">${element.sellingPrice}</span><span class="actual-price">${element.actualPrice}</span>
       </div>`

    });
}

let deleteAlertPopUp = (id) => {
    let elementID = id;
    let deleteAlert = document.querySelector('.delete-alert');
    deleteAlert.style.display = 'flex';

    let closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        deleteAlert.style.display = 'none';
    })

    let deleteConfirmBtn = document.getElementById('conifirm-delete-btn');
    deleteConfirmBtn.addEventListener('click', () => {

        deleteProduct(id);
    })

}


const deleteProduct = (id) => {
    loader.classList.remove('display-none')
    fetch('/delete=product', {
        method: "POST",
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ productId: id })
    }).then(async (res) => {
        let value = await res.json();
        return value
    }).then(response => {
        let deleteAlert = document.querySelector('.delete-alert');
        deleteAlert.style.display = 'none';
        
        if(response!= 'success'){
            showAlert('some error occured, Try again')
        }else{

            location.reload()
        }
    })
};

