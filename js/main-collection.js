//need to add Men and shoes section

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
        "image": "main-collection-one.jfif"
    },
    {
        "title": "Quicksilver Workout Top",
        "price": 12.00,
        "image": "main-collection-one.jfif"
    }
]
`;


function prodWomen(productsWomen) {
    const products = document.querySelector('.main-collection-content');
    products.innerHTML = '';
    for (const product of productsWomen) {
        products.innerHTML += `
        <article class="main-collection-item">
                    <img src="img/${product.image}" alt="${product.title}" class="main-collection-image">
                    <a class="main-collection-name">${product.title}</a>
                    <p class="main-collection-price">$${product.price},00USD</p>
                    <button class="main-collection-button">Add to Cart</button>
                </article>
        `
    }
}


prodWomen(JSON.parse(productsWomen));

const womenBtn = document.getElementById('tab-women-button');
