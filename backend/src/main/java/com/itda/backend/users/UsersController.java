package com.itda.backend.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.itda.backend.location.Location;
import com.itda.backend.location.LocationService;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private HttpSession httpSession;

    @Autowired
    private LocationService locationService;
    
    @Autowired
    private UsersService usersService;

    @Value("${file_path}")
    private String file_path;

    @GetMapping
    public ResponseEntity<List<Users>> findAll() {
        List<Users> users = usersService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/logged-in")
    public ResponseEntity<Users> findLoggedInUser() {
        String loggedInUserId = (String) httpSession.getAttribute("userId");

        Users loggedInUser = usersService.findByUserId(loggedInUserId);

        return new ResponseEntity<>(loggedInUser, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Object> createUser(@ModelAttribute CreateUserRequest request) {
    
    Users users = request.getUsers();
    Location location = request.getLocation();
    MultipartFile file = request.getUploadFile();
    
    // 파일 업로드 처리
    try {
        String savedFileName = "";
        String uploadPath = file_path;
        String originalFileName = file.getOriginalFilename();
        UUID uuid = UUID.randomUUID();
        savedFileName = uuid.toString() + "_" + originalFileName;
        File newFile = new File(uploadPath + savedFileName);
        file.transferTo(newFile);

        users.setUserProfile(savedFileName);
        
        // 사용자와 위치 정보 저장
        usersService.save(users);
        // itemService.save(users);
        locationService.save(users, location);
        
        // 파일 정보도 함께 사용자 정보와 함께 반환
        Map<String, Object> response = new HashMap<>();
        response.put("originalFileName", originalFileName);
        response.put("savedFileName", savedFileName);
        response.put("user", users); // 사용자 정보도 함께 반환
        // response.put("file", file); 
    } catch (IOException e) {
        // 파일 업로드 실패 시 예외 처리
        e.printStackTrace();
        return new ResponseEntity<>("파일 업로드 실패", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    // 파일 업로드 성공 시 성공 응답 반환
    return new ResponseEntity<>("파일 업로드 성공 .", HttpStatus.OK);
}
}
