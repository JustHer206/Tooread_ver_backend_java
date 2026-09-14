package com.tooread.backend.service;

import com.tooread.backend.model.User;
import com.tooread.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service // Đánh dấu đây là tầng xử lý logic nghiệp vụ của Spring Boot
public class UserService {

    @Autowired
    private UserRepository userRepository; // Gọi tầng Repository vào để dùng các hàm CSDL

    // LOGIC XỬ LÝ ĐĂNG KÝ TÀI KHOẢN MỚI
    public String registerUser(User user) {
        // 1. Kiểm tra xem username đã có ai dùng chưa
        if (userRepository.existsByUsername(user.getUsername())) {
            return "Lỗi: Tên tài khoản đã tồn tại!";
        }

        // 2. Kiểm tra xem email đã có ai dùng chưa
        if (userRepository.existsByEmail(user.getEmail())) {
            return "Lỗi: Email này đã được đăng ký!";
        }

        /* LƯU Ý BẢO MẬT: Đúng chuẩn thì mật khẩu phải được mã hóa trước khi lưu.
           Nhưng để bạn chạy thử nghiệm API mượt mà và dễ hiểu trước, 
           ở đây chúng ta tạm thời lưu mật khẩu thô. Tí nữa xong xuôi mình sẽ chỉ bạn thêm bảo mật sau nhé!
        */

        // 3. Tiến hành lưu user mới vào MySQL XAMPP
        userRepository.save(user);
        return "Đăng ký thành công!";
    }

    // LOGIC XỬ LÝ ĐĂNG NHẬP
    public String loginUser(String username, String password) {
        // 1. Tìm người dùng trong CSDL theo username
        Optional<User> userOpt = userRepository.findByUsername(username);

        // 2. Nếu tìm thấy user, tiến hành so khớp mật khẩu
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(password)) {
                return "Đăng nhập thành công! Chào mừng " + user.getUsername();
            } else {
                return "Lỗi: Mật khẩu không chính xác!";
            }
        }

        // 3. Nếu không tìm thấy username trong hệ thống
        return "Lỗi: Tài khoản không tồn tại!";
    }
}