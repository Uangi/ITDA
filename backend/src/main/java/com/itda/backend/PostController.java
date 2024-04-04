package com.itda.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;


@RestController 
public class PostController { 
 
	@Autowired 
	private PostService postService; 
	 
	@CrossOrigin 
	@PostMapping("/post") 
	public ResponseEntity<?> save(@RequestBody Post post) { 
		return new ResponseEntity<>(postService.save(post), HttpStatus.CREATED); 
	} 
	 
	@CrossOrigin 
	@GetMapping("/post") 
	public ResponseEntity<?> findAll() { 
		return new ResponseEntity<>(postService.findAll(), HttpStatus.OK); 
	} 
}