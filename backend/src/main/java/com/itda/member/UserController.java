package com.itda.member;

import javax.validation.Valid;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("/user")
public class UserController {

    // controller가 Service 불러들임
    private final UserService userService; // 비밀번호 암호화하는 클래스

    // 회원 가입을 위한 폼을 사용자에게 보여주기 위해 signup_form 뷰를 반환합니다.
    // 이때, UserCreateForm 객체를 생성하여 뷰로 전달
    @GetMapping("/signup")
    public String signup(UserCreateForm userCreateForm) {

        return "signup_form";
    }

    // 회원 가입 폼에서 전송된 데이터를 처리하고, 유효성 검사를 수행합니다.
    // 만약 입력된 데이터에 유효성 오류가 있으면 다시 signup_form 뷰를 반환하여 사용자에게 오류를 보여줍니다.
    // 만약 입력된 패스워드가 일치하지 않으면 오류를 반환
    @PostMapping("/signup")
    public String signup(@Valid UserCreateForm userCreateForm, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return "signup_form";
        }

        // 패스워드 1과 2가 같지 않으면
        if (!userCreateForm.getPassword1().equals(userCreateForm.getPassword2())) {

            // 에러띄우기
            // 필드명(여기에 에러남) / 오류코드 / 에러명
            bindingResult.rejectValue("password2", "passwordInCorrect", "패스워드가 일치하지 않습니다.");

            return "signup_form";
        }

        try {

            userService.create(userCreateForm.getUserName(), userCreateForm.getEmail(), userCreateForm.getPassword1());
            // userService 를 사용해서 회원 생성하고 DB에 저장

            // 중복된 데이터가 생겼을 때 에러 잡는 코드
        } catch (DataIntegrityViolationException e) {

            // 사용자 지정 에러
            e.printStackTrace();
            bindingResult.reject("signupFailed", "이미 등록된 사용자입니다");

            return "signup_form";

        } catch (Exception e) {

            // 에러가 뭔지 모르겠으니까 e.getMessage() 에러 찍어봐 -> 어차피 회원가입 에러니까 화면 바꾸지말고 signup_form그대로
            // 유지해
            e.printStackTrace();
            bindingResult.reject("signupFailed", e.getMessage());

            return "signup_form";

        }

        return "redirect:/";

    }

    // 로그인을 하게되면 창이 뜨고, 그 이후에 데이터 입력 후 post방식으로 처리를 해야하는데 안함
    // 로그인은 스프링 부트가 해주니까 post방식 메서드가 필요없어서
    // 창만 띄우면 됨

    @GetMapping("/login")
    public String login() {

        return "login_form";
    }

}
