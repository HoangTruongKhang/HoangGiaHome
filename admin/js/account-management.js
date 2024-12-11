const API_BASE_URL = "https://e609-117-5-34-35.ngrok-free.app/api/v1";

// Hiển thị thông báo
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = `notification show ${type}`;
  setTimeout(() => {
    notification.className = "notification hidden";
  }, 3000);
}

// Lấy tên trang hiện tại từ URL
const currentPage = window.location.pathname.split("/").pop();

// Lấy tất cả các liên kết trong menu
const menuLinks = document.querySelectorAll(".admin-dashboard nav ul li a");
menuLinks.forEach((link) => {
  if (link.href.includes(currentPage)) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

// Mở modal thêm tài khoản
document.querySelector(".add-account-button").addEventListener("click", () => {
  document.getElementById("addAccountModal").style.display = "flex";
});

// Đóng modal và xóa dữ liệu form
function closeModal() {
  document.getElementById("addAccountModal").style.display = "none";
  clearForm();
}

function closeUpdateModal() {
  document.getElementById("updateAccountModal").style.display = "none";
  clearForm();
}
function clearForm() {
  const form = document.getElementById("addAccountForm");
  form.reset();
}

// Hàm kiểm tra dữ liệu hợp lệ
function validateForm(data) {
  if (!data.username || data.username.trim() === "") return false;
  if (!data["last-name"] || !data["first-name"]) return false;
  if (!data["phone-number"] || !/^\d{10}$/.test(data["phone-number"]))
    return false;
  if (!data.branch || data.branch === "") return false;
  return true;
}

<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {
    const editButtons = document.querySelectorAll(".edit-button");
    const updateModal = document.getElementById("updateAccountModal");
    const closeModalButtons = document.querySelectorAll(".close, .close-button");

    // Lấy các trường trong modal để điền dữ liệu
    const accountIdField = document.getElementById("account_id");
    const usernameField = document.getElementById("username");
    const lastNameField = document.getElementById("last-name");
    const firstNameField = document.getElementById("first-name");
    const fullNameField = document.getElementById("full-name");
    const phoneNumberField = document.getElementById("phone-number");
    const roleField = document.getElementById("update-role");
    const branchField = document.getElementById("update-branch");

    // Hiển thị modal cập nhật với thông tin của tài khoản được chọn
    editButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const row = event.target.closest("tr"); // Lấy dòng (row) chứa tài khoản
            const cells = row.querySelectorAll("td"); // Lấy tất cả các ô (cell) trong dòng

            // Điền thông tin vào modal
            accountIdField.value = cells[0].textContent.trim(); // Mã tài khoản
            usernameField.value = cells[2].textContent.trim(); // Tên đăng nhập
            lastNameField.value = cells[3].textContent.trim().split(" ")[0]; // Họ
            firstNameField.value = cells[3].textContent.trim().split(" ")[1]; // Tên
            fullNameField.value = cells[3].textContent.trim(); // Họ và tên
            phoneNumberField.value = cells[4].textContent.trim(); // Số điện thoại
            roleField.value = cells[5].textContent.trim() === "Quản trị viên" ? "ADMIN" : "USER"; // Vai trò
            branchField.value = cells[1].textContent.trim() === "TP.Hà Nội" ? "tp_hanoi" :
                cells[1].textContent.trim() === "TP.Hồ Chí Minh" ? "tp_hcm" : "tp_danang"; // Chi nhánh

            // Hiển thị modal
            updateModal.style.display = "flex";
        });
    });

    // Đóng modal khi nhấn "Thoát" hoặc "X"
    closeModalButtons.forEach((button) => {
        button.addEventListener("click", () => {
            updateModal.style.display = "none";
        });
    });



    // Xử lý gửi dữ liệu cập nhật (Submit)
    const updateForm = document.getElementById("updateAccountForm");
    updateForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Ngăn form gửi đi
        alert("Thông tin tài khoản đã được cập nhật thành công!");
        updateModal.style.display = "none"; // Đóng modal sau khi cập nhật
=======
// Cập nhật bảng tài khoản
function updateAccountTable(accounts) {
  const tableBody = document.querySelector(".account-table tbody");
  tableBody.innerHTML = "";

  if (accounts.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center;">Không tìm thấy tài khoản nào!</td></tr>`;
    return;
  }

  accounts.forEach((account) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${account.account_id}</td>
      <td>${account.username}</td>
      <td>${account.last_name}</td>
      <td>${account.first_name}</td>
      <td>${account.full_name}</td>
      <td>${account.role}</td>
      <td>${new Date(account.create_at).toLocaleDateString()}</td>
      <td>
        <button class="edit-button" data-id="${account.account_id}">Sửa</button>
        <button class="delete-button" data-id="${
          account.account_id
        }">Xóa</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  attachRowActions();
}

// Fetch data từ API
async function fetchData(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
  const data = await response.json();
  return data;
}

// Fetch account data (với tham số tìm kiếm)
async function fetchAccountData(search = "") {
  const url = search
    ? `${API_BASE_URL}/accounts?search=${encodeURIComponent(search)}`
    : `${API_BASE_URL}/accounts`;
  const data = await fetchData(url);
  updateAccountTable(data?.content || []);
}

