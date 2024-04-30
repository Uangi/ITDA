package com.itda.location;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import lombok.Data;
import lombok.Getter; 
import lombok.Setter;

@Getter
@Setter
@Data
@Table(name = "Location")
@Entity
public class Location {

    @Id
    @Column(name = "user_no")
    private Long userNo;

    @Column(nullable = true)
    private double lat;

    @Column(nullable = true)
    private double lng;

    @Column(nullable = true)
    private double adjustedLat;

    @Column(nullable = true)
    private double adjustedLng;

    @Column(nullable = true)
    private Timestamp createdLocationTime;
    
    @Column(nullable = true)
    private String address;

    //로컬타임 가져오기
    @PrePersist
    public void prePersist() {
        this.createdLocationTime = new Timestamp(System.currentTimeMillis());
    }
    
}


