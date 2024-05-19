package com.itda.backend.board;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itda.backend.users.Users;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    public List<Board> findAll() {
        return boardRepository.findAll();
    }

    public Board write(Users writer, String title, String content,
            LocalDate timeStamp) {

        if (writer == null) {
            throw new IllegalArgumentException("작성자의 유저 정보가 존재하지 않습니다.");
        }

        Board boardItem = new Board();
        boardItem.setWriterId(writer.getUserId());
        boardItem.setWriter(writer);
        boardItem.setTitle(title);
        boardItem.setContent(content);
        boardItem.setReportCount(0);
        boardItem.setTimeStamp(timeStamp);

        return boardRepository.save(boardItem);
    }
}
