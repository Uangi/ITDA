package com.itda.weather;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class WeatherService {

    @Autowired
    private WeatherRepository weatherRepository;

    @Transactional
    public Weather save(Weather weather) { // 게시물 저장 메서드
        return weatherRepository.save(weather); // 받은 게시물을 db에 저장하고 저장된 게시물 반환
    }

    @Transactional(readOnly = true)
    public List<Weather> findAll() { // 모든 게시물 조회
        return weatherRepository.findAll();
    }
}