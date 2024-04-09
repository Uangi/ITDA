package com.itda.member;

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
@Entity(name = "member")
public class SiteUser {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence-generator")
    @SequenceGenerator(name = "sequence-generator", sequenceName = "YOUR_SEQUENCE_NAME", allocationSize = 1)
    private long id;

    @Column(unique = true)
    private String userName;
    private String password;

    @Column
    private String email;
}
