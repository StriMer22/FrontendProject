const womenBtn = document.getElementById('tab-women-button');
const menBtn = document.getElementById('tab-men-button');
const shoesBtn = document.getElementById('tab-shoes-button');

function renderProdMain(item) {
    const products = document.querySelector('.main-collection-content');
    products.innerHTML = '';
    for (const product of item) {
        products.innerHTML += `
        <article class="main-collection-item">
                    <a href="item-page.html">
                    <img src="img/${product.image}" alt="${product.title}" class="main-collection-image">
                    <span class="menu-nav">${product.title}</span>
                    </a>
                    <p class="menu-price">$${product.price},00USD</p>
                    <button class="shop-button">Add to Cart</button>
                </article>
        `
    }
}

async function fetchAndRenderMain(partOfJSON) {
    const response = await fetch(partOfJSON);
    const products = await response.json();
    renderProdMain(products);
}

fetchAndRenderMain('json/mainCollectionWomen.json');
womenBtn.addEventListener('click', () => fetchAndRenderMain('json/mainCollectionWomen.json'));
menBtn.addEventListener('click', () => fetchAndRenderMain('json/mainCollectionMen.json'));
shoesBtn.addEventListener('click', () => fetchAndRenderMain('json/mainCollectionShoes.json'));




