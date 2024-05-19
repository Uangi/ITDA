package com.itda.backend.csboard.entity;

import java.time.LocalDateTime;

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
@Entity(name = "board_entity")
public class CSBoardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence-generator")
    @SequenceGenerator(name = "sequence-generator", sequenceName = "board_sequence", allocationSize = 1)
    @Column(name = "board_no")
    private Long boardNo;

    @Column(nullable = false, length = 15, name = "board_write_id")
    private String boardWriteId;

    @Column(nullable = false, length = 500, name = "board_content")
    private String boardContent;

    @Column(nullable = false, length = 30, name = "board_subject")
    private String boardSubject;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "updated_at")
    private LocalDateTime UpdatedAt;

}
