const productsWomen = `
[
    {
        "title": "Puma Sports Bra",
        "price": 12.00,
        "image": "main-collection-one.jfif"
    },
    {
        "title": "Reebok Long Sleave Top",
        "price": 18.00,
        "image": "main-collection-two.jfif"
    },
    {
        "title": "Quicksilver Workout Top",
        "price": 12.00,
        "image": "main-collection-three.jfif"
    }
]
`;

const productsMen = `
[
    {
        "title": "Adidas Compression Tee",
        "price": 33.00,
        "image": "main-collection-male-three.jfif"
    },
    {
        "title": "Reebok Fitness Jacket",
        "price": 52.00,
        "image": "main-collection-male-two.jfif"
    },
    {
        "title": "Quicksilver Tech T-Shirt",
        "price": 21.00,
         "image": "main-collection-male-one.jfif"
    }
]
`;

const productsShoes = `
[
    {   
        "title": "Adidas Campus",
        "price": 130.00,
        "image": "main-collection-shoes-one.jfif"
    },
   
    {
        "title": "Puma Basket Shoes",
        "price": 140.00,
        "image": "main-collection-shoes-two.jfif"
    },
     {
        "title": "Nike Amanda Running Shoes",
        "price": 120.00,
        "image": "main-collection-shoes-three.jfif"
    }
    
]
`;

function prod(productsWomen) {
    const products = document.querySelector('.main-collection-content');
    products.innerHTML = '';
    for (const product of productsWomen) {
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

function prodMen(productsMen) {
    const products = document.querySelector('.main-collection-content');
    products.innerHTML = '';
    for (const product of productsMen) {
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

function prodShoes(productsShoes) {
    const products = document.querySelector('.main-collection-content');
    products.innerHTML = '';
    for (const product of productsShoes) {
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

prod(JSON.parse(productsWomen));
prodMen(JSON.parse(productsMen));
prodShoes(JSON.parse(productsShoes));

const womenBtn = document.getElementById('tab-women-button');
const menBtn = document.getElementById('tab-men-button');
const shoesBtn = document.getElementById('tab-shoes-button');

womenBtn.addEventListener('click', () => prod(JSON.parse(productsWomen)));
menBtn.addEventListener('click', () => prodMen(JSON.parse(productsMen)));
shoesBtn.addEventListener('click', () => prodShoes(JSON.parse(productsShoes)));

