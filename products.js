
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
    description: "Sophisticated yet understated, the Syltherine 2-seater blends mid-century modern charm with high-density cushioning for superior comfort. With clean lines and a supportive back, it's ideal for tight living spaces without compromising style.Tailored silhouette with button-tufted back.Robust hardwood frame with webbing and spring support.Plush seating foam wrapped in poly-fill.Smooth linen-blend fabric that’s skin-friendly. Sky Gray, Burgundy, Sand.Apartments, office receptions, and guest rooms.",
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
    description: "A bold statement piece, the Lolito 1-seater is designed for maximum impact in a compact form. Its wide arms, vibrant upholstery, and boxy silhouette add personality to any room. Great as an accent chair or lounge seat.Lounge-ReadyRounded armrests and vintage legs give it a retro flair.Solid hardwood core with supportive elastic belts.Durable twill in muted tones.Compact footprint, fits easily in any space.",
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
    description: "Sleek and versatile, the Pingky 3-seater fits seamlessly into both modern and transitional spaces. With its tufted back, wide seat depth, and durable upholstery, it’s built for long Netflix nights and friendly gatherings.Bold & Cozy Contemporary boxy form with deep seating.Frame Engineered wood and solid base frame construction.Suede-textured microfiber for a premium look.Three-layered seat and back cushions for cloud-like comfort.Add-ons: Includes throw pillows with cover options.Ideal for families or binge-watchers.",
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
    description: "The Patio 2-seater is your all-weather friend for breezy outdoor seating. Crafted with treated acacia wood and weather-resistant cushions, it’s perfect for balconies, patios, and garden corners. Lightweight yet sturdy, it combines function with flair.Designed for patios, balconies, and sunrooms.Powder-coated metal with faux wood arm inserts.Quick-dry foam wrapped in weather-resistant fabric.Fade-proof and mold-resistant materials.Adjustable tilt for lounging or upright support.Hose down or wipe with damp cloth.Just unbox and place.",
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
    description: "With its plush cushioning, supportive arms, and smooth curved design, the Grifo 2-seater is all about comfort without compromise. It’s an elegant choice for those who love lounging without taking up too much space.",
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
    description: "True to its name, Leviosa is a floating comfort experience. This 1-seater recliner features adjustable reclining positions, a pop-up footrest, and soft lumbar support—perfect for movie nights or post-work relaxation.Single-seater with clean curves and floating effect.Ergonomic shaping to cradle your back and spine.Bent ply with a strong support base.Smoky Gray, Linen White.Reading corners, café-style layouts.Easy to move, shift, and style.Memory foam seating for prolonged comfort.Uses sustainable materials and low-VOC adhesives.",
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
    description: "Modern, minimal, and airy—Respira is a compact 2-seater sofa designed to breathe elegance into smaller spaces. Crafted with solid wood legs and upholstered in breathable linen fabric, it offers medium-firm cushioning for optimal posture support. Ideal for apartments, reading corners, or cozy lounges. Scandinavian-inspired with a minimalist and airy look.Frame Material: Crafted from solid kiln-dried teak wood for durability and strength.Premium woven fabric in neutral tones, offering a soft and breathable texture.",
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
    description: "The Muggo sofa redefines relaxation with its ultra-plush back cushions and wide seating. With its low-profile modern frame and soft-touch fabric, this 3-seater adds warmth and sophistication to any contemporary living room. Built to last with a solid pine wood frame.Modern Rustic Charm: Blends rustic wood with modern clean lines.Handcrafted from solid Sheesham wood with a warm walnut finish.Wide and deep seats designed for all-day lounging.Soft chenille upholstery resists wear and fading.Supports up to 300 kg total.Includes two bolsters for extra arm or back support.",
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
    description: "Compact and charming, the Potty armchair is a one-seater marvel for modern spaces. With its playful silhouette, high backrest, and ergonomic arm support, it’s perfect for curling up with a book or accentuating a cozy corner. Ideal as an accent or reading chair.Solid mango wood base with natural wood grain finish.Dual-layer cushioning with a soft bounce.Slight recline and contoured back for posture support.Velvet-touch fabric in pastel shades.",
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
    description: "An epitome of Scandinavian design, the Asgaard sofa set combines a 3-seater and 2-seater with minimalist aesthetics and generous proportions. The hand-finished teak wood arms and tapered legs add a timeless touch, while the deep cushions ensure hours of comfort.Mid-century modern design with clean lines and wood detailing.Made from sustainably sourced teak wood with a hand-rubbed finish.Deep-set seats with high-density foam and fiberfill.Includes a spacious 3-seater and a matching 2-seater.Living rooms, large lounges, and formal seating areas.",
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
    description: "Built from durable oak wood, this 3-seater bench-style sofa embraces both function and beauty. Featuring a straight back and slatted sides, it's perfect for rustic or farmhouse-inspired interiors. Comes with padded seat and back cushions for added comfort.High-quality solid oak with natural grain finish.Classic slatted back and arms with a rustic farmhouse look.Thick cushions with removable, washable covers.Wood is kiln-dried and treated to resist warping.Holds up to 250 kg.Porches, verandas, and family rooms.Natural Oak, Dark Walnut.FSC-certified wood and non-toxic stains used.",
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
    description: "A true dining essential, this Teak Wood Dining Table combines rustic elegance with ample space. Its natural grains and smooth matte finish give it an earthy charm, while the robust legs ensure stability for family meals, dinner parties, and everyday use.Made from premium-grade teak wood with an oil finish.Generous proportions ideal for families or guests.Minimalist rectangular silhouette with rounded corners.Smooth grain-finished table top with beveled edges.Sturdy, wide-block legs ensure no wobble.Sealed surface resists spills and stains.Optional purchase to complete the set.Flat-packed with easy bolt-on legs.",
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
