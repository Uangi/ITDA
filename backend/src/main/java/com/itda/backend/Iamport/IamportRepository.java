package com.itda.backend.Iamport;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IamportRepository extends JpaRepository<Iamport,Long> {
    
    List<Iamport> findByUserNo(Long userNo);

}
