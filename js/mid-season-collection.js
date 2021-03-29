function renderProdMid(item) {
    const products = document.querySelector('.mid-season-collection');
    products.innerHTML = '';
    for (const product of item) {
        products.innerHTML += `
                <div class="season-item">
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

async function fetchAndRenderMid() {
    const response = await fetch('json/midSeasonCollection.json');
    const products = await response.json();
    renderProdMid(products);
}

fetchAndRenderMid();