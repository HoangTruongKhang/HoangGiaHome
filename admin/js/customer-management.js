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
document.querySelector('.add-customer-button').addEventListener('click', () => {
    document.getElementById('addCustomerModal').style.display = 'flex';
});

// Đóng form modal
function closeModal() {
    document.getElementById('addCustomerModal').style.display = 'none';
}

// Xử lý form submit
document.getElementById('addCustomerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log('Dữ liệu gửi đi:', data);
    closeModal();
});

// Mở modal Cập nhật tài khoản khi click vào nút "Sửa"
document.addEventListener("DOMContentLoaded", () => {
    const editButtons = document.querySelectorAll(".edit-button");
    const updateModal = document.getElementById("updateCustomerModal");
    const closeModalButtons = document.querySelectorAll(".close, .close-button");

    // Lấy các trường trong modal để điền dữ liệu
    const customerIdField = document.getElementById("update-customer_id");
    const fullNameField = document.getElementById("full-name");
    const cmtCccdField = document.getElementById("cmt-cccd");
    const phoneNumberField = document.getElementById("phone-number");
    const emailField = document.getElementById("email");
    const birthDateField = document.getElementById("birth_date");
    const addressField = document.getElementById("address");
    const branchField = document.getElementById("branch");
    const roomField = document.getElementById("room");
    const createDateField = document.getElementById("create_date");

    // Hiển thị modal cập nhật với thông tin của khách hàng được chọn
    editButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const row = event.target.closest("tr"); // Lấy dòng (row) chứa khách hàng
            const cells = row.querySelectorAll("td"); // Lấy tất cả các ô (cell) trong dòng

            // Điền thông tin vào modal
            customerIdField.value = cells[0].textContent.trim(); // Mã khách hàng
            fullNameField.value = cells[1].textContent.trim(); // Tên khách hàng
            cmtCccdField.value = "123456789"; // Giả định dữ liệu mẫu
            phoneNumberField.value = cells[3].textContent.trim(); // Số điện thoại
            emailField.value = "example@gmail.com"; // Giả định dữ liệu mẫu
            birthDateField.value = "01/01/1990"; // Giả định dữ liệu mẫu
            addressField.value = "Hà Nội"; // Giả định dữ liệu mẫu
            branchField.value = "tp_hanoi"; // Giả định dữ liệu mẫu
            roomField.value = "Phòng 101"; // Giả định dữ liệu mẫu
            createDateField.value = cells[5].textContent.trim(); // Ngày tạo

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

    // Đóng modal khi nhấn ra ngoài vùng modal
    window.addEventListener("click", (event) => {
        if (event.target === updateModal) {
            updateModal.style.display = "none";
        }
    });

    // Xử lý gửi dữ liệu cập nhật (Submit)
    const updateForm = document.getElementById("updateCustomerForm");
    updateForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Ngăn form gửi đi
        alert("Thông tin khách hàng đã được cập nhật thành công!");
        updateModal.style.display = "none"; // Đóng modal sau khi cập nhật
    });
});
