package com.itda.board.answer;

import java.security.Principal;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;

import com.itda.board.question.Question;
import com.itda.board.question.QuestionForm;
import com.itda.board.question.QuestionService;
import com.itda.member.SiteUser;
import com.itda.member.UserService;

import lombok.RequiredArgsConstructor;

//url prefix�� �ּ� �������� ��
@RequestMapping("/answer")
@RequiredArgsConstructor
@Controller
public class AnswerController {

	// question�� ������ ã�ƾ��� - �θ� id��ȣ ������ ���ϱ�
	private final QuestionService questionService;
	private final AnswerService answerService;
	private final UserService userService;

	@PreAuthorize("isAuthenticated")
	@PostMapping("/create/{id}")
	public String createAnswer(Model model, @PathVariable("id") Long id, @Valid AnswerForm answerForm,
			BindingResult bindingResult, Principal principal) {

		Question question = questionService.getQuestion(id);
		SiteUser siteUser = userService.getUser(principal.getName());

		if (bindingResult.hasErrors()) {

			model.addAttribute("question", question);

			return "question_detail";
		}

		Answer answer = answerService.create(question, answerForm.getContent(), siteUser);// �亯 �߰��ɰ���

		return String.format("redirect:/question/detail/%s#answer_%s",
				answer.getQuestion().getId(), answer.getId());
		// return "redirect:/question/detail/%s" + id;

	}

	@PreAuthorize("isAuthenticated")
	@GetMapping("/modify/{id}")
	public String answerModify(AnswerForm answerForm, @PathVariable("id") Long id, Principal principal) {

		Answer answer = answerService.getAnswer(id);

		if (!answer.getAuthor().getUserName().equals(principal.getName())) {

			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "���� ������ �����ϴ�");
		}

		answerForm.setContent(answer.getContent());

		return "answer_form";

	}

	@PreAuthorize("isAuthenticated")
	@PostMapping("/modify/{id}")
	public String answerModify(@Valid AnswerForm answerForm, BindingResult bindingResult,
			@PathVariable("id") Long id, Principal principal) {

		if (bindingResult.hasErrors()) {
			return "answer_form";
		}

		Answer answer = answerService.getAnswer(id);

		if (!answer.getAuthor().getUserName().equals(principal.getName())) {

			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "���� ������ �����ϴ�");
		}

		answerService.modify(answer, answerForm.getContent());

		return String.format("redirect:/question/detail/%s#answer_%s", answer.getQuestion().getId(), answer.getId());

	}

	@PreAuthorize("isAuthenticated")
	@GetMapping("/delete/{id}")
	public String answerDelete(@PathVariable("id") Long id, Principal principal) {

		Answer answer = answerService.getAnswer(id);

		if (!answer.getAuthor().getUserName().equals(principal.getName())) {

			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "���� ������ �����ϴ�");
		}

		answerService.delete(answer);

		return String.format("redirect:/question/detail/%s", answer.getQuestion().getId());
	}

	@PreAuthorize("isAuthenticated")
	@GetMapping("/vote/{id}")
	public String answerVote(@PathVariable("id") Long id, Principal principal) {

		Answer answer = answerService.getAnswer(id);

		SiteUser siteUser = userService.getUser(principal.getName());

		answerService.vote(answer, siteUser);

		// %s#answer_%s ��ġ = deatil�� �ݺ��� �ȿ� �ִ� ������ȣ
		// %sù��° = answer.getQuestion().getId()
		// %s�ι�° = answer.getId()
		return String.format("redirect:/question/detail/%s#answer_%s", answer.getQuestion().getId(), answer.getId());
	}

}
