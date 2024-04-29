package com.itda.social_user.config;

import javax.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.itda.social_user.jwt.JWTFilter;
import com.itda.social_user.jwt.JWTUtil;
import com.itda.social_user.oauth2.CustomSuccessHandler;
import com.itda.social_user.service.CustomOAuth2UserService;

import java.util.Collections;

@Configuration
@EnableWebSecurity
@PropertySource("classpath:application-oauth.properties")
public class SecurityConfig {

        private final CustomOAuth2UserService customOAuth2UserService;
        private final CustomSuccessHandler customSuccessHandler;
        private final JWTUtil jwtUtil;

        public SecurityConfig(CustomOAuth2UserService customOAuth2UserService,
                        CustomSuccessHandler customSuccessHandler, JWTUtil jwtUtil) {

                this.customOAuth2UserService = customOAuth2UserService;
                this.customSuccessHandler = customSuccessHandler;
                this.jwtUtil = jwtUtil;
        }

        @Bean
        public BCryptPasswordEncoder bCryptPasswordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

                http
                                .cors(corsCustomizer -> corsCustomizer
                                                .configurationSource(new CorsConfigurationSource() {

                                                        @Override
                                                        public CorsConfiguration getCorsConfiguration(
                                                                        HttpServletRequest request) {

                                                                CorsConfiguration configuration = new CorsConfiguration();

                                                                configuration.setAllowedOrigins(Collections
                                                                                .singletonList("http://localhost:3000"));
                                                                configuration.setAllowedMethods(
                                                                                Collections.singletonList("*"));
                                                                configuration.setAllowCredentials(true);
                                                                configuration.setAllowedHeaders(
                                                                                Collections.singletonList("*"));
                                                                configuration.setMaxAge(3600L);

                                                                configuration.setExposedHeaders(Collections
                                                                                .singletonList("Set-Cookie"));
                                                                configuration.setExposedHeaders(Collections
                                                                                .singletonList("Authorization"));

                                                                return configuration;
                                                        }
                                                }));

                // csrf disable
                http
                                // .csrf((auth) -> auth.disable());
                                .csrf().disable();

                // From 로그인 방식 disable
                http
                                // .formLogin((auth) -> auth.disable());
                                .formLogin().disable();
                // HTTP Basic 인증 방식 disable
                http
                                // .httpBasic((auth) -> auth.disable());
                                .httpBasic().disable();
                // JWTFilter 추가
                http
                                .addFilterBefore(new JWTFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);

                // oauth2
                http
                                .oauth2Login((oauth2) -> oauth2
                                                // .loginPage("/api/user-info") // 로그인 페이지로 연결
                                                // .loginPage("/api/jwtlogin") // 로그인 페이지로 연결
                                                .userInfoEndpoint((userInfoEndpointConfig) -> userInfoEndpointConfig
                                                                .userService(customOAuth2UserService)) // 사용자 정보 가져오기
                                                .successHandler(customSuccessHandler));

                // 경로별 인가 작업
                http
                                .authorizeRequests()
                                .antMatchers("/", "/join", "/api/user-info", "/api/jwtlogin", "/Login", "/boardwrite",
                                                "/board/write")
                                .permitAll()
                                .antMatchers("/user", "/api/logout", "/req_meet/send_request",
                                                "/req_meet/requests", "/req_meet/request_status",
                                                "/req_meet/accept_request", "req_meet/reject_request",
                                                "/req_meet/schedule")
                                .hasRole("USER")
                                // .antMatchers().hasRole("USER")
                                // .antMatchers("/api/user-info").hasRole("USER")
                                // .antMatchers().hasRole("USER")
                                // .antMatchers("/del/{username}").hasRole("USER")
                                .anyRequest().authenticated();

                // 세션 설정 : STATELESS
                http
                                .sessionManagement((session) -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

                return http.build();
        }
}