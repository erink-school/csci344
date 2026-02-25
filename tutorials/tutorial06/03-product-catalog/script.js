const productGrid = document.querySelector("#productGrid");
const productForm = document.querySelector("#productForm");

const products = [
  {
    name: 'HP OMEN MAX 16-ak0003nr 16" Gaming Laptop',
    price: 1899.99,
    description: 'AMD Ryzen AI 9 HX 375 (2.0GHz) Processor | 32GB DDR5-5600 RAM | NVIDIA GeForce RTX 5080 Graphics Card | 1TB PCIe Gen4 NVMe M.2 SSD | 16" WQXGA IPS Anti-Glare Display | 2.5Gb LAN, 2x2 WiFi 7 (802.11be), Bluetooth 5.4 | 5.88 lbs. (2.67 kg) | Windows 11 Home',
    category: "Electronics",
    inStock: true
  },
  {
    name: "Inland NOVA Ergonomic Mesh Chair - Black",
    price: 399.99,
    description: "Ergonomic chair with 360 degree swivel that supports up to 299 lbs (135.62 kg)",
    category: "Furniture",
    inStock: false
  },
  {
    name: "Appetites: A Cookbook by Anthony Bourdain",
    price: 24.99,
    description: "Written with the no-holds-barred ethos of his beloved series, No Reservations and Parts Unknown, the celebrity chef and culinary explorer’s first cookbook in more than ten years—a collection of recipes for the home cook.",
    category: "Books",
    inStock: true
  }
];

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function createProductCard(product) {
  const stockStatus = product.inStock
    ? `<span class="stock-status in-stock">In Stock</span>`
    : `<span class="stock-status out-of-stock">Out of Stock</span>`;

  return `
    <div class="product-card">
      <h2>${product.name}</h2>
      <div class="price">${formatPrice(product.price)}</div>
      <p class="description">${product.description}</p>
      <span class="category">${product.category}</span>
      ${stockStatus}
    </div>
  `;
}

function renderProducts() {
  productGrid.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    const productHTML = createProductCard(products[i]);
    productGrid.innerHTML += productHTML;
  }
}


function addItemToList(event) {
  event.preventDefault();

  const name = document.querySelector("#productName").value.trim();
  const price = parseFloat(
    document.querySelector("#productPrice").value
  );
  const description = document
    .querySelector("#productDescription")
    .value.trim();
  const category = document.querySelector("#productCategory").value;
  const inStock = document.querySelector("#productInStock").checked;

  const newProduct = {
    name: name,
    price: price,
    description: description,
    category: category,
    inStock: inStock
  };

  products.push(newProduct);
  renderProducts();
  productForm.reset();
}

productForm.addEventListener("submit", addItemToList);

renderProducts();