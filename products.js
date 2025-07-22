
// Sample product rendering function
function renderProducts(products) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
  <div class="badge-container">
    ${product.badge ? `<span class="badge">${product.badge}</span>` : ""}
  </div>
  <img src="${product.image}" alt="${product.name}" />
  <h4>${product.name}</h4>
  <div class="desc">${product.subtitle}</div>
  <div class="price">
    <span class="new-price">Rp ${parseInt(product.price).toLocaleString("id-ID")}</span><br>
    ${product.oldprice ? `<s class="old-price">Rp ${parseInt(product.oldprice).toLocaleString("id-ID")}</s>` : ""}
  </div>
  <button class="add-to-cart" data-name="${product.name}">Add to Cart</button>
  <a class="quick-view" href="product-detail.html?product=${encodeURIComponent(product.name)}">Quick View</a>
`;

    container.appendChild(productCard);
  });

  attachHoverModal(); // Attach modal logic after rendering
  attachAddToCartListeners();
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

function attachAddToCartListeners() {
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      addToCart(name);
    });
  });
}

function addToCart(name) {
  console.log("Added to cart:", name);
  // Logic to add to local storage or update cart count
}

// Shared product list
const sampleProducts = [
  {
    name: "Syltherine",
    subtitle: "Comfort with style",
    price: 25000,
    image: "images/Rectangle 286 p.png",
    badge: "New",
      description: [
      "Sophisticated yet understated, the Syltherine 2-seater blends mid-century modern charm with high-density cushioning for superior comfort.",
      "Tailored silhouette with button-tufted back.",
      "Robust hardwood frame with webbing and spring support.",
      "Plush seating foam wrapped in poly-fill.",
      "Smooth linen-blend fabric that’s skin-friendly.",
      "Ideal for apartments, office receptions, and guest rooms."
    ],
    images: [
      "images/products/modern-sofa.jpg",
      "images/products/modern-sofa-2.jpg",
      "images/products/modern-sofa-3.jpg"
    ], additionalInfo: {
      material: "Premium Teak Wood",
      dimensions: "120 x 70 x 75 cm",
      warranty: "2 Years",
      shipping: "3-5 Business Days",
      swatches: ["#caa892", "#7a5230", "#e8d8c3"]
    }
  },
  {
    name: "Lolito",
    subtitle: "Comfort with style",
    price: 15000,
    image: "images/Rectangle 286 q.png",
    badge: "New",
    description: [
  "A bold statement piece designed for maximum impact in a compact form.",
  "Wide arms, vibrant upholstery, and boxy silhouette add personality.",
  "Great as an accent chair or lounge seat.",
  "Rounded armrests and vintage legs give it a retro flair.",
  "Solid hardwood core with supportive elastic belts.",
  "Durable twill in muted tones.",
  "Compact footprint, fits easily in any space."
],
    images: [
      "images/Rectangle 286 q_thumbnail_1920x1080.png",
      "images/products/modern-sofa-2.jpg",
      "images/products/modern-sofa-3.jpg"
    ],
    additionalInfo: {
      material: "Solid Sheesham Wood",
      dimensions: "85 x 75 x 80 cm",
      warranty: "1 Year",
      shipping: "2-4 Business Days",
      swatches: ["#b69f8b", "#5f4434", "#e4e2dd"]
    },


  },
  {
    name: "Pingky",
    subtitle: "Comfort with style",
    price: 50000,
    image: "images/Images i.png",
    badge: "New",
   description: [
  "Sleek and versatile 3-seater fits both modern and transitional spaces.",
  "Tufted back and wide seat depth for extended comfort.",
  "Boxy contemporary form with deep seating.",
  "Engineered wood and solid base frame construction.",
  "Suede-textured microfiber gives a premium look.",
  "Three-layered seat and back cushions for cloud-like comfort.",
  "Includes throw pillows with cover options.",
  "Ideal for families or binge-watchers."
],
    images: [
      "images/products/modern-sofa.jpg",
      "images/products/modern-sofa-2.jpg",
      "images/products/modern-sofa-3.jpg"
    ], additionalInfo: {
      material: "Engineered Wood Frame with Velvet Upholstery",
      dimensions: "200 x 90 x 80 cm",
      warranty: "3 Years",
      shipping: "5-7 Business Days",
      swatches: ["#ffdad8", "#f5bebe", "#f8f1ed"]
    },


  }, {
    name: "Patio",
    subtitle: "Comfort with style",
    price: 30000,
    image: "images/Images q.png",
    badge: "New",
   description: [
  "All-weather 2-seater perfect for breezy outdoor seating.",
  "Crafted with treated acacia wood and weather-resistant cushions.",
  "Designed for patios, balconies, and sunrooms.",
  "Powder-coated metal with faux wood arm inserts.",
  "Quick-dry foam wrapped in weather-resistant fabric.",
  "Fade-proof and mold-resistant materials.",
  "Adjustable tilt for lounging or upright support.",
  "Easy maintenance: hose down or wipe with damp cloth.",
  "Ready to use: just unbox and place."
],
    images: [
      "images/products/modern-sofa.jpg",
      "images/products/modern-sofa-2.jpg",
      "images/products/modern-sofa-3.jpg"
    ], additionalInfo: {
      Material: "Acacia wood, waterproof fabric cushions",


      swatches: ["#caa892", "#7a5230", "#e8d8c3"],
      BestFor: "Outdoor patios, balconies, garden setups"
    }
  },
  {
    name: "Grifo",
    subtitle: "Comfort with style",
    price: 20000,
    image: "images/Images j.png",
    badge: "New",
   description: [
  "Plush cushioning and supportive arms for all-day comfort.",
  "Smooth curved design fits modern interiors.",
  "Elegant and space-saving 2-seater option.",
  "Ideal for lounging in style without bulk."
],

    images: [
      "images/Images j_thumbnail_1280x720.png",
      "images/products/modern-sofa-2.jpg",
      "images/products/modern-sofa-3.jpg"
    ], additionalInfo: {
      material: "Recycled Pine Wood with Jute Upholstery",
      dimensions: "140 x 90 x 78 cm",
      warranty: "1 Year",
      shipping: "3-6 Business Days",
      swatches: ["#d6c3a5", "#8b6f47", "#f0eee8"]
    },


  },
  {
    name: "Leviosa",
    subtitle: "Comfort with style",
    price: 18000,
    image: "images/Rectangle 276 h.png",
    badge: "New",
    description: [
  "Floating comfort experience with adjustable reclining positions.",
  "Pop-up footrest and soft lumbar support included.",
  "Single-seater recliner with clean curves and floating effect.",
  "Ergonomic shaping to cradle your back and spine.",
  "Bent ply with a strong support base.",
  "Available in Smoky Gray and Linen White.",
  "Great for reading corners, café-style layouts.",
  "Easy to move, shift, and style.",
  "Memory foam seating for prolonged comfort.",
  "Uses sustainable materials and low-VOC adhesives."
],

    images: [
      "images/products/modern-sofa.jpg",
      "images/products/modern-sofa-2.jpg",
      "images/products/modern-sofa-3.jpg"
    ],
    additionalInfo: {
      material: "Leatherette",
      dimensions: "95 x 90 x 105 cm",
      warranty: "3 Years",
      shipping: "4-6 Business Days",
      swatches: ["#191970", "#333333"]
    }

  },
  {
    name: "Respira",
    subtitle: "Comfort with style",
    price: 25000,
    image: "images/Rectangle 281.png",
    badge: "New",
    description: [
  "Modern, minimal, and airy 2-seater design.",
  "Perfect for smaller spaces like apartments and reading corners.",
  "Crafted from solid kiln-dried teak wood for durability.",
  "Medium-firm cushioning for optimal posture support.",
  "Scandinavian-inspired with a minimalist and airy look.",
  "Premium woven fabric in neutral tones for breathable comfort."
],

    images: [
      "images/products/modern-sofa.jpg",
      "images/products/modern-sofa-2.jpg",
      "images/products/modern-sofa-3.jpg"
    ], additionalInfo: {
      material: "Rattan & Metal",
      dimensions: "120 x 75 x 80 cm",
      warranty: "1 Year",
      shipping: "3-5 Business Days",
      swatches: ["#708090", "#556b2f"]
    }
  },
  {
    name: "Muggo",
    subtitle: "Comfort with style",
    price: 50000,
    image: "images/Group 146.png",
    badge: "New",
    description: [
  "Ultra-plush back cushions and wide seating for total relaxation.",
  "Low-profile modern frame with soft-touch fabric.",
  "Blends rustic wood with modern clean lines.",
  "Handcrafted from solid Sheesham wood with warm walnut finish.",
  "Wide and deep seats designed for all-day lounging.",
  "Soft chenille upholstery resists wear and fading.",
  "Supports up to 300 kg total.",
  "Includes two bolsters for extra arm or back support."
],
    images: [
      "images/sofa1.png",
      "images/sofa2.png",
      "images/Group 146.png"
    ],


    additionalInfo: {
      material: "Fabric & Wood",
      dimensions: "210 x 85 x 85 cm",
      warranty: "2 Years",
      shipping: "4-7 Business Days",
      swatches: ["#a9a9a9", "#8b4513"],
      BestFor: "Family lounges, TV rooms, statement seating"
    }
  },
  {
    name: "Potty",
    subtitle: "Comfort with style",
    price: 15000,
    image: "images/image 2.png",
    badge: "New",
    description: [
  "Compact and charming one-seater for modern spaces.",
  "Playful silhouette with high backrest and ergonomic arm support.",
  "Perfect as an accent or reading chair.",
  "Solid mango wood base with natural wood grain finish.",
  "Dual-layer cushioning with a soft bounce.",
  "Slight recline and contoured back for posture support.",
  "Velvet-touch fabric in pastel shades."
],

    images: [
      "images/product3-thumb1.png",
      "images/product3-thumb2.png",
      "images/product3-thumb3.png"
    ],
    additionalInfo: {
      Material: "Textured polyester, Metal legs",
      ColorOptions: "Mustard Yellow, Charcoal Black",
      BestFor: "Bedroom seating, study nooks, office corners"
    }
  },
  {
    name: "Asgaardsofa",
    subtitle: "Comfort with style",
    price: 25000,
    image: "images/Asgaard sofa 4.png",
    badge: "New",
    description: [
  "Scandinavian design combining a 3-seater and 2-seater set.",
  "Minimalist aesthetics with generous proportions.",
  "Hand-finished teak wood arms and tapered legs.",
  "Deep-set seats with high-density foam and fiberfill.",
  "Mid-century modern design with clean lines and wood detailing.",
  "Ideal for living rooms, large lounges, and formal seating areas."
],

    images: [
      "images/product1-thumb1.png",
      "images/product1-thumb2.png",
      "images/product1-thumb3.png"
    ],
    additionalInfo: {
      Material: "Premium cotton blend fabric, Teak wood frame",
      ColorOptions: "Beige, Ocean Blue",
      BestFor: "Spacious living rooms, formal drawing areas"
    }
  },

  {
    name: "Oak Wood Chair",
    subtitle: "Elegant and durable",
    price: 50000,
    image: "images/image 3.png",
    badge: "20% OFF",
    description: [
  "Durable 3-seater bench-style sofa built from solid oak.",
  "Straight back and slatted sides for a rustic look.",
  "Padded seat and back cushions add extra comfort.",
  "Classic farmhouse design with natural grain finish.",
  "Thick cushions with removable, washable covers.",
  "Kiln-dried and treated wood resists warping.",
  "Holds up to 250 kg capacity.",
  "Great for porches, verandas, and family rooms.",
  "Available in Natural Oak and Dark Walnut.",
  "FSC-certified wood and non-toxic stains used."
],

    images: [
      "images/products/oak-chair.jpg",
      "images/products/oak-chair-2.jpg",
      "images/products/oak-chair-3.jpg"
    ], additionalInfo: {
      Material: "Linen fabric, Solid wood base",
      ColorOptions: "Slate Grey, Olive Green",
      BestFor: "Small living rooms, balconies, studio apartments"
    }
  },
  {
    name: "Teak Dining Table",
    subtitle: "Perfect for families",
    price: 15000,
    image: "images/Group 206 h.png",
    badge: "15% OFF",
    description: [
  "Rustic elegance with ample space for family meals.",
  "Premium-grade teak wood with a smooth matte oil finish.",
  "Generous proportions ideal for large groups.",
  "Minimalist rectangular shape with rounded corners.",
  "Beveled edges and smooth grain-finished tabletop.",
  "Wide-block legs provide stability and no wobble.",
  "Sealed surface resists spills and stains.",
  "Flat-packed with easy bolt-on legs.",
  "Optional matching dining set available."
],

    images: [
      "images/yellow thumbnail.png",
      "images/yellow thumbnail2.png",
      "images/yellow thumbnail3.png"
    ],
    additionalInfo: {
      material: "Teak Wood",
      dimensions: "180 x 90 x 75 cm",
      warranty: "1 Year",
      shipping: "3-5 Business Days",
      swatches: ["#d2b48c", "#a0522d", "#deb887"]
    }


  }
];

// Breadcrumb injection logic (optional UI update)
function injectBreadcrumb(pathArray) {
  const breadcrumbContainer = document.getElementById("breadcrumb");
  if (!breadcrumbContainer) return;
  breadcrumbContainer.innerHTML = pathArray.map((item, index) => {
    if (index === pathArray.length - 1) {
      return `<span>${item}</span>`;
    } else {
      return `<a href="#">${item}</a> › `;
    }
  }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts(sampleProducts);
  injectBreadcrumb(["Home", "Shop"]);
});
