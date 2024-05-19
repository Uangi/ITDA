package com.itda.backend.csanswer.entity;

import javax.persistence.Entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "answer_entity")
public class CSAnswerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence-generator")
    @SequenceGenerator(name = "sequence-generator", sequenceName = "answer_sequence", allocationSize = 1)
    @Column(name = "answer_no")
    private Long answerNo;

    @Column(name = "board_no")
    private Long boardNo;

    @Column(nullable = false, length = 500, name = "answer_content")
    private String answerContent;

    @Column(nullable = false, length = 30, name = "answer_subject")
    private String answerSubject;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "updated_at")
    private LocalDateTime UpdatedAt;

}
