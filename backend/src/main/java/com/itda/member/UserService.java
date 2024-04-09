package com.itda.member;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.itda.member.DataNotFoundException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService { // 회원 생성

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // SecurityConfig의 passwordEncoder메서드가 여기로 와서 아래로 내려감
    // PasswordEncoder 인터페이스는 스프링 시큐리티에서 비밀번호를 안전하게 암호화하고 해시화하는 데 사용
    // 실제로 비밀번호를 암호화하고 비교

    public SiteUser create(String userName, String email, String password) {

        SiteUser user = new SiteUser();
        user.setUserName(userName);
        user.setEmail(email);

        // 패스워드 암호화
        // 스프링은 해당 service클래스를 통해 바로 passwordEncoder로 암호화시킬 수 있음
        // BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        user.setPassword(passwordEncoder.encode(password));

        userRepository.save(user); // JPA 구문으로 저장

        return user;
    }

    public SiteUser getUser(String userName) {

        Optional<SiteUser> siteUser = userRepository.findByUserName(userName);

        if (siteUser.isPresent()) {

            return siteUser.get();
        } else {
            throw new DataNotFoundException("사용자가 없습니다");
        }

    }

}
