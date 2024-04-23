// package com.itda.user;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.authentication.AuthenticationManager;
// import
// org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import
// org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
// import
// org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import
// org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import
// org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;
// import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

// import com.itda.user.UserSecurityService;

// import lombok.RequiredArgsConstructor;

// //@Configuration : 시큐리티 환경설정 파일이기도하고, 스프링 환경설정할 때 @Configuration하면 됨
// //@EnableWebSecurity : 앞으로 입력하는 모든 url은 security의 제어를 받게 할거임
// @RequiredArgsConstructor
// @Configuration
// @EnableWebSecurity // Spring Security를 활성화하는 데 사용됩니다. 이를 통해 Spring Security의
// 설정을 사용 @EnableGlobalMethodSecurity(prePostEnabled=true)
// // 어노테이션은 메서드 단위의 보안을 활성화합니다. @PreAuthorize와 같은 어노테이션을 사용하여 메서드에 대한 보안 설정
// // AnswerController나 QuestionController에서@ preAuthorize쓰기위해서
// // @EnableGlobalMethodSecurity(prePostEnabled = true) 써야함
// public class SecurityConfig {

// // @RequiredArgsConstructor에 의해 Service클래스 의존성 주입시켜줌
// private final UserSecurityService userSecurityService;

// // 접근하는 주소는 무조건 http가 받아낼거임
// // 그 이후에 처리작업 진행예정
// // 메서드를 객체화시켜서 클래스에 올리는 ..filterChain이름으로 객체생성함
// @Bean
// public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

// // 모든 인증되지 않은 요청을 허락
// // 어떠한 주소가 와도 허락하겠음. 즉, 로그인하지 않아도 일반매칭 부분은 관람할 수 있다라고 해야되나
// http.authorizeRequests().antMatchers("/**").permitAll()
// .and()
// .csrf().ignoringAntMatchers("/oracle-console/**") // CSRF(Cross-Site Request
// Forgery) 보호를 구성합니다. 여기서는 H2
// // 데이터베이스 콘솔과 같은 특정 URL 패턴을 CSRF 보호에서 제외
// .and()
// .headers()
// .addHeaderWriter(new
// XFrameOptionsHeaderWriter(XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN))
// .and() // HTTP 헤더에 X-Frame-Options를 추가하여 클릭재킹 공격을 방지합니다. SAMEORIGIN 모드는 해당
// 페이지를 포함한
// // 프레임을 동일한 출처에서만 허용
// .formLogin().loginPage("/user/login").defaultSuccessUrl("/")
// .and() // 사용자의 로그인 페이지 및 로그인 후 기본적으로 리다이렉트될 URL을 설정합니다.
// .logout().logoutRequestMatcher(new AntPathRequestMatcher("/user/logout")) //
// /user/logout 경로로 요청이 올 때
// // 로그아웃을 처리
// .logoutSuccessUrl("/").invalidateHttpSession(true) // 세션 무효화 후 루트 url(index)
// 로 리다이렉트

// ;

// // 서버가 받아서 처리작업할거임
// return http.build();
// }

// // 패스워드 암호화
// @Bean
// public PasswordEncoder passwordEncoder() {

// return new BCryptPasswordEncoder();
// // 패스워드를 암호화하는 데 사용되는 빈을 생성합니다. BCryptPasswordEncoder를 사용하여 암호화를 수행
// }

// // AuthenticationManager : 인증하는 매니저
// @Bean
// public AuthenticationManager
// authenticationManager(AuthenticationConfiguration
// authenticationConfiguration)
// throws Exception {

// // getAuthenticationManager가 로그인처리를 알아서 해줌
// return authenticationConfiguration.getAuthenticationManager();
// // 인증을 관리하는 데 사용되는 빈을 생성합니다. 이 빈은 로그인 처리를 담당
// }

// }
