package com.itda.backend.users;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Users implements Serializable {

    @Id
    @Column(name = "user_no")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq_generator")
    @SequenceGenerator(name = "user_seq_generator", sequenceName = "USER_SEQ", allocationSize = 1)
    private Long userNo;

    @Column(name = "user_id", unique = true)
    private String userId;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "user_password")
    private String userPassword;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "user_gender")
    private String userGender;

    @Column(name = "user_address")
    private String userAddress;

    @Column(name = "user_age")
    private String userAge;

    @Column(name = "user_hobby")
    private String userHobby;

    @Column(name = "user_height")
    private int userHeight;

    @Column(name = "user_tel")
    private String userTel;

    @Column(name = "user_weight")
    private int userWeight;

    @Column(name = "user_profile")
    private String userProfile;

    @Column(name = "user_MBTI")
    private String userMBTI;

    @Column(name = "dia_qty")
    private int diaQty;

    public void increaseDiaQty(int amount) {
        this.diaQty += amount;
    }

    public void decreaseDiaQty(int amount) {
        this.diaQty -= amount;
    }
}