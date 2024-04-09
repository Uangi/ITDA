package com.itda.board.question;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> { // id�� ������ Ÿ�� = Integer

	Question findBySubject(String subject);

	Question findBySubjectAndContent(String subject, String content);

	List<Question> findBySubjectLike(String subject);

	// Pageable �� �׸�ŭ�� ���ϴ� ��
	Page<Question> findAll(Pageable pageable);

}
