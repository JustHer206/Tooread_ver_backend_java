package com.tooread.backend.controller;

import com.tooread.backend.model.User;
import com.tooread.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController // Đánh dấu đây là lớp tạo REST API
@RequestMapping("/api/auth") // Tất cả đường dẫn trong file này sẽ bắt đầu bằng /api/auth
@CrossOrigin(origins = "*") // Cho phép Frontend (HTML/JS) ở máy bạn gọi API này mà không bị lỗi bảo mật (CORS)
public class AuthController {

    @Autowired
    private UserService userService; // Gọi tầng Service sang để dùng logic kiểm tra tài khoản

    // 1. API ĐĂNG KÝ: Nhận dữ liệu dạng JSON từ Frontend gửi lên
    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    // 2. API ĐĂNG NHẬP: Nhận username và password để kiểm tra
    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");
        return userService.loginUser(username, password);
    }
}