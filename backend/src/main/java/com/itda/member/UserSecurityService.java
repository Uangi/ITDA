package com.itda.member;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserSecurityService implements UserDetailsService {
    // UserDetailsService는 Spring Security에서 사용자 정보를 가져오는 인터페이스

    // @RequiredArgsConstructor에 의해 의존성 주입시킴
    private final UserRepository userRepository;

    // 사용자 이름으로 (검증) 비밀번호를 조회해서 리턴하는 메서드
    // UserRepository에서 만든 사용자명이 username으로 들어옴 그래서 조회해보자
    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        // loadUserByUsername 는 UserDetailsService 인터페이스의 메서드 인데
        // Spring Security 에서 인증을 수행할 때 사용돼.

        // 사용자명으로 (ID)객체 조회
        // select가 돼서 이름이 있다면 searchUser에 데이터가 들어가게 됨
        Optional<SiteUser> searchUser = userRepository.findByUserName(userName);

        if (!searchUser.isPresent()) { // idEmpty() 근데 만약에 없다면
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다");
        }

        // 서치한 사용자명을 받아내서
        // 여기까지 온 단계면 id는 맞은거임
        SiteUser siteUser = searchUser.get();

        // 비밀번호 검색
        // <GrantedAuthority> 인증된 권한을 담을 그릇(List)
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();

        // 들어온 id 의 값이 admin이면 (UserRole 에서 선언함)
        // admin권한 부여
        if ("admin".equals(userName)) {

            authorities.add(new SimpleGrantedAuthority(UserRole.ADMIN.getValue())); // ROLE_ADMIN을 그릇에 담음
            // UserRole에서 만든 value
        } else { // 일반 사용자 권한 부여

            authorities.add(new SimpleGrantedAuthority(UserRole.USER.getValue()));// ROLE_USER을 그릇에 담음

        }

        // 사용자 이름, 패스워드, 권한 돌려주기
        // 스프링 시큐리티의 User객체에 3개의 데이터를 담아 리턴
        return new User(siteUser.getUserName(), siteUser.getPassword(), authorities);
    }

}
