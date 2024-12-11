// Lấy tên trang hiện tại từ URL
const currentPage = window.location.pathname.split('/').pop();

// Lấy tất cả các liên kết trong menu
const menuLinks = document.querySelectorAll('.admin-dashboard nav ul li a');

// Kiểm tra và áp dụng màu nền cho mục "Dashboard" khi trang là dashboard.html
menuLinks.forEach(link => {
    if (link.href.includes(currentPage)) {
        link.classList.add('active'); // Thêm lớp "active" cho mục hiện tại
    } else {
        link.classList.remove('active'); // Loại bỏ lớp "active" cho các mục còn lại
    }
});

// Hiển thị form modal
document.querySelector('.add-account-button').addEventListener('click', () => {
    document.getElementById('addAccountModal').style.display = 'flex';
});

// Đóng form modal
function closeModal() {
    document.getElementById('addAccountModal').style.display = 'none';
    clearForm(); // Xóa dữ liệu trong form khi đóng
}

// Xóa dữ liệu trong form
function clearForm() {
    const form = document.getElementById('addAccountForm');
    form.reset(); // Reset lại các giá trị trong form
}

// Xử lý form submit
document.getElementById('addAccountForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Lấy dữ liệu từ form
    const formData = new FormData(e.target);
    const accountData = Object.fromEntries(formData);

    // Kiểm tra dữ liệu hợp lệ (nếu cần)
    if (!validateForm(accountData)) {
        alert('Vui lòng kiểm tra lại dữ liệu!');
        return;
    }

    // Xử lý thêm tài khoản
    console.log('Dữ liệu gửi đi:', accountData);

    // Gửi dữ liệu hoặc xử lý logic lưu
    // Ví dụ: gửi yêu cầu API
    // fetch('/api/add-account', {
    //     method: 'POST',
    //     body: JSON.stringify(accountData),
    //     headers: { 'Content-Type': 'application/json' }
    // }).then(response => response.json())
    //   .then(data => console.log('Thêm thành công:', data))
    //   .catch(error => console.error('Lỗi:', error));

    alert('Thêm tài khoản thành công!');
    closeModal();
});

// Hàm kiểm tra dữ liệu hợp lệ
function validateForm(data) {
    // Kiểm tra tên đăng nhập
    if (!data.username || data.username.trim() === '') return false;

    // Kiểm tra họ và tên
    if (!data['last-name'] || !data['first-name']) return false;

    // Kiểm tra số điện thoại
    if (!data['phone-number'] || !/^\d{10}$/.test(data['phone-number'])) return false;

    // Kiểm tra chi nhánh
    if (!data.branch || data.branch === '') return false;

    return true;
}

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
    });
});

