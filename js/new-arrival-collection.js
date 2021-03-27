function renderProdNew(item) {
    const products = document.querySelector('.new-arrival-collection');
    products.innerHTML = '';
    for (const product of item) {
        products.innerHTML += `
                    <div class="season-item w-100">
                        <a href="item-page.html">
                            <img src="img/${product.image}" alt="${product.title}" class="item-img">
                            <span class="menu-nav">${product.title}</span>
                        </a>
                        <span class="menu-price">$${product.price},00USD</span>
                        <button class="shop-button">Add to Cart</button>
                    </div>
        `
    }
}

async function fetchAndRenderNew() {
    const response = await fetch('json/newArrivalCollection.json');
    const products = await response.json();
    renderProdNew(products);
}

fetchAndRenderNew();