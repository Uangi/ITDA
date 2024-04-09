package com.itda.member;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<SiteUser, Long> {

    /*
     * JpaRepository는 Spring Data JPA에서 제공하는 인터페이스로, 엔티티에 대한 CRUD(Create, Read,
     * Update, Delete) 기능을 제공해줘.
     * 
     * SiteUser는 엔티티 클래스이고 Long은 SiteUser의 기본 키(id)의 타입이야 만약 SiteUser 가 기본 키값을 가지고
     * 있지않다면 저장이나 조회 기능은 안된대. 하지만 매번 있는게 아니고 뷰(View)나 중간테이블? 이럴때는 중간 테이블
     * 없이 쓴대. 이럴 때는 <SiteUser, Void> 이렇게 사용하는거지
     */

    // sql쿼리 SELECT 문 작성
    Optional<SiteUser> findByUserName(String userName);
}
