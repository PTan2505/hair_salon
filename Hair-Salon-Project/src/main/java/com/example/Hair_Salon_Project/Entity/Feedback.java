package com.example.Hair_Salon_Project.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String feedbackText;

    private Date createDate;

    private int rating;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;

    @ManyToOne
    @JoinColumn(name = "account_id") // Tùy chọn: nếu có liên kết đến tài khoản
    private Account account;

    @ManyToOne // Thêm thuộc tính staff với quan hệ ManyToOne
    @JoinColumn(name = "staff_id") // Đảm bảo tên cột này tương ứng với bảng trong cơ sở dữ liệu
    private Staff staff;

    @PrePersist
    protected void onCreate() {
        this.createDate = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updateDate = new Date();
    }
}
