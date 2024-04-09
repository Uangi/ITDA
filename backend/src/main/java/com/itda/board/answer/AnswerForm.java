package com.itda.board.answer;

import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerForm {

	@NotEmpty(message = "������ �ʼ� �׸��Դϴ�.")
	private String content;

}
