package com.itda.backend.location;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import lombok.Data;

@Data
@Table(name = "LocationSelected")
@Entity
public class LocationSelected {

    @Id
    private Long id;

    @Column(name = "user_no")
    private Long userNo;

    @Column(nullable = true)
    private Long selected;

    @Column(nullable = true)
    private Timestamp createdSelectedTime;

    // 로컬타임 가져오기(JPA)
    @PrePersist
    public void prePersist() {
        this.createdSelectedTime = new Timestamp(System.currentTimeMillis());
    }

}
