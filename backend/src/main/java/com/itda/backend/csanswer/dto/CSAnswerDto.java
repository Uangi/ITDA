package com.itda.backend.csanswer.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CSAnswerDto {

    private Long answerNo;

    private Long boardNo;

    private String userNickname;

    private String answerContent;

    private String answerSubject;

    private String userEmail;

    private LocalDateTime createdAt;

}
