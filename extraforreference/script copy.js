const product = JSON.parse(localStorage.getItem("selectedProduct"));

if (!product) {
  alert("No product found in localStorage.");
}

// Populate main product details
document.getElementById("product-name").textContent = product.name;
document.getElementById("product-price").textContent = product.price;
document.getElementById("review-count").textContent = `${product.reviews.length} Customer Review`;
document.getElementById("review-tab-count").textContent = product.reviews.length;
document.getElementById("product-description").textContent = product.description;
document.getElementById("breadcrumb-name").textContent = product.name;
document.getElementById("sku").textContent = product.sku || "SS001";
document.getElementById("category").textContent = product.category || "Chairs";
document.getElementById("tags").textContent = product.tags?.join(", ") || "furniture";

// Image + Thumbnails
const mainImage = document.getElementById("main-image");
mainImage.src = product.images[0];

const thumbnailList = document.getElementById("thumbnails");
product.images.forEach((img, i) => {
  const thumb = document.createElement("img");
  thumb.src = img;
  if (i === 0) thumb.classList.add("active");
  thumb.onclick = () => {
    mainImage.src = img;
    document.querySelectorAll("#thumbnails img").forEach(t => t.classList.remove("active"));
    thumb.classList.add("active");
  };
  thumbnailList.appendChild(thumb);
});

// Size
const sizeContainer = document.getElementById("size-options");
product.sizes.forEach(size => {
  const btn = document.createElement("button");
  btn.textContent = size;
  btn.onclick = () => {
    document.querySelectorAll("#size-options button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  };
  sizeContainer.appendChild(btn);
});

// Color
const colorContainer = document.getElementById("color-options");
product.colors.forEach(color => {
  const swatch = document.createElement("span");
  swatch.className = "color-swatch";
  swatch.style.background = color;
  swatch.onclick = () => {
    document.querySelectorAll(".color-swatch").forEach(s => s.classList.remove("active"));
    swatch.classList.add("active");
  };
  colorContainer.appendChild(swatch);
});

// Quantity
let quantity = 1;
function changeQuantity(val) {
  quantity = Math.max(1, quantity + val);
  document.getElementById("quantity").textContent = quantity;
}

// Tabs
function showTab(tabId) {
  document.querySelectorAll(".tab-panel").forEach(t => t.style.display = "none");
  document.getElementById(tabId).style.display = "block";

  document.querySelectorAll(".tabs button").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.tabs button[onclick*="${tabId}"]`).classList.add("active");
}
showTab('description');

// Add to Cart (just log for now)
function addToCart() {
  alert(`Added ${quantity} of ${product.name} to cart`);
}

// Related Products (simplified)
const related = document.getElementById("related-products");
(product.related || []).forEach(r => {
  const div = document.createElement("div");
  div.innerHTML = `
    <img src="${r.image}" width="100%" style="border-radius:6px;" />
    <h4>${r.name}</h4>
    <p>${r.price}</p>
  `;
  related.appendChild(div);
});



const products = [
  { name: "Syltherine", price: 25000, material: "wood", country: "india", seating: "2", isNew: false },
  { name: "Leviosa", price: 15000, material: "metal", country: "japan", seating: "1", isNew: true },
  { name: "Lolito", price: 50000, material: "leather", country: "italy", seating: "3", isNew: false },
  { name: "Respira", price: 18000, material: "fabric", country: "china", seating: "1", isNew: true },
  { name: "Grifo", price: 30000, material: "wood", country: "japan", seating: "2", isNew: false },
  { name: "Muggo", price: 20000, material: "metal", country: "china", seating: "2", isNew: true },
  { name: "Pingky", price: 70000, material: "leather", country: "italy", seating: "4+", isNew: false },
  { name: "Potty", price: 10000, material: "fabric", country: "india", seating: "1", isNew: true }
];

let filteredProducts = [...products];
let itemsToShow = 16;
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const resultCount = document.querySelector('.result-count');
const showInput = document.querySelector('.show-control input');
const sortSelect = document.querySelector('.sort-control select');
const productsContainer = document.querySelector('.products');
const cartCount = document.querySelector('.cart-count');

function updateResultCount() {
  resultCount.textContent = `Showing 1–${Math.min(itemsToShow, filteredProducts.length)} of ${filteredProducts.length} results`;
}

function updateCartBadge() {
  if (cartCount) cartCount.textContent = cart.length;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

function renderProducts() {
  if (!productsContainer) return;
  productsContainer.innerHTML = "";
  filteredProducts.slice(0, itemsToShow).forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
      <p>Material: ${product.material}</p>
      <p>Country: ${product.country}</p>
      <p>Seating: ${product.seating}</p>
      <button class="add-to-cart" data-name="${product.name}">Add to Cart</button>
    `;
    productsContainer.appendChild(card);
  });

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => addToCart(btn.dataset.name));
  });

  updateResultCount();
  localStorage.setItem("filteredProducts", JSON.stringify(filteredProducts));
}

if (showInput) {
  showInput.addEventListener("input", () => {
    itemsToShow = parseInt(showInput.value) || 1;
    renderProducts();
  });
}

if (sortSelect) {
  sortSelect.addEventListener("change", () => {
    const val = sortSelect.value;
    if (val === "price-low-high") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (val === "price-high-low") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (val === "newest") {
      filteredProducts.sort((a, b) => b.isNew - a.isNew);
    } else {
      filteredProducts = [...products];
    }
    renderProducts();
  });
}

