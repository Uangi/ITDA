package com.itda.weather;

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
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @CrossOrigin
    @PostMapping("/weat")
    public ResponseEntity<?> save(@RequestBody Weather weather) {
        return new ResponseEntity<>(weatherService.save(weather), HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping("/weat")
    public ResponseEntity<?> findAll() {
        return new ResponseEntity<>(weatherService.findAll(), HttpStatus.OK);
    }
}
