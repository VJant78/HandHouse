async function fetchBestSellerProducts() {
  try {
    const response = await fetch("data/products_best_seller.json");
    if (!response.ok) throw new Error("Network response was not ok");
    products_best_seller = await response.json();
    renderBestSellerProducts(products_best_seller);
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu sản phẩm bán chạy:", error);
  }
}
async function fetchSearchProduct() {
  try {
    const response = await fetch("data/products_list.json");
    if (!response.ok) throw new Error("Network response was not ok");
    products_list = await response.json();
    setupSearch(products_list);
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu sản phẩm bán chạy:", error);
  }
}
async function fetchCart() {
  try {
    const response = await fetch("data/products_cart.json");
    if (!response.ok) throw new Error("Network response was not ok");
    products_cart = await response.json();
    renderCartProducts(products_cart);
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu sản phẩm bán chạy:", error);
  }
}

function setupSearch(products) {
  const searchInput = document.getElementsByClassName("searchInput")[0];
  const searchBox = document.querySelector(".search-box");
  const searchResults = document.getElementById("searchResults");
  searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim().toLowerCase();
    searchResults.innerHTML = "";
    if (query.length === 0) {
      searchResults.style.display = "none";
      return;
    }
    const matches = products.filter((p) =>
      p.name.toLowerCase().includes(query)
    );
    if (matches.length > 0) {
      searchResults.appendChild(createSearchResultTable(matches));
      searchResults.style.display = "block";
    } else {
      searchResults.innerHTML =
        '<div class="search-result-item">Không tìm thấy sản phẩm</div>';
      searchResults.style.display = "block";
    }
  });
  // Đóng danh sách khi click ra ngoài
  document.addEventListener("click", function (e) {
    if (!searchBox.contains(e.target)) {
      searchResults.style.display = "none";
    }
  });
}

function createSearchResultItem(product) {
  const div = document.createElement("div");
  div.className = "search-result-item";
  div.innerHTML = `<strong>${product.name}</strong><br><span class="old-price">${product.oldPrice}</span> ➜ ${product.price}`;
  return div;
}

function createSearchResultTable(products) {
  const table = document.createElement("table");
  table.className = "search-result-table";
  const thead = document.createElement("thead");
  //   thead.innerHTML = `<tr><th>Tên sản phẩm</th><th>Giá cũ</th><th>Giá mới</th></tr>`;
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${product.name}</td><td class='old-price'>${product.oldPrice}</td><td>${product.price}</td>`;
    row.style.cursor = "pointer";
    row.addEventListener("click", function () {
      window.location.href = `sanpham.html/${product.id}`;
    });
    tbody.appendChild(row);
  });
  table.appendChild(tbody);
  return table;
}

function renderBestSellerProducts(products_best_seller) {
  const productList = document.getElementById("productList");
  if (!productList) return;
  productList.innerHTML = products_best_seller
    .slice(0, 5)
    .map(
      (product) => `
    <div class="product">
        <div onclick="window.location.href='sanpham.html/${product.id}'">
            <img src="${product.img || "https://placehold.co/500x800"}" alt="${
        product.name
      }" />
            <div class="product-name">${product.name}</div>
            <div class="price">
                <span class="old-price">${product.oldPrice}</span>➜${
        product.price
      }
            </div>
        </div>
        <button class="order-btn">Đặt hàng</button>
    </div>
  `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", function () {
  fetchBestSellerProducts();
  fetchSearchProduct();
});
