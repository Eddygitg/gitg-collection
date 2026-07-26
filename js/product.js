const product = JSON.parse(
    localStorage.getItem("selectedProduct")
);

if (product) {

    // ==========================
    // PRODUCT INFO
    // ==========================

    document.querySelector(".product-details h1").textContent =
        product.name;

    document.querySelector(".product-price").textContent =
        "₦" + product.price.toLocaleString();

    document.querySelector(".product-description").textContent =
        product.description;

    document.querySelector(".product-rating span").textContent =
        `(${product.reviews} Reviews)`;
    
// ==========================
// SIZES
// ==========================

let selectedSize = "";

const sizeContainer = document.getElementById("size-buttons");

sizeContainer.innerHTML = "";

selectedSize = "";

product.sizes.forEach(size => {

    const button = document.createElement("button");

    button.textContent = size;

    button.addEventListener("click", () => {

        document
            .querySelectorAll("#size-buttons button")
            .forEach(btn => btn.classList.remove("active-size"));

        button.classList.add("active-size");

        selectedSize = size;

    });

    sizeContainer.appendChild(button);

});

// ==========================
// CURRENT IMAGE INDEX
// ==========================

let currentImage = 0;

// ==========================
// MAIN IMAGE
// ==========================

const mainImage =
    document.getElementById("main-product-image");

mainImage.src = product.images[0];

   // ==========================
// THUMBNAILS
// ==========================

const thumbnailContainer =
    document.querySelector(".thumbnail-images");

thumbnailContainer.innerHTML = "";

product.images.forEach((image, index) => {

    const thumb = document.createElement("img");

    thumb.src = image;

    thumb.classList.add("thumbnail");

    if (index === 0) {
        thumb.classList.add("active-thumb");
    }

    thumb.addEventListener("click", () => {

        // Save the currently selected image
        currentImage = index;

        // Change the main image
        mainImage.src = image;

        // Remove active class from all thumbnails
        document
            .querySelectorAll(".thumbnail")
            .forEach(t => t.classList.remove("active-thumb"));

        // Highlight the clicked thumbnail
        thumb.classList.add("active-thumb");

    });

    thumbnailContainer.appendChild(thumb);

});

    let quantity = 1;

const quantityText =
document.getElementById("quantity");

document.getElementById("plus-btn")
.addEventListener("click", () => {

    quantity++;

    quantityText.textContent = quantity;

});

document.getElementById("minus-btn")
.addEventListener("click", () => {

    if(quantity > 1){

        quantity--;

        quantityText.textContent = quantity;

    }

});

// ==========================
// PRODUCT PAGE ADD TO CART
// ==========================

const addCartButton =
    document.getElementById("product-add-cart");

addCartButton.addEventListener("click", () => {

    // Make sure a size is selected
    if(selectedSize === ""){

        alert("Please select a size.");

        return;

    }

    // Load current cart
    const cart = window.cart || JSON.parse(localStorage.getItem("cart")) || [];

    // Check if this exact product + size already exists
    const existingProduct = cart.find(item =>

        item.id === product.id &&
        item.size === selectedSize

    );

    if(existingProduct){

        existingProduct.quantity += quantity;

    }else{

        cart.push({

            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            size: selectedSize,
            quantity: quantity

        });

    }

   localStorage.setItem(
    "cart",
    JSON.stringify(cart)
);

// Refresh the cart sidebar and count
if (typeof updateCart === "function") {
    updateCart();
}

alert("Product added to cart!");

});   // <-- This closes addEventListener()

// ==========================
// RELATED PRODUCTS
// ==========================

const relatedContainer =
document.getElementById("related-products-grid");

products
.filter(item => item.id !== product.id)
.slice(0,4)
.forEach(item=>{

    relatedContainer.innerHTML += `

<div class="product-card">

<a href="product.html"
class="product-image"
data-id="${item.id}">

<img src="${item.images[0]}">

</a>

<h3>${item.name}</h3>

<p class="price">
₦${item.price.toLocaleString()}
</p>

<button
class="primary-btn add-related-cart"
data-id="${item.id}">
Add to Cart
</button>

</div>

`;

});

document
.querySelectorAll(".related-products .product-image")
.forEach(link=>{

link.addEventListener("click",function(){

const id =
Number(this.dataset.id);

const selected =
products.find(p=>p.id===id);

localStorage.setItem(
"selectedProduct",
JSON.stringify(selected)
);

});

});

// ==========================
// PRODUCT TABS
// ==========================

const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(btn =>
            btn.classList.remove("active-tab")
        );

        contents.forEach(content =>
            content.classList.remove("active-content")
        );

        tab.classList.add("active-tab");

        document
            .getElementById(tab.dataset.tab)
            .classList.add("active-content");

    });

});
document.getElementById("breadcrumb-product-name").textContent =
    product.name;

 const colorContainer =
document.getElementById("color-buttons");

colorContainer.innerHTML = "";

products
.filter(item => item.group === product.group)
.forEach(item => {

    const button =
    document.createElement("button");

    button.textContent = item.color;

    if(item.id === product.id){
        button.classList.add("active-color");
    }

    button.addEventListener("click",()=>{

        localStorage.setItem(
            "selectedProduct",
            JSON.stringify(item)
        );

        location.reload();

    });

    colorContainer.appendChild(button);

});
 
// ==========================
// IMAGE ZOOM
// ==========================

const zoomContainer =
document.querySelector(".image-zoom-container");

const zoomImage =
document.getElementById("main-product-image");

zoomContainer.addEventListener("mousemove",(e)=>{

    const rect =
    zoomContainer.getBoundingClientRect();

    const x =
    ((e.clientX - rect.left) / rect.width) * 100;

    const y =
    ((e.clientY - rect.top) / rect.height) * 100;

    zoomImage.style.transformOrigin =
    `${x}% ${y}%`;

});

zoomContainer.addEventListener("mouseenter",()=>{

    zoomImage.style.transform = "scale(2)";

});

zoomContainer.addEventListener("mouseleave",()=>{

    zoomImage.style.transform = "scale(1)";

    zoomImage.style.transformOrigin = "center";

});

// ==========================
// IMAGE LIGHTBOX
// ==========================

const lightbox =
document.getElementById("lightbox");

const lightboxImage =
document.getElementById("lightbox-image");

const closeLightbox =
document.getElementById("close-lightbox");

const prevButton =
document.getElementById("prev-image");

const nextButton =
document.getElementById("next-image");

// Open lightbox
mainImage.addEventListener("click",()=>{

    currentImage = product.images.indexOf(mainImage.src.split("/").pop());

    if(currentImage === -1){
        currentImage = 0;
    }

    lightboxImage.src = product.images[currentImage];

    lightbox.classList.add("active");

});

// Close
closeLightbox.addEventListener("click",()=>{

    lightbox.classList.remove("active");

});

// Next image
nextButton.addEventListener("click",()=>{

    currentImage++;

    if(currentImage >= product.images.length){

        currentImage = 0;

    }

    lightboxImage.src = product.images[currentImage];

});

// Previous image
prevButton.addEventListener("click",()=>{

    currentImage--;

    if(currentImage < 0){

        currentImage = product.images.length - 1;

    }

    lightboxImage.src = product.images[currentImage];

});
}      // <-- This closes if(product)