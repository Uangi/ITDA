package com.itda.backend.csboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itda.backend.csboard.entity.CSBoardEntity;

public interface CSBoardRepository extends JpaRepository<CSBoardEntity, Long> {

    CSBoardEntity findByBoardNo(Long boardNo);
}
