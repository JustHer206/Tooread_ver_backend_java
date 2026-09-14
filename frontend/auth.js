// ==========================================
// 1. XỬ LÝ LOGIC ĐĂNG KÝ (SIGN UP)
// ==========================================
async function handleRegister(event) {
    event.preventDefault(); // Ngăn trang web bị load lại khi bấm nút submit

    // Lấy dữ liệu chuẩn theo đúng ID trong HTML của bạn
    const usernameInput = document.getElementById('modalRegName').value;
    const emailInput = document.getElementById('modalRegEmail').value;
    const passwordInput = document.getElementById('modalRegPassword').value;

    // Gom dữ liệu thành object gửi lên Java (phải khớp tên thuộc tính của Entity User)
    const userData = {
        username: usernameInput,
        email: emailInput,
        password: passwordInput
    };

    try {
        // Bắn dữ liệu sang Java Backend
        const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const result = await response.text();

        // Kiểm tra kết quả trả về
        if (result.includes("thành công")) {
            alert("Chúc mừng! " + result);
            // Tự động kích hoạt bấm nút chuyển sang giao diện Login của bạn
            document.getElementById('linkToLogin').click(); 
        } else {
            alert(result); // Hiện lỗi trùng tài khoản hoặc email từ Java trả về
        }

    } catch (error) {
        console.error("Lỗi kết nối Backend:", error);
        alert("Không thể kết nối đến máy chủ Backend. Hãy chắc chắn bạn đã bật Spring Boot!");
    }
}

// Lắng nghe sự kiện submit của Form Đăng ký dựa vào ID: modalRegisterForm
document.getElementById('modalRegisterForm').addEventListener('submit', handleRegister);


// ==========================================
// 2. XỬ LÝ LOGIC ĐĂNG NHẬP (SIGN IN)
// ==========================================
async function handleLogin(event) {
    event.preventDefault();

    // Lấy giá trị từ ô Username mới sửa bên HTML
    const usernameInput = document.getElementById('modalLoginEmail').value;
    const passwordInput = document.getElementById('modalLoginPassword').value;

    const loginData = {
        username: usernameInput,
        password: passwordInput
    };

    try {
        // Bắn dữ liệu sang API Login
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const result = await response.text();

        if (result.includes("thành công")) {
            alert(result);
            
            // 🔥 ĐÃ THÊM: Lưu tên người dùng vào bộ nhớ trình duyệt để không bị mất khi F5
            localStorage.setItem('username', usernameInput);

            // Tải lại trang để kích hoạt giao diện "biến hình"
            window.location.reload(); 
        } else {
            alert(result); // Hiện lỗi sai mật khẩu hoặc tài khoản không tồn tại
        }

    } catch (error) {
        console.error("Lỗi kết nối Backend:", error);
        alert("Không thể kết nối đến máy chủ Backend!");
    }
}

// Lắng nghe sự kiện submit của Form Đăng nhập dựa vào ID: modalLoginForm
document.getElementById('modalLoginForm').addEventListener('submit', handleLogin);


// ==========================================
// 3. LOGIC CHUYỂN ĐỔI QUA LẠI GIỮA ĐĂNG NHẬP VÀ ĐĂNG KÝ
// ==========================================

// Khi bấm vào "Register now!" ở ô Đăng nhập
document.getElementById('linkToRegister').addEventListener('click', function(event) {
    event.preventDefault(); // Ngăn trang web bị giật hoặc nhảy trang
    document.getElementById('loginSection').classList.add('d-none');     // Ẩn ô Đăng nhập
    document.getElementById('registerSection').classList.remove('d-none'); // Hiện ô Đăng ký
});

// Khi bấm vào "Log in" ở ô Đăng ký để quay lại
document.getElementById('linkToLogin').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('registerSection').classList.add('d-none');  // Ẩn ô Đăng ký
    document.getElementById('loginSection').classList.remove('d-none');  // Hiện ô Đăng nhập
});


// ==========================================
// 4. ĐÃ THÊM: TỰ ĐỘNG ĐIỀU KHIỂN GIAO DIỆN KHI VỪA VÀO TRANG
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    // Thử lục lọi trong máy xem trước đó đã có ai đăng nhập thành công chưa
    const savedUsername = localStorage.getItem('username');

    const guestMenu = document.getElementById('guestMenu');
    const userMenu = document.getElementById('userMenu');
    const usernameDisplay = document.getElementById('usernameDisplay');

    if (savedUsername) {
        // NẾU ĐÃ ĐĂNG NHẬP:
        if (guestMenu) guestMenu.classList.add('d-none');    // Ẩn cụm nút chứa nút Log In cũ đi
        userMenu.classList.remove('d-none');                  // Xóa d-none để hiện Dashboard, Tên, Logout lên
        usernameDisplay.innerText = savedUsername;            // Đút tên người dùng vào thẻ span của bạn
    } else {
        // NẾU CHƯA ĐĂNG NHẬP (HOẶC ĐÃ ẤN LOGOUT):
        if (guestMenu) guestMenu.classList.remove('d-none'); // Hiện lại nút Log In cho khách bấm
        userMenu.classList.add('d-none');                     // Ẩn cụm Dashboard đi
    }
});


// ==========================================
// 5. ĐÃ THÊM: LOGIC XỬ LÝ NÚT LOGOUT
// ==========================================
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('username'); // Xóa sạch tên người dùng khỏi máy
    window.location.reload();            // Tải lại trang để đưa giao diện về trạng thái ban đầu
});