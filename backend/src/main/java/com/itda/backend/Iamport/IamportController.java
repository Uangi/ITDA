package com.itda.backend.Iamport;

import java.io.IOException;

import javax.annotation.PostConstruct;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.itda.backend.users.Users;
import com.itda.backend.users.UsersRepository;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@CrossOrigin
@RestController
public class IamportController {

    @Autowired
    private IamportService iamportService;

    @Autowired
    private UsersRepository usersRepository;

    @Value("${iamport.key}")
    private String restApiKey;
    @Value("${iamport.secret}")
    private String restApiSecret;

    private IamportClient iamportClient;

    @PostConstruct
    public void init() {
        this.iamportClient = new IamportClient(restApiKey, restApiSecret);
    }

    @PostMapping("/verifyIamport/{imp_uid}")
    public IamportResponse<Payment> paymentByImpUid(@PathVariable("imp_uid") String imp_uid) throws IamportResponseException, IOException {
        return iamportClient.paymentByImpUid(imp_uid);
    }

    @PostMapping("/purchase")
    public ResponseEntity<?> purchase(@RequestBody Iamport iamport) {

        Long userNo = iamport.getUserNo();
        int amount = iamport.getAmount();
        Optional<Users> OptionalUser = usersRepository.findByUserNo(userNo);

        if (OptionalUser.isPresent()) {
            Users userInfo = OptionalUser.get();
            
            userInfo.increaseDiaQty(amount);    // Users 다이아 증감 메소드 실행
            usersRepository.save(userInfo);

        } else { // userNo에 해당하는 유저 정보 없을 때 예외
            throw new IllegalArgumentException("유저 정보가 없습니다.");
        }
        ResponseEntity<?> purchaseentity = new ResponseEntity<>(iamportService.save(iamport), HttpStatus.OK);

        return purchaseentity;
    }
    
    @CrossOrigin
    @PostMapping("/orderlist")
    public ResponseEntity<?> getList(@RequestBody Iamport iamport) {
        
        ResponseEntity<?> purchaseentity = new ResponseEntity<>(iamportService.findByUserNo(iamport.getUserNo()), HttpStatus.OK);

        return purchaseentity;

    }
    
}
