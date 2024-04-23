// package com.itda.oauth.controller;

// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.ResponseBody;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.security.core.context.SecurityContextHolder;

// import com.itda.oauth.jwt.JWTFilter;

// @CrossOrigin(origins = "http://localhost:3000")
// @RestController
// @RequestMapping("/user")
// public class LoginController {

// private final JWTFilter jwtFilter;

// public LoginController(JWTFilter jwtFilter) {
// this.jwtFilter = jwtFilter;
// }

// @CrossOrigin
// @GetMapping("/login")
// @ResponseBody
// public String mainAPI() {

// Authentication username2 =
// SecurityContextHolder.getContext().getAuthentication();
// System.out.println("사용자명 익명 : " + username2.getName());

// // getAuthentication().getName();
// // System.out.println("사용자명 : " + username);
// return "main route";
// }
// }
