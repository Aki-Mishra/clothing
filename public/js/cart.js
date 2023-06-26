

console.log('working')


const createProductCard = (data, name) => {
	return `
    <div class="${name}-product-card">
        <img class="${name}-product-img" src="${data.productImage}" alt="">
        <div class="${name}-product-info">
            <p class="${name}-product-name sub-heading text">${data.name}</p>
            <p class="${name}-product-short-des text">${data.shortDes}</p>
        </div>
        <div class="increment-and-decrement-btn-section">
            <button class="btn ${name}-decrement"  >-</button>
            <p class="${name}-num">${data.item}</p>
            <button class="btn ${name}-increment"  >+</button>
        </div>
        <p class="${name}-price" product-price="${data.price}">${data.price * data.item}</p>
        <button class="${name}-product-deleteBtn"><img src="img/close.png" alt=""></button>
    </div>
`
}



// increment Decremen Working
const itemCountFunc = (name) => {
	let incrementBtn = document.querySelectorAll(`.${name}-increment`);
	let decrementBtn = document.querySelectorAll(`.${name}-decrement`);
	let price = document.querySelectorAll(`.${name}-price`);
	let num = document.querySelectorAll(`.${name}-num`);
	let totalBill = document.querySelector('.total-bill');



	decrementBtn.forEach((element, i) => {
		element.addEventListener('click', () => {
			if (num[i].innerHTML > 1) {
				num[i].innerHTML--;
				let storageData = JSON.parse(localStorage.getItem(name))
				storageData[i].item = Number(num[i].innerHTML)
				localStorage.setItem(name, JSON.stringify(storageData))

				price[i].innerHTML = Number(price[i].innerHTML) - Number(price[i].getAttribute('product-price'));
				if (name == 'cart') { // updating totalbill
					totalBill.innerHTML = Number(totalBill.innerHTML) - Number(price[i].getAttribute('product-price'));
				};
			}
		})
	})
	incrementBtn.forEach((element, i) => {
		element.addEventListener('click', () => {
			console.log(num[i].innerHTML)
			num[i].innerHTML++;
			let storageData = JSON.parse(localStorage.getItem(name))
			storageData[i].item = Number(num[i].innerHTML)
			localStorage.setItem(name, JSON.stringify(storageData))
			price[i].innerHTML = Number(price[i].innerHTML) + Number(price[i].getAttribute('product-price'));
			if (name == 'cart') { // updating totalbill
				totalBill.innerHTML = Number(totalBill.innerHTML) + Number(price[i].getAttribute('product-price'))
			};
		})
	})
}



// deleteBtn working
const deletebtnfunc = (name) => {
	let deletebtn = document.querySelectorAll(`.${name}-product-deleteBtn`);
	let productCard = document.querySelectorAll(`.${name}-product-card`);
	let price = document.querySelectorAll(`.${name}-price`)
	let totalBill = document.querySelector('.total-bill');

	deletebtn.forEach((element, i) => {
		element.addEventListener('click', () => {
			productCard[i].classList.add('hide');
			let storageData = JSON.parse(localStorage.getItem(name));
			storageData.splice(i, 1);
			if (!storageData.length) {  // placing empty image if all items are deleted
				let mainSection = document.querySelector(`.${name}-products`);
				mainSection.innerHTML = `<img class="emptly-image" src="img/empty-cart.png" alt="">`;
			}
			if (name == 'cart') {  // it works only for carts
				totalBill.innerHTML = Number(totalBill.innerHTML) - Number(price[i].innerHTML);
			}

			localStorage.setItem(name, JSON.stringify(storageData));
			location.reload();
		})
	})
}

let setData = (name) => {
	let mainSection = document.querySelector(`.${name}-products`);
	let data = JSON.parse(localStorage.getItem(name));
	let totalBill = document.querySelector('.total-bill');

	if (data == null || !data.length) {
		mainSection.innerHTML = `<img class="emptly-image" src="img/empty-cart.png" alt="">`;

	} else {
		data.forEach(element => {
			mainSection.innerHTML += createProductCard(element, name);
			if (name == 'cart') {  // it works only for carts
				totalBill.innerHTML = Number(totalBill.innerHTML) + Number(element.price * element.item)
			}
		});

		let num = document.querySelectorAll(`.${name}-num`)
		let inner = num[0].innerHTML
		itemCountFunc(name);
		deletebtnfunc(name)
	}



}
try {
	setData('wishlist')
	setData('cart')

} catch (err) {
	
}
