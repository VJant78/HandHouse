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


async function fetchSearchProduct() {
  try {
    const response = await fetch("data/products_list.json"); // lấy dữ liệu tất cả sản phẩm lên
    if (!response.ok) throw new Error("Network response was not ok");
    products_list = await response.json();
    setupSearch(products_list); // truyền list sản phẩm này vào function xử lí tìm kiếm
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu sản phẩm bán chạy:", error);
  }
}

function setupSearch(products) { //funtion xử lí logic tìm kiếm 
  const searchInput = document.getElementsByClassName("searchInput")[0]; // lấy dữ liệu nhập vào ô tìm kiếm
  const searchBox = document.querySelector(".search-box");
  const searchResults = document.getElementById("searchResults");
  searchInput.addEventListener("input", function () { //khởi tạo sự kiện khi nhập vào thì thực hiện các câu lệnh dưới
    const query = searchInput.value.trim().toLowerCase(); // chuyển dữ liệu đầu vào thành chữ thường (không in hoa)
    searchResults.innerHTML = "";
    if (query.length === 0) {
      searchResults.style.display = "none";
      return;
    } // hàm if này không thực hiện j nếu không có dữ liệu nhập vào
    const matches = products.filter((p) => //duyệt từng phần tử trong "products" --> products ở đây là tất cả các sản phẩm
      p.name.toLowerCase().includes(query) // tìm kết quả 
    );
    if (matches.length > 0) {
      searchResults.appendChild(createSearchResultTable(matches)); // nếu có kết quả thì sẽ đưa vào function tạo format trước đó 
      searchResults.style.display = "block";
    } else {
      searchResults.innerHTML =
        '<div class="search-result-item">Không tìm thấy sản phẩm</div>'; // nếu không có kết quả thì sẽ hiển thị "Không tìm thấy sản phẩm"
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
  // fetchBestSellerProducts();
  fetchSearchProduct(); // dưa vào hàm này để thực hiện load html hoàn thành, sau đó mới thực hiện js. 
});
