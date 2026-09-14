package com.tooread.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "users") // Báo cho Java biết lớp này ánh xạ vào bảng 'users' trong CSDL
@Data // Thư viện Lombok tự sinh hàm Getter, Setter, toString... giúp code ngắn gọn
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Khóa chính tự động tăng (AUTO_INCREMENT)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(length = 20)
    private String role = "USER"; // Mặc định quyền của tài khoản mới là USER

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now(); // Tự động lấy thời gian hiện tại khi tạo tài khoản
}