package com.itda.backend.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.itda.backend.location.Location;
import com.itda.backend.location.LocationService;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
public class LoginController {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private LocationService locationService;

    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<Object> craeteUser(@RequestBody CreateUserRequest request) {
        Users users = request.getUsers();
        Location location = request.getLocation();

        // 회원가입하면서 userNo 기반으로 동시에 테이블 생성(회원탈퇴하면 한번에 다 지워야함)
        usersRepository.save(users);

        return new ResponseEntity<>(locationService.save(users, location), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials, HttpSession session) {
        String userId = credentials.get("userId");
        String userPassword = credentials.get("userPassword");

        Users users = usersRepository.findByUserId(userId);
        if (users == null || !userPassword.equals(users.getUserPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 올바르지 않습니다.");
        }

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("userName", users.getUserName());
        responseData.put("userId", users.getUserId());

        session.setAttribute("userId", users.getUserId());
        session.setAttribute("userName", users.getUserName());

        return ResponseEntity.ok(responseData);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.removeAttribute("userName");
        session.invalidate();
        return ResponseEntity.status(HttpStatus.OK).body("로그아웃 되었습니다.");
    }
}
