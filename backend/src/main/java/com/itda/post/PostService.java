package com.itda.post;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Transactional
    public Post save(Post post) { // 게시물 저장 메서드
        return postRepository.save(post); // 받은 게시물을 db에 저장하고 저장된 게시물 반환
    }

    @Transactional(readOnly = true)
    public List<Post> findAll() { // 모든 게시물 조회
        return postRepository.findAll();
    }
}