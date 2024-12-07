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
    document.getElementById('addAccountModal').style.display = 'flex';
});

// Đóng form modal
function closeModal() {
    document.getElementById('addAccountModal').style.display = 'none';
}

// Xử lý form submit
document.getElementById('addAccountForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log('Dữ liệu gửi đi:', data);
    closeModal();
});