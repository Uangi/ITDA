package com.itda.backend.csboard.service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.itda.backend.csboard.entity.CSBoardEntity;
import com.itda.backend.csboard.repository.CSBoardRepository;

@Service
public class CSBoardService {
    @Autowired
    private CSBoardRepository csBoardRepository;

    public void boardWrite(CSBoardEntity csBoardEntity) {
        csBoardEntity.setCreatedAt(LocalDateTime.now());
        csBoardRepository.save(csBoardEntity);

    }

    public List<CSBoardEntity> boardList() {
        return csBoardRepository.findAll();

    }

    public CSBoardEntity findByBoardNo(Long boardNo) {
        return csBoardRepository.findByBoardNo(boardNo);
    }

    public void editBoard(CSBoardEntity csBoardEntity) {

        CSBoardEntity entity = csBoardRepository.findByBoardNo(csBoardEntity.getBoardNo());
        entity.setUpdatedAt(LocalDateTime.now());
        entity.setBoardContent(csBoardEntity.getBoardContent());
        entity.setBoardSubject(csBoardEntity.getBoardSubject());
        csBoardRepository.save(entity);
    }
}