function applyFilters() {
  const materials = Array.from(document.querySelectorAll("input[name='material']:checked"), el => el.value);
  const countries = Array.from(document.querySelectorAll("input[name='country']:checked"), el => el.value);
  const seatings = Array.from(document.querySelectorAll("input[name='seating']:checked"), el => el.value);
  const prices = Array.from(document.querySelectorAll("input[name='price']:checked"), el => el.value);

  filteredProducts = products.filter(p => {
    const matchMaterial = materials.length === 0 || materials.includes(p.material);
    const matchCountry = countries.length === 0 || countries.includes(p.country);
    const matchSeating = seatings.length === 0 || seatings.includes(p.seating);
    const matchPrice = prices.length === 0 || prices.some(range => {
      const [min, max] = range.split('-').map(Number);
      return p.price >= min && (isNaN(max) || p.price <= max);
    });

    return matchMaterial && matchCountry && matchSeating && matchPrice;
  });

  renderProducts();
}

function addToCart(productName) {
  const product = products.find(p => p.name === productName);
  if (product) {
    cart.push(product);
    saveCart();
  }
}

document.querySelectorAll("input[name='material'], input[name='country'], input[name='seating'], input[name='price']").forEach(input => {
  input.addEventListener("change", applyFilters);
});

// Initial render
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartBadge();
});


function renderProducts(products) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <div class="desc">${product.subtitle}</div>
      <div class="price">₹${product.price}</div>
      <button class="add-to-cart" data-name="${product.name}">Add to Cart</button>
    `;
    container.appendChild(productCard);
  });

  attachHoverModal(); // Attach modal logic after rendering
}

// Hover modal logic
function attachHoverModal() {
  const modal = document.getElementById("hover-modal");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalSubtitle = document.getElementById("modal-subtitle");
  const modalPrice = document.getElementById("modal-price");
  const btnAddToCart = document.getElementById("modal-add-to-cart");

  let hideTimeout;

  document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
      clearTimeout(hideTimeout);

      const img = card.querySelector("img")?.src;
      const title = card.querySelector("h4")?.textContent || "";
      const subtitle = card.querySelector(".desc")?.textContent || "";
      const priceHTML = card.querySelector(".price")?.innerHTML || "";

      modalImage.src = img;
      modalTitle.textContent = title;
      modalSubtitle.textContent = subtitle;
      modalPrice.innerHTML = priceHTML;

      btnAddToCart.onclick = () => {
        addToCart(title);
      };

      const rect = card.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      modal.style.top = `${rect.bottom + scrollTop + 10}px`;
      modal.style.left = `${rect.left + scrollLeft}px`;
      modal.style.display = "block";
    });

    card.addEventListener("mouseleave", () => {
      hideTimeout = setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    });
  });

  modal.addEventListener("mouseenter", () => clearTimeout(hideTimeout));
  modal.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  });
}


  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = parseInt(button.dataset.price);

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItem = cart.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          name: name,
          price: price,
          quantity: 1
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${name} added to cart!`);
    });
  });
let compareList = [];

function addToCompare(productId) {
  if (!compareList.includes(productId)) {
    compareList.push(productId);
    showCompareModal();
  } else {
    alert("Already added to comparison.");
  }
}

function showCompareModal() {
  const modal = document.getElementById('compareModal');
  modal.classList.remove('hidden');
  renderCompareTable();
}

function closeCompareModal() {
  document.getElementById('compareModal').classList.add('hidden');
}

function renderCompareTable() {
  const headerRow = document.getElementById('compare-header-row');
  const bodyRows = document.getElementById('compare-body-rows');
  headerRow.innerHTML = `<th>Feature</th>`;
  bodyRows.innerHTML = "";

  const fields = ['name', 'price', 'material', 'seating', 'country', 'rating'];
  const productsToCompare = products.filter(p => compareList.includes(p.id));

  fields.forEach(field => {
    const row = document.createElement('tr');
    row.innerHTML = `<td><strong>${capitalize(field)}</strong></td>`;

    const values = [];

    productsToCompare.forEach(product => {
      let value = product[field];
      values.push(value);
    });

    productsToCompare.forEach(product => {
      const value = product[field];
      const td = document.createElement('td');
      td.textContent = value;

      // Highlight differences
      if (new Set(values).size !== 1) {
        td.classList.add('highlight-diff');
      }

      row.appendChild(td);
    });

    bodyRows.appendChild(row);
  });

  // Add remove button row
  const removeRow = document.createElement('tr');
  removeRow.innerHTML = `<td><strong>Action</strong></td>`;
  productsToCompare.forEach(product => {
    const td = document.createElement('td');
    td.innerHTML = `<button onclick="removeFromCompare('${product.id}')">Remove</button>`;
    removeRow.appendChild(td);
  });
  bodyRows.appendChild(removeRow);

  // Header row with product names
  headerRow.innerHTML += productsToCompare.map(p => `<th>${p.name}</th>`).join('');
}

function removeFromCompare(productId) {
  compareList = compareList.filter(id => id !== productId);
  if (compareList.length === 0) {
    closeCompareModal();
  } else {
    renderCompareTable();
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountElement = document.querySelectorAll(".cart-count");

  cartCountElement.forEach(el => {
    el.textContent = cartItems.length;
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.getElementById("cart-icon");

  if (cartIcon) {
    cartIcon.addEventListener("click", function (e) {
      e.preventDefault();

      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      if (isLoggedIn) {
        window.location.href = "shop.html";
      } else {
        const loginForm = document.getElementById("login-form");
        if (loginForm) {
          loginForm.scrollIntoView({ behavior: "smooth" });
        } else {
          // fallback: go to index.html if login-form not found
          window.location.href = "index.html";
        }
      }
    });
  }
});
