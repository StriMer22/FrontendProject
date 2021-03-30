class ShoppingCart {
    constructor() {
        this.productService = new ProductsService();
        this.cartContainer = document.querySelector("#shoppingCartWindow");
        this.cart = JSON.parse(localStorage["cart"] || "{}");
        this.updateCartCounter();
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
                <div class="modal-header">
                    <h5 class="modal-title" id="shoppingCartLabel">Shopping cart</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
  <div class="modal-body-products-container">
                        <p class="modal-body-title">Products</p>`;

        for (const id in this.cart) {
            const product = await this.productService.getProductById(id);
            total += product.price * this.cart[id];
            cartDomSting += `
<div class="modal-body-product" data-id="${id}">
                        <div class="modal-body-wrap">
                            <div class="modal-body-item">
                                <img src="img/${product.image}" alt="${product.title}" class="modal-body-image">
                                <p class="modal-body-name">${product.title}</p>
                            </div>
                            <div class="modal-body-amount">
                                <div class="modal-body-amount-inputs">
                                <div class="col-1"><button data-id=${id} class="btn btn-sm plus">+</button></div>
                                <input type="number" value="${this.cart[id]}">
                                <div class="col-1"><button data-id=${id} class="btn btn-sm minus">-</button></div>
                                <p class="modal-body-price">$${product.price}.00USD</p>
                                </div>
                                <span class="modal-body-delete" data-id="${id}">
                                <div class="col-1"><button data-id=${id} class="btn btn-sm minus"><img src="img/instagram.svg" alt=""></button></div>
                                </span>
                            </div>
                        </div>
                    </div>
<!--                    <p class="modal-body-sum">Total: $${total},00USD</p>-->`;
        }
        total = total.toFixed(2);
        cartDomSting += `
                  <div class="row">
                      <div class="col-5"><strong>TOTAL</strong></div>
                      <div class="col-1"><strong>$${total}</strong></div>
                  </div>      
                  `;
        cartDomSting += this.concatForm();
        this.cartContainer.querySelector(".modal-dialog").innerHTML = cartDomSting;

        document
            .querySelectorAll('.modal-body-delete')
            .forEach(button =>
                button.addEventListener('click', event => {
                        console.log(event);
                        const button = event.target;
                        const id = button.dataset.id;
                        this.deleteProduct(id);
                    }
                )
            );
        this.cartContainer
            .querySelectorAll('.minus')
            .forEach(el =>
                el.addEventListener('click', ev =>
                    this.changeQuantity(ev, this.deleteOneProduct)
                )
            );

        this.cartContainer
            .querySelectorAll('.modal-body-delete')
            .forEach(el =>
                el.addEventListener('click', ev =>
                    this.changeQuantity(ev, this.deleteProduct)
                )
            );
        this.cartContainer
            .querySelectorAll('.plus')
            .forEach(el =>
                el.addEventListener('click', ev =>
                    this.changeQuantity(ev, this.addProduct)
                )
            );
    }

    changeQuantity(ev, operation) {
        const button = ev.target;
        const id = button.dataset.id;
        operation.call(this, id);
        this.renderCart();
    }

    concatForm() {
        return `<div>
                        <p class="modal-body-title">Place an order</p>
                        <form action="" class="modal-body-form">
                            <label>
                                Name*
                                <input type="text" placeholder="Your name">
                            </label>
                            <label>
                                Email*
                                <input type="email" placeholder="Your email address">
                            </label>
                            <label>
                                Phone*
                                <input type="tel" placeholder="Your phone">
                            </label>
                            <label>
                                Comment
                                <textarea name="" id="" placeholder="Your comment"></textarea>
                            </label>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <a class="modal-footer-close" data-bs-dismiss="modal">Continue shopping</a>
                        <button type="button" class="modal-footer-order">Order</button>
                    </div>
            </div>`
    }

    updateCartCounter() {
        if (!Object.keys(this.cart).length) {
            document.querySelector("#shop-cart-count").innerHTML = '0';
            return;
        }
        document.querySelector("#shop-cart-count").innerHTML
            = Object.values(this.cart).reduce((accumulator, currentValue) => accumulator + currentValue).toString();
    }

    addProduct(id) {
        this.cart[id] = (this.cart[id] || 0) + 1;
        this.saveCart();
        this.updateCartCounter();
    }

    deleteOneProduct(id) {
        this.cart[id] = (this.cart[id] || 0) - 1;
        if (this.cart[id] === 0){
            delete this.cart[id];
        }
        this.saveCart();
        this.updateCartCounter();
    }

    deleteProduct(id) {
        delete this.cart[id];
        this.saveCart();
        let itemToRemove = [...document.querySelectorAll(`.modal-body-product`)].filter(item =>
            !!item.dataset && item.dataset.id === id)[0];
        if (!!itemToRemove) {
            itemToRemove.parentElement.removeChild(itemToRemove);
        }
        this.updateCartCounter();
    }
}
