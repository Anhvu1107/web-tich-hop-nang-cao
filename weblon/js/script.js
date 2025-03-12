const users = JSON.parse(localStorage.getItem("users")) || []; // Danh sách người dùng

// Xử lý đăng ký
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    
    if (users.find(u => u.email === email)) {
        alert("Email đã tồn tại!");
        return;
    }
    
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users)); // Lưu danh sách user vào localStorage
    document.getElementById("registerSuccess").classList.remove("d-none");
    document.getElementById("registerForm").reset();
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
});

// Xử lý đăng nhập
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user)); // Lưu thông tin người dùng
        document.getElementById("loginSuccess").classList.remove("d-none");
        document.getElementById("loginError").classList.add("d-none");
        
        setTimeout(() => {
            var loginModal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
            if (loginModal) loginModal.hide(); // Đóng modal đăng nhập
            updateUI();
        }, 1000);
    } else {
        document.getElementById("loginError").classList.remove("d-none");
        document.getElementById("loginSuccess").classList.add("d-none");
    }
});

// Cập nhật giao diện sau khi đăng nhập
function updateUI() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        document.getElementById("loginLink").classList.add("d-none");
        document.getElementById("registerLink").classList.add("d-none");
        document.getElementById("userInfo").classList.remove("d-none");
        document.getElementById("logoutLink").classList.remove("d-none");
        document.getElementById("userEmail").textContent = `Xin chào, ${currentUser.name}`;
    } else {
        document.getElementById("loginLink").classList.remove("d-none");
        document.getElementById("registerLink").classList.remove("d-none");
        document.getElementById("userInfo").classList.add("d-none");
        document.getElementById("logoutLink").classList.add("d-none");
    }
}

// Kiểm tra đăng nhập khi tải trang
document.addEventListener("DOMContentLoaded", updateUI);

// Xử lý đăng xuất
document.getElementById("logoutLink").addEventListener("click", function() {
    localStorage.removeItem("currentUser");
    updateUI();
});
