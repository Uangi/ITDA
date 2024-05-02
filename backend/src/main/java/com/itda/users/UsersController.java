package com.itda.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itda.dto.CreateUserRequest;
import com.itda.item.ItemService;
import com.itda.location.Location;
import com.itda.location.LocationSelectedService;
import com.itda.location.LocationService;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UsersController {

    private UsersService usersService;
    private LocationService locationService;
    private ItemService itemService;
    private LocationSelectedService locationSelectedService;
    private HttpSession httpSession;
    private FileService fileService;
    
    @Value("${project.uploadpath}")
    private String filepath;
    
    public UsersController(UsersService usersService, LocationService locationService, ItemService itemService, LocationSelectedService locationSelectedService, HttpSession httpSession, FileService fileService) {
        this.usersService = usersService;
        this.locationService = locationService;
        this.itemService = itemService;
        this.locationSelectedService = locationSelectedService;
        this.fileService = fileService;
    }
    
    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<Users>> findAll() {
        List<Users> users = usersService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/logged-in")
    public ResponseEntity<Users> findLoggedInUser() {
        String loggedInUserId = (String) httpSession.getAttribute("userId");

        Users loggedInUser = usersService.findByUserId(loggedInUserId);

        return new ResponseEntity<>(loggedInUser, HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<Object> craeteUser(@RequestBody CreateUserRequest request) {
        Users users = request.getUsers();
        Location location = request.getLocation();
        Files files = request.getFiles();

        // 회원 정보 저장 - Users와 Files 함께 저장
        Users savedUser = usersService.save(users, files);


        // 회원가입하면서 userNo 기반으로 동시에 테이블 생성(회원탈퇴하면 한번에 다 지워야함)
        // usersService.save(savedUser);
        // fileService.save(savedUser);

        itemService.save(savedUser); // Users를 저장한 후 itemService를 호출하여 추가 작업 수행


        return new ResponseEntity<>(locationService.save(savedUser, location), HttpStatus.OK);
    }


    // 파일 업로드
    @CrossOrigin
    @PostMapping("/upload")
	public String fileinsert(HttpServletRequest request, @RequestPart MultipartFile files) throws Exception{
		Files file = new Files();
		
		        String sourceFileName = files.getOriginalFilename(); 
        		String sourceFileNameExtension = FilenameUtils.getExtension(sourceFileName).toLowerCase(); 
        		File destinationFile; 
        		String destinationFileName;

        		do { 
            			destinationFileName = RandomStringUtils.randomAlphanumeric(32) + "." + sourceFileNameExtension; 
            			destinationFile = new File(filepath + destinationFileName); 
        		} while (destinationFile.exists()); 
        
        		destinationFile.getParentFile().mkdirs(); 
        		files.transferTo(destinationFile);
        
        		file.setFilename(destinationFileName);
        		file.setFileOriName(sourceFileName);
        		file.setFileurl(filepath);
        		fileService.save(file);
			return "redirect:/users/create";
	}
}
