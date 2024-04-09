package com.itda.board.answer;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.itda.member.DataNotFoundException;
import com.itda.board.question.Question;
import com.itda.member.SiteUser;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AnswerService {

	private final AnswerRepository answerRepository;

	public Answer create(Question question, String content, SiteUser author) {

		Answer ans = new Answer();

		ans.setContent(content); // �θ��� ����
		ans.setCreatedData(LocalDateTime.now());
		ans.setQuestion(question); // �θ��� ����
		ans.setAuthor(author);

		answerRepository.save(ans);

		return ans;
	}

	// ������ �������� ��ȸ
	public Answer getAnswer(Long id) {

		Optional<Answer> answer = answerRepository.findById(id);

		if (answer.isPresent()) {
			return answer.get(); // ������ �����͹�ȯ
		} else {
			throw new DataNotFoundException("�����Ͱ� �����ϴ�.");
		}

	}

	// ����
	public void modify(Answer answer, String content) {

		answer.setContent(content);
		answer.setModifyDate(LocalDateTime.now());

		answerRepository.save(answer);

	}

	// �亯����
	public void delete(Answer answer) {

		answerRepository.delete(answer);

	}

	public void vote(Answer answer, SiteUser siteUser) {

		answer.getVoter().add(siteUser);
		// ���� answer�� siteUser�о�ͼ� ����ֱ�
		answerRepository.save(answer);
	}

}
