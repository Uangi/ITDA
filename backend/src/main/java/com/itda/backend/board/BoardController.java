package com.itda.backend.board;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.itda.backend.users.Users;
import com.itda.backend.users.UsersService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class BoardController {

    @Autowired
    private BoardService boardService;

    @Autowired
    private UsersService usersService;

    @CrossOrigin
    @PostMapping("/write")
    public Board write(@RequestBody Board request) {

        String writerId = request.getWriterId();
        Users writer = usersService.findByUserId(writerId);

        if (writer != null) {

            request.setTimeStamp(LocalDate.now());

            String title = request.getTitle();
            String content = request.getContent();

            return boardService.write(writer, title, content, request.getTimeStamp());
        } else {
            throw new IllegalArgumentException("작성자의 유저 정보를 찾을 수 없습니다.");
        }
    }

    @CrossOrigin
    @GetMapping("/posts")
    public ResponseEntity<List<Board>> findAll() {
        List<Board> board = boardService.findAll();
        return new ResponseEntity<>(board, HttpStatus.OK);
    }

}
