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

// Mở modal Cập nhật tài khoản khi click vào nút "Sửa"
document.querySelectorAll('.edit-button').forEach(button => {
    button.addEventListener('click', function () {
        // Lấy thông tin từ dòng tương ứng trong bảng
        const row = this.closest('tr');
        const accountId = row.cells[0].textContent; // Lấy mã tài khoản
        const username = row.cells[1].textContent; // Lấy tên đăng nhập
        const lastName = row.cells[2].textContent; // Lấy họ
        const firstName = row.cells[3].textContent; // Lấy tên
        const fullName = row.cells[4].textContent; // Lấy họ và tên
        const role = row.cells[5].textContent; // Lấy vai trò
        const creationDate = row.cells[6].textContent; // Lấy ngày tạo (nếu cần)
        const branch = row.cells[7].textContent; // Lấy chi nhánh (giả sử có trong bảng)

        // Điền dữ liệu vào form modal
        document.getElementById('update-username').value = username;
        document.getElementById('update-last-name').value = lastName;
        document.getElementById('update-first-name').value = firstName;
        document.getElementById('update-phone-number').value = ''; // Có thể lấy từ cơ sở dữ liệu nếu có
        document.getElementById('update-role').value = role === 'Quản trị viên' ? 'ADMIN' : 'USER';

        // Điền chi nhánh vào select
        const branchSelect = document.getElementById('update-branch');
        for (let option of branchSelect.options) {
            if (option.value === branch) {
                option.selected = true; // Chọn chi nhánh đúng
                break;
            }
        }

        // Mở modal
        document.getElementById('updateAccountModal').style.display = 'block';
    });
});


// Đóng modal khi click vào nút "Thoát" hoặc "X" (nút đóng)
function closeUpdateModal() {
    document.getElementById('updateAccountModal').style.display = 'none';
}
// Đóng modal khi click vào nút "Thoát" hoặc "X"
document.querySelector('.close').addEventListener('click', function () {
    document.getElementById('updateAccountModal').style.display = 'none';
});
document.querySelector('.close-button').addEventListener('click', function () {
    document.getElementById('updateAccountModal').style.display = 'none';
});
