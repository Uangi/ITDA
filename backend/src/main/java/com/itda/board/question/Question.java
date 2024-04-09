package com.itda.board.question;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import com.itda.board.answer.Answer;
import com.itda.member.SiteUser;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity // JPA�� ��ƼƼ�� �ν�
public class Question {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence-generator")
	@SequenceGenerator(name = "sequence-generator", sequenceName = "YOUR_SEQUENCE_NAME", allocationSize = 1)
	private Long id;

	@Column(length = 200) // 200�ڱ��� ������
	private String subject;

	@Column(columnDefinition = "TEXT")
	private String content; // content�� text�� �� �� ����

	private LocalDateTime createdData; // ������ create`d`�� �� ����� ��

	// mappedBy = "question" : ����Ű, ������ �����Ǹ� ��۵� ������
	// fetch = �����͸� db���� �о���°�
	@OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)

	private List<Answer> answerList; // ����� �����ϱ� list�� ���

	@ManyToOne
	private SiteUser author;

	private LocalDateTime modifyDate;

	// set : �ߺ��� ��� x (�� ����� ������ ���� �� ����)
	// siteUser�� ���� ������ �����ϰ� �־�� ��
	@ManyToMany
	Set<SiteUser> voter;

}

/*
 * 
 * ��ƼƼ(= ������ ��)�� �����ͺ��̽� ���̺��� ���εǴ� �ڹ��� Ŭ����
 * 
 * �Ӽ��� :
 * id : ������ ������ȣ
 * subject : ���� ����
 * content : ���� ����
 * create_date : ������ �ۼ��� �Ͻ�
 * 
 */