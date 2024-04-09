package com.itda.board.question;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionForm {

	@NotEmpty(message = "������ �ʼ��׸��Դϴ�.")
	@Size(max = 200)
	private String subject;

	@NotEmpty(message = "������ �ʼ��׸��Դϴ�.")
	private String content;

}
