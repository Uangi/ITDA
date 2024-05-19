package com.itda.backend.csanswer.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itda.backend.csanswer.entity.CSAnswerEntity;
import com.itda.backend.csanswer.repository.CSAnswerRepository;

@Service
public class CSAnswerService {
    @Autowired
    private CSAnswerRepository csAnswerRepository;

    public void answerWrite(CSAnswerEntity csAnswerEntity) {
        csAnswerEntity.setCreatedAt(LocalDateTime.now());
        csAnswerRepository.save(csAnswerEntity);
    }

    public List<CSAnswerEntity> answerList() {
        try {
            return csAnswerRepository.findAll();
        } catch (Exception e) {
            return null; 
        }
    }

    public CSAnswerEntity findByAnswerNo(Long answerNo) {
        return csAnswerRepository.findByAnswerNo(answerNo);
    }

    public void editAnswer(CSAnswerEntity csAnswerEntity) {

        CSAnswerEntity entity = csAnswerRepository.findByAnswerNo(csAnswerEntity.getAnswerNo());
        entity.setUpdatedAt(LocalDateTime.now()); // 수정된 시간을 설정할 수 있도록 업데이트
        entity.setAnswerContent(csAnswerEntity.getAnswerContent());
        entity.setAnswerSubject(csAnswerEntity.getAnswerSubject());
        // 정보 다시저장
        csAnswerRepository.save(entity);
    }

}
