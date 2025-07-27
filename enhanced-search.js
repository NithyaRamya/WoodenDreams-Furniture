document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.getElementById("search-icon");
  const enhancedSearch = document.querySelector(".enhanced-search");

  if (searchIcon && enhancedSearch) {
    searchIcon.addEventListener("click", () => {
      enhancedSearch.classList.toggle("hidden");
    });
  }

  const categorySelect = document.getElementById("category-select");
  const sofaOptions = document.getElementById("sofa-options");
  const sofaSeaters = document.getElementById("sofa-seaters");
  const searchBtn = document.getElementById("search-btn");

  categorySelect.addEventListener("change", () => {
    if (categorySelect.value === "sofa") {
      sofaOptions.classList.remove("hidden");
    } else {
      sofaOptions.classList.add("hidden");
    }
  });

  searchBtn.addEventListener("click", () => {
    const category = categorySelect.value;
    const seater = sofaSeaters.value;
    const query = document.getElementById("search-query").value.trim().toLowerCase();

    let url = "shop.html";

    if (category === "sofa" && seater) {
      url += `?category=sofa&seater=${seater}`;
    } else if (category) {
      url += `?category=${category}`;
    } else if (query) {
      url += `?search=${encodeURIComponent(query)}`;
    }

    window.location.href = url;
  });
});