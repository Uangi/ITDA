package com.itda.backend.Iamport;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Table(name = "Payment")
@Entity
public class Iamport {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long payment_id;

    @Column(name = "user_no")
    private Long userNo;

    @Column(nullable = true)
    private String product;

    @Column(nullable = true)
    private int amount;

    @Column(nullable = true)
    private String orderNumber;

    @Column(nullable = true)
    private int price;

    @Column(nullable = true)
    private String purchaseTime;

}
