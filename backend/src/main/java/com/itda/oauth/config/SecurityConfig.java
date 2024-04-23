package com.itda.oauth.config;

import com.itda.oauth.jwt.JWTFilter;
import com.itda.oauth.jwt.JWTUtil;
import com.itda.oauth.oauth2.CustomSuccessHandler;
import com.itda.oauth.service.CustomOAuth2UserService;
import javax.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

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
                                                .loginPage("/api/user-info") // 로그인 페이지로 연결
                                                .userInfoEndpoint((userInfoEndpointConfig) -> userInfoEndpointConfig
                                                                .userService(customOAuth2UserService))
                                                .successHandler(customSuccessHandler));

                // 경로별 인가 작업
                http
                                .authorizeRequests()
                                .antMatchers("/").permitAll()
                                .antMatchers("/my").hasRole("USER")
                                .antMatchers("/user").hasRole("USER")
                                .antMatchers("/Login").hasRole("USER")
                                .antMatchers("/api/user-info").hasRole("USER")
                                .antMatchers("/api/logout").hasRole("USER")
                                .anyRequest().authenticated();

                // 세션 설정 : STATELESS
                http
                                .sessionManagement((session) -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

                return http.build();
        }
}