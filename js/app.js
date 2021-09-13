const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;  //product image has been added
    const div = document.createElement("div");
    div.classList.add('my-4')
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
        <img class="product-image" src=${image}>
      </div>
      <h5 class="fs-5 fw-bold mt-4">${product.title}</h5>
      <p class="fs-6">Category: ${product.category}</p>
      <h2 class="fw-bold fs-6">Price: $ ${product.price}</h2>
      <small class="d-block fw-bold">Rating: ${product.rating.rate} <i class="fas fa-star text-warning"></i></small>
      <small class="d-block">Total Review: ${product.rating.count}</small>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-warning">add to cart</button>
      <button id="details-btn" onclick="detailsContainer('${product.id}')" class="btn btn-info">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTotal(); // update total price

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  // console.log(converted);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  console.log(convertedOldPrice);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total; //resolved total price to 2 decimal
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.abs(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", (priceConverted * 0.3).toFixed(2));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
  }
  else {
    setInnerText("delivery-charge", 15);
    setInnerText("total-tax", (priceConverted * 0.1).toFixed(2));
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};


// single product details container function
const detailsContainer = (productID) => {
  const url = `https://fakestoreapi.com/products/${productID}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data))
}

const displayDetails = (singleProduct) => {
  const container = document.getElementById('details-container');
  container.innerHTML = `
  <img class="product-image" src=${singleProduct.image}>
  <h5 class="fw-bold text-info">${singleProduct.title}</h5>
  <p class="text-justify">${singleProduct.description.slice(0, 200)}</p>
  <button class="btn btn-warning">Place Order</button>

  `;
}
