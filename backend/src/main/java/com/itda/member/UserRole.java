package com.itda.member;

import lombok.Getter;

//이미 있으니까 갖다쓰기만 하면돼서 getter만 불러옴
@Getter
public enum UserRole {

    // 권한코드 ADMIN("") 이 안에 역할을 적어주면 됨
    ADMIN("ROLE_ADMIN"),
    USER("ROLE_USER");

    private String value;

    UserRole(String value) { // 생성자
        this.value = value; // 문자열이 들어가야 하기 때문에 만듬
    }
}