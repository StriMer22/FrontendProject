class ProductList {
    constructor(cart) {
      this.cart = cart;
      this.container = document.querySelector(".mid-season-collection");
      this.productService = new ProductsService();
      this.productService
        .getProducts()
        .then(() => this.renderProducts())
        .then(() => this.addEventListeners());
    }
    async renderProducts() {
      let productListDomString = "";
      const products = await this.productService.getProducts();
      [...products]
        .forEach((product) => {
          productListDomString += `<div class="season-item">
                        <a href="item-page.html">
                        <img src="img/${product.image}" alt="${product.title}" class="item-img">
                        <span class="menu-nav">${product.title}</span>
                        </a>
                        <span class="menu-price">$${product.price},00USD</span>
                        <a href="#" class="btn btn-primary basket-shop-btn" data-id="${product.id}">Add to Cart</a>
                 </div>`;
        });
      this.container.innerHTML = productListDomString;
    }
    async addEventListeners() {
        document
        .querySelectorAll('.basket-shop-btn')
        .forEach(button =>
            button.addEventListener('click', event =>
            this.handleProductBuyClick(event)
            )
        );
    }     handleProductBuyClick(event) {
            const button = event.target;
            const id = button.dataset.id;
            this.cart.addProduct(id);
        }
}