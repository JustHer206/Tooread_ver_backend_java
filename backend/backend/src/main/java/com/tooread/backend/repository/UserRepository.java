package com.tooread.backend.repository;

import com.tooread.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository // Đánh dấu đây là tầng kết nối CSDL của Spring Boot
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Hàm dùng để tìm kiếm người dùng bằng Username (Phục vụ cho Đăng nhập)
    Optional<User> findByUsername(String username);
    
    // Hàm dùng để kiểm tra xem Email đã tồn tại trong hệ thống chưa (Phục vụ cho Đăng ký)
    boolean existsByEmail(String email);
    
    // Hàm dùng để kiểm tra xem Username đã tồn tại chưa
    boolean existsByUsername(String username);
}