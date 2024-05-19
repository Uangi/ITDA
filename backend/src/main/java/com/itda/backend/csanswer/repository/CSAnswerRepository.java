package com.itda.backend.csanswer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itda.backend.csanswer.entity.CSAnswerEntity;

public interface CSAnswerRepository extends JpaRepository<CSAnswerEntity, Long> {
    CSAnswerEntity findByAnswerNo(Long AnswerNo);
}
