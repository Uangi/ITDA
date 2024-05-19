package com.itda.backend.csanswer.controller;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.itda.backend.csanswer.entity.CSAnswerEntity;
import com.itda.backend.csanswer.service.CSAnswerService;

@RestController
@RequiredArgsConstructor
public class CSAnswerController {

    private final CSAnswerService csAnswerService;

    @CrossOrigin
    @PostMapping("/answer/write")
    public ResponseEntity<Void> answerWrite(@RequestBody CSAnswerEntity entity) {
        csAnswerService.answerWrite(entity);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin
    @GetMapping("/answer/list")
    public ResponseEntity<List<CSAnswerEntity>> answerList() {
        List<CSAnswerEntity> answerList = csAnswerService.answerList();
        return ResponseEntity.ok(answerList);
    }

    @CrossOrigin
    @GetMapping("/answerDetail")
    public ResponseEntity<CSAnswerEntity> getAnswerDetail(@RequestParam String answerNo) {
        Long number = Long.parseLong(answerNo);
        CSAnswerEntity answer = csAnswerService.findByAnswerNo(number);
        return ResponseEntity.ok(answer);
    }

    @CrossOrigin
    @PostMapping("/answerEdit")
    public ResponseEntity<Void> editAnswer(@RequestBody CSAnswerEntity entity) {
        csAnswerService.editAnswer(entity);
        return ResponseEntity.ok().build();
    }
}
