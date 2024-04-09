package com.itda.member;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

//회원가입 폼	- 회원가입 관련 예외처리에 대한 설정이야
@Getter
@Setter
public class UserCreateForm {

    @Size(min = 3, max = 25) // 3에서 25 사이 입력해
    @NotEmpty(message = "사용자 이름은 필수 항목입니다.")
    // NotEmpty - 빈 값은 안돼
    private String userName; // 중복값 x - 키 값처럼 쓸거임

    @NotEmpty(message = "비밀번호는 필수 항목입니다.")
    private String password1;

    @NotEmpty(message = "비밀번호 확인은 필수 항목입니다.")
    private String password2;

    @NotEmpty(message = "이메일은 필수 항목입니다.")
    @Email // 애는 초반에 Dependencies 알지 의존성 미리 설치하는거
    // spring boot validation starter 이걸 추가해야 쓸 수 있어
    // 즉 이메일 입력란에 @가 들어가지 않았다면 배제시키는건데 구글링해보니 @NotNull도 써야 완벽하다고하네.
    private String email;

}
