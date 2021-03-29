class ShoppingCart {
    constructor() {
        this.productService = new ProductsService();
        this.cartContainer = document.querySelector("#shoppingCartWindow");
        this.cart = JSON.parse(localStorage["cart"] || "{}");
    }
}
