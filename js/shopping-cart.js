class ShoppingCart {
    constructor() {
        this.productService = new ProductsService();
        this.cartContainer = document.querySelector("#shoppingCartWindow");
        this.cart = JSON.parse(localStorage["cart"] || "{}");
        this.addEventListeners();
    }

    addEventListeners() {
        document
            .querySelector(".openCart")
            .addEventListener("click", () => this.renderCart());
    }

    saveCart() {
        localStorage['cart'] = JSON.stringify(this.cart);
    }

    async renderCart() {
        let total = 0;
        let cartDomSting = `  
  <div class="modal-body-product">
                        <p class="modal-body-title">Products</p>
                        <div class="modal-body-wrap">
                            <div class="modal-body-item">
                                <img src="" alt="" class="modal-body-image">
                                <p class="modal-body-name"></p>
                            </div>
                            <div class="modal-body-amount">
                            </div>
                        </div>`;

        for (const id in this.cart) {
            const product = await this.productService.getProductById(id);
            total += product.price * this.cart[id];
            cartDomSting += `
<div class="modal-body-product" data-id="${id}">
                        <p class="modal-body-title">Products</p>
                        <div class="modal-body-wrap">
                            <div class="modal-body-item">
                                <img src="img/${product.image}" alt="${product.title}" class="modal-body-image">
                                <p class="modal-body-name">${product.title}</p>
                            </div>
                            <div class="modal-body-amount">
                                <label>
                                    <input type="number" readonly value="${this.cart[id]}">
                                </label>
                                <p class="modal-body-price">$${product.price}.00USD</p>
                            </div>
                        </div>
                    </div>
                    <p class="modal-body-sum">Total: $${total},00USD</p>`;
        }
        total = total.toFixed(2);
        cartDomSting += `
                  <div class="row">
                      <div class="col-5"><strong>TOTAL</strong></div>
                      <div class="col-3"><strong>$${total}</strong></div>
                  </div>            
          </div>`;
        this.cartContainer.querySelector(".modal-dialog").innerHTML = cartDomSting;
    }

    changeQuantity(ev, operation) {
        const button = ev.target;
        const id = button.dataset.id;
        operation.call(this, id);
        this.renderCart();
    }

    addProduct(id) {
        this.cart[id] = (this.cart[id] || 0) + 1;
        this.saveCart();
    }

    deleteProduct(id) {
        if (this.cart[id] > 1) {
            this.cart[id] -= 1;
        } else {
            delete this.cart[id];
        }
        this.saveCart();
    }
}
