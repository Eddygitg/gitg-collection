/* =====================================================
   GITG COLLECTION
   SHOPPING CART SCRIPT
===================================================== */

/* =========================
   CART ELEMENTS
========================= */

const cartBtn = document.getElementById("cart-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCart = document.getElementById("close-cart");
const overlay = document.getElementById("cart-overlay");

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

const addToCartButtons = document.querySelectorAll(".add-to-cart");

console.log(cartBtn);
console.log(cartSidebar);
console.log(closeCart);
console.log(overlay);

/* =========================
   LOAD SAVED CART
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];
/* =========================
   OPEN CART
========================= */

if (cartBtn && cartSidebar && overlay) {

    cartBtn.addEventListener("click", () => {

        cartSidebar.classList.add("active");
        overlay.classList.add("active");

    });

}
/* =========================
   CLOSE CART
========================= */

if (closeCart && overlay && cartSidebar) {

    closeCart.addEventListener("click", closeCartSidebar);

    overlay.addEventListener("click", closeCartSidebar);

}

function closeCartSidebar() {

    cartSidebar.classList.remove("active");
    overlay.classList.remove("active");

}

/* =========================
   ADD TO CART
========================= */

addToCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const id = Number(button.dataset.id);

        const product = products.find(item => item.id === id);

        if (!product) return;

        const existingProduct = cart.find(item =>
            item.id === product.id &&
            item.size === "N/A"
        );

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                size: "N/A",
                quantity: 1

            });

        }

        updateCart();

        alert("Product added to cart!");

    });

});

/* =========================
   UPDATE CART
========================= */

function updateCart(){

    cartItems.innerHTML = "";

    let total = 0;
    let totalItems = 0;

    if(cart.length === 0){

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    }

    cart.forEach((product,index)=>{

        total += product.price * product.quantity;

        totalItems += product.quantity;

        cartItems.innerHTML += `

<div class="cart-item">

    <img
        src="${product.image}"
        alt="${product.name}"
        class="cart-image"
    >

    <div class="cart-info">

        <h4>${product.name}</h4>

        <p>Size: ${product.size || "N/A"}</p>

        <p>₦${product.price.toLocaleString()}</p>

        <div class="cart-controls">

            <button onclick="decreaseQuantity(${index})">−</button>

            <span>${product.quantity}</span>

            <button onclick="increaseQuantity(${index})">+</button>

            <button
                class="remove-btn"
                onclick="removeItem(${index})"
            >
                <i class="fas fa-trash"></i>
            </button>

        </div>

    </div>

</div>

`;

    });

    cartCount.textContent = totalItems;

    cartTotal.textContent = "₦" + total.toLocaleString();

    /* Save Cart*/

    localStorage.setItem("cart", JSON.stringify(cart));

}

/* =========================
   INCREASE QUANTITY
========================= */

function increaseQuantity(index){

    cart[index].quantity++;

    updateCart();

}

/* =========================
   DECREASE QUANTITY
========================= */

function decreaseQuantity(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    updateCart();

}

/* =========================
   REMOVE ITEM
========================= */

function removeItem(index){

    cart.splice(index,1);

    updateCart();

}
/* =========================
   INITIALIZE CART
========================= */

updateCart();
/* =========================
   OPEN PRODUCT PAGE
========================= */

const productLinks = document.querySelectorAll(".product-image");

productLinks.forEach((link) => {

    link.addEventListener("click", function () {

        const card = this.closest(".product-card");

        const id = Number(
            card.querySelector(".add-to-cart").dataset.id
        );

        const product = products.find(p => p.id === id);

        console.log("Clicked Product:", product);

        localStorage.setItem(
            "selectedProduct",
            JSON.stringify(product)
        );

    });

});

window.updateCart = updateCart;
window.cart = cart;

/* =========================
   WISHLIST COUNT
========================= */

function updateWishlistCount() {

    const wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    const wishlistCount =
        document.getElementById("wishlist-count");

    if (wishlistCount) {

        wishlistCount.textContent = wishlist.length;

    }

}

updateWishlistCount();
/* =========================
   WISHLIST
========================= */

let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

document
.querySelectorAll(".wishlist-btn")
.forEach(button => {

    const id = Number(button.dataset.id);

    // Restore wishlist state
    if (wishlist.includes(id)) {

        button.classList.add("active");
        button.innerHTML = '<i class="fa-solid fa-heart"></i>';

    } else {

        button.innerHTML = '<i class="fa-regular fa-heart"></i>';

    }

    button.addEventListener("click", () => {

        if (wishlist.includes(id)) {

            wishlist = wishlist.filter(item => item !== id);

            button.classList.remove("active");
            button.innerHTML = '<i class="fa-regular fa-heart"></i>';

        } else {

            wishlist.push(id);

            button.classList.add("active");
            button.innerHTML = '<i class="fa-solid fa-heart"></i>';

        }

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        updateWishlistCount();

    });

});