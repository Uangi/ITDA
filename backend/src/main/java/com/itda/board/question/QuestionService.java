package com.itda.board.question;

import java.time.LocalDateTime;
import java.util.ArrayList;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.itda.member.DataNotFoundException;
import com.itda.member.SiteUser;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class QuestionService {

	private final QuestionRepository questionRepository;

	public Page<Question> getLists(Pageable pageable) {

		List<Sort.Order> sorts = new ArrayList<Sort.Order>();
		sorts.add(Sort.Order.desc("createdData")); // ��¥�� desc ū -> ��

		// Sort.by(sorts) : ��� ����
		pageable = PageRequest.of(
				pageable.getPageNumber() <= 0 ? 0 : pageable.getPageNumber() - 1, pageable.getPageSize(),
				Sort.by(sorts));

		return questionRepository.findAll(pageable);
	}

	public Question getQuestion(Long id) {

		Optional<Question> op = questionRepository.findById(id);

		if (op.isPresent()) {
			return op.get();
		} else {
			throw new DataNotFoundException("�����Ͱ� �����!");
		}
	}

	// ����(question)�� �����͸� �Է��ϴ� �ڵ�
	public void create(String subject, String content, SiteUser author) {

		Question question = new Question();

		question.setSubject(subject);
		question.setContent(content);
		question.setCreatedData(LocalDateTime.now());
		question.setAuthor(author);

		questionRepository.save(question);

	}

	// ����
	// questionRepository�� save = ������ �����ϱ� ���� �ȸ�����൵ ��
	public void modify(Question question, String subject, String content) {

		question.setSubject(subject);
		question.setContent(content);
		question.setModifyDate(LocalDateTime.now());

		questionRepository.save(question);

	}

	// ����
	public void delete(Question question) {

		questionRepository.delete(question);

	}

	// ��õ��
	public void vote(Question question, SiteUser siteUser) {

		// question�� ����ڿ� ���� ���� �����ϰ�
		// ����
		question.getVoter().add(siteUser);
		questionRepository.save(question);
	}

}
