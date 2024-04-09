package com.itda.board.question;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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

import com.itda.board.answer.AnswerForm;
import com.itda.member.SiteUser;
import com.itda.member.UserService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/question")
@RequiredArgsConstructor
@Controller
public class QuestionController {

	// DB ������
	// private final QuestionRepository questionRepository;
	private final QuestionService questionService;
	private final UserService userService;

	@RequestMapping("/list")
	public String list(Model model, @PageableDefault Pageable pageable) {

		// List<Question> lists = questionRepository.findAll();
		Page<Question> paging = questionService.getLists(pageable);

		model.addAttribute("paging", paging);

		return "question_list";
	}

	@RequestMapping("/detail/{id}") // {id} :���� ���� �����ν� ���� ����(=����)

	// ������ �ѷ����ϴϱ� model�;���, @PathVariable : ����� �������� ���Ѵٴ°� �˷������
	// ���̵�� �����ؾ��� ���� id�̸���
	// �װ��� �ڷ����� integer�� id��
	public String detail(Model model, @PathVariable("id") Long id, AnswerForm answerForm) {

		// ȣ���ϱ�
		Question question = questionService.getQuestion(id);

		model.addAttribute("question", question);

		return "question_detail";

	}

	// question���� �ּ� �����, ��������ϱ� ��ư Ŭ���ϸ� get�����
	@PreAuthorize("isAuthenticated")
	@GetMapping("/create")
	public String questionCreate(HttpServletRequest request, QuestionForm questionForm) {

		String ip = request.getRemoteAddr();
		System.out.println(ip);

		return "question_form"; // html�� �̸�
	}

	// �Ѿ���� �Ķ���� subject/content
	// subject, content�����Ͱ� questionForm�� �����µ� spring�� @Valid
	// QuestionForm������ �˻���
	// �״����� �˻��� ������� bindingResult�� �־����
	// ������ ���� �������
	@PreAuthorize("isAuthenticated")
	@PostMapping("/create")
	public String questionCreate(@Valid QuestionForm questionForm, BindingResult bindingResult, Principal principal) {

		// ������ �ִٸ� �ٽ� question_form�� ���ư�
		if (bindingResult.hasErrors()) {
			return "question_form";
		}

		// ����ڸ� �Ѱ��ֱ�����
		SiteUser siteUser = userService.getUser(principal.getName());

		// QuestionForm.java�� getter�� ���� ������ �� �� ����
		questionService.create(questionForm.getSubject(), questionForm.getContent(), siteUser);

		return "redirect:/question/list";
	}

	@PreAuthorize("isAuthenticated")
	@GetMapping("/modify/{id}")
	public String questionModify(QuestionForm questionForm, @PathVariable("id") Long id, Principal principal) {

		Question question = questionService.getQuestion(id);

		if (!question.getAuthor().getUserName().equals(principal.getName())) {

			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "���� ������ �����ϴ�");
		}

		questionForm.setSubject(question.getSubject());
		questionForm.setContent(question.getContent());

		return "question_form";

	}

	@PreAuthorize("isAuthenticated")
	@PostMapping("/modify/{id}")
	public String questionModify(@Valid QuestionForm questionForm, BindingResult bindingResult,
			@PathVariable("id") Long id, Principal principal) {

		if (bindingResult.hasErrors()) {
			return "question_form";
		}

		Question question = questionService.getQuestion(id);

		if (!question.getAuthor().getUserName().equals(principal.getName())) {

			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "���� ������ �����ϴ�");
		}

		questionService.modify(question, questionForm.getSubject(), questionForm.getContent());

		// ���� �Է��� ����â�� detail�� ���̴ϱ�%s
		return String.format("redirect:/question/detail/%s", id);

	}

	@PreAuthorize("isAuthenticated")
	@GetMapping("/delete/{id}")
	public String questionDelete(Principal principal, @PathVariable("id") Long id) {// �α����� ����� �����־���� ����

		Question question = questionService.getQuestion(id);

		if (!question.getAuthor().getUserName().equals(principal.getName())) {

			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "���� ������ �����ϴ�");

		}

		questionService.delete(question);

		return "redirect:/";

	}

	@PreAuthorize("isAuthenticated")
	@GetMapping("/vote/{id}")
	public String questionVote(Principal principal, @PathVariable("id") Long id) {

		Question question = questionService.getQuestion(id);
		SiteUser siteUser = userService.getUser(principal.getName());

		questionService.vote(question, siteUser);

		return String.format("redirect:/question/detail/%s", id);

	}

}
