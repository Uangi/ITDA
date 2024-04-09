package com.itda.board.answer;

import java.time.LocalDateTime;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import com.itda.board.question.Question;
import com.itda.member.SiteUser;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Answer {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence-generator")
	@SequenceGenerator(name = "sequence-generator", sequenceName = "YOUR_SEQUENCE_NAME", allocationSize = 1)
	private long id;

	@Column(columnDefinition = "TEXT")
	private String content;

	private LocalDateTime createdData;

	@ManyToOne // 1:n(���) ����
	private Question question; // ������ id�� ������

	@ManyToOne
	private SiteUser author;

	private LocalDateTime modifyDate;

	@ManyToMany
	Set<SiteUser> voter;

}

/*
 * 
 * ��ƼƼ(= ������ ��)�� �����ͺ��̽� ���̺��� ���εǴ� �ڹ��� Ŭ����
 * 
 * �Ӽ��� :
 * id : �亯�� ������ȣ
 * question : ������ �Ӽ�
 * content : �亯�� ����
 * create_date : �亯�� �ۼ��� �Ͻ�
 * 
 */