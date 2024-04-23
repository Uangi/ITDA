package com.itda.oauth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itda.oauth.entity.UserEntity;
import com.itda.oauth.jwt.JWTUtil;
import com.itda.oauth.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;

    public UserController(JWTUtil jwtUtil, UserRepository userRepository) {

        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    // 사용자 정보를 반환하는 엔드포인트
    @GetMapping("/user-info")
    public ResponseEntity<UserEntity> getUserInfo(@RequestHeader("Authorization") String authorizationHeader) {
        // 헤더에서 토큰 추출
        String token = authorizationHeader.substring(7); // "Bearer " 다음의 토큰 문자열만 추출

        // 토큰에서 사용자 정보 추출
        String username = jwtUtil.getUsername(token);

        // DB에서 사용자 정보 조회
        UserEntity userEntity = userRepository.findByUsername(username);
        System.out.println("유저 정보 : " + userEntity);
        if (userEntity == null) {
            // 사용자 정보가 없을 경우 404 응답을 반환하거나 적절한 예외 처리를 수행할 수 있습니다.
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(userEntity);
    }
}