// Tìm kiếm tài khoản
async function searchFunction() {
  const searchValue = document.getElementById("search-id").value.trim();
  fetchAccountData(searchValue);
}

// Gắn sự kiện cho sửa và xóa tài khoản
function attachRowActions() {
  const editButtons = document.querySelectorAll(".edit-button");
  const deleteButtons = document.querySelectorAll(".delete-button");

  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const accountId = button.dataset.id;
      showUpdateModal(accountId);
>>>>>>> e22bbeeaa86597161b8b2e1ae7d4a8b700fa194c
    });
  });

<<<<<<< HEAD
=======
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const accountId = button.dataset.id;
      if (confirm(`Bạn có chắc muốn xóa tài khoản: ${accountId}?`)) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/accounts/${accountId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "ngrok-skip-browser-warning": "true",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          showNotification("Xóa tài khoản thành công!", "success");
          fetchAccountData();
        } catch (error) {
          console.error("Lỗi khi xóa tài khoản:", error);
          showNotification("Đã xảy ra lỗi khi xóa tài khoản!", "error");
        }
      }
    });
  });
}

// Hàm thêm tài khoản mới
async function addNewAccount(event) {
  event.preventDefault();
  console.log(event);

  const username = document.getElementById("user-name").value;
  const password = document.getElementById("pass-word").value;
  const lastName = document.getElementById("last-name").value;
  const firstName = document.getElementById("first-name").value;
  const fullName = document.getElementById("full-name").value;
  const phoneNumber = document.getElementById("phone-number").value;
  const branch = document.getElementById("branch").value;
  const newAccountData = {
    username,
    password,
    last_name: lastName,
    first_name: firstName,
    full_name: fullName,
    phone_number: phoneNumber,
    branchBranch_id: branch,
  };

  if (!username || !lastName || !firstName) {
    showNotification("Vui lòng nhập đầy đủ thông tin!", "error");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newAccountData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    showNotification("Thêm tài khoản thành công!", "success");
    closeModal();
    fetchAccountData();
  } catch (error) {
    console.error("Lỗi khi thêm tài khoản mới:", error);
    showNotification("Đã xảy ra lỗi khi thêm tài khoản mới!", "error");
  }
}

// Gắn sự kiện khi form thêm tài khoản được submit
document
  .getElementById("addAccountForm")
  .addEventListener("submit", addNewAccount);

// Gắn sự kiện tìm kiếm tài khoản
document.getElementById("search-id").addEventListener("input", searchFunction);

// Khởi động khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
  fetchAccountData();
});

//Update account
document
  .getElementById("updateAccountForm")
  .addEventListener("submit", updateAccount);

async function getAccountById(accountId) {
  try {
    const response = await fetch(`${API_BASE_URL}/accounts/${accountId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json(); // Trả về dữ liệu tài khoản
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu tài khoản:", error);
  }
}
async function showUpdateModal(accountId) {
  const modal = document.getElementById("updateAccountModal");
  const data = await getAccountById(accountId);
  console.log(data);
  getAccountById(accountId).then((account) => {
    if (account) {
      document.getElementById("update-account_id").value = account.account_id;
      document.getElementById("update-username").value = account.username;
      document.getElementById("update-last-name").value = account.last_name;
      document.getElementById("update-first-name").value = account.first_name;
      document.getElementById("update-full-name").value = account.full_name;
      document.getElementById("update-phone-number").value =
        account.phone_number;
      document.getElementById("update-branch").value = account.branch;
      document.getElementById("update-role").value = account.role;

      modal.style.display = "flex";
    } else {
      console.error("Không tìm thấy tài khoản.");
    }
  });
}

async function updateAccount(event) {
  event.preventDefault();
  const accountId = document.getElementById("update-account_id").value;
  const username = document.getElementById("update-username").value;
  const lastName = document.getElementById("update-last-name").value;
  const firstName = document.getElementById("update-first-name").value;
  const fullName = document.getElementById("update-full-name").value;
  const phoneNumber = document.getElementById("update-phone-number").value;
  const branch = document.getElementById("update-branch").value;
  const role = document.getElementById("update-role").value;

  // Kiểm tra dữ liệu hợp lệ
  if (!username || !lastName || !firstName || !role) {
    showNotification("Vui lòng nhập đầy đủ thông tin!", "error");
    return;
  }

  const updatedAccountData = {
    username,
    last_name: lastName,
    first_name: firstName,
    full_name: fullName,
    phone_number: phoneNumber,
    branch,
    role,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/accounts/${accountId}`, {
      method: "PUT", // Dùng PUT để cập nhật dữ liệu
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updatedAccountData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    showNotification("Cập nhật tài khoản thành công!", "success");
    closeUpdateModal();
    fetchAccountData(); // Lấy lại danh sách tài khoản để hiển thị
  } catch (error) {
    console.error("Lỗi khi cập nhật tài khoản:", error);
    showNotification("Đã xảy ra lỗi khi cập nhật tài khoản!", "error");
  }
}
>>>>>>> e22bbeeaa86597161b8b2e1ae7d4a8b700fa194c
