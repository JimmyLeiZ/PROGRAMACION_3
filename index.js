// Variables de elementos HTML
const btnCart = document.querySelector('.icon-cart');
const containerCartProducts = document.querySelector('.container-cart-products');
const cartProducts = document.querySelector('.container-cart-products .cart-product');
const cartTotal = document.querySelector('.cart-total');
const totalAmount = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const itemsList = document.querySelector('.container-items');

// Array de productos en el carrito
let cartItems = [];

// Mostrar u ocultar el carrito
btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

// Agregar productos al carrito
itemsList.addEventListener('click', (e) => {
	if (e.target.tagName === 'BUTTON') {
		const product = e.target.parentElement;
		const title = product.querySelector('h2').textContent;
		const price = product.querySelector('.price').textContent;

		// Verificar si el producto ya está en el carrito
		const existingItem = cartItems.find((item) => item.title === title);

		if (existingItem) {
			existingItem.quantity++;
		} else {
			const newItem = {
				title: title,
				price: price,
				quantity: 1,
			};
			cartItems.push(newItem);
		}

		updateCart();
	}
});

// Eliminar productos del carrito
cartProducts.addEventListener('click', (e) => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('.titulo-producto-carrito').textContent;

		// Filtrar los productos y eliminar el seleccionado
		cartItems = cartItems.filter((item) => item.title !== title);

		updateCart();
	}
});

// Actualizar el carrito y mostrar el total
function updateCart() {
	// Limpiar el carrito
	cartProducts.innerHTML = '';

	let total = 0;
	let totalItems = 0;

	// Actualizar productos en el carrito
	cartItems.forEach((item) => {
		const cartProduct = document.createElement('div');
		cartProduct.classList.add('cart-product');

		cartProduct.innerHTML = `
			<div class="info-cart-product">
				<span class="cantidad-producto-carrito">${item.quantity}</span>
				<p class="titulo-producto-carrito">${item.title}</p>
				<span class="precio-producto-carrito">${item.price}</span>
			</div>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		`;

		cartProducts.appendChild(cartProduct);

		const price = parseInt(item.price.slice(2).replace(',', ''));
		const quantity = item.quantity;
		total += price * quantity;
		totalItems += quantity;
	});

	// Mostrar el total y la cantidad de productos en el carrito
	totalAmount.textContent = `₡ ${total.toLocaleString()}`;
	countProducts.textContent = totalItems;

	// Mostrar u ocultar el carrito según el contenido
	if (cartItems.length > 0) {
		cartTotal.style.display = 'block';
	} else {
		cartTotal.style.display = 'none';
	}
}
