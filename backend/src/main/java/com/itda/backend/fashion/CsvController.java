package com.itda.backend.fashion;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class CsvController {

    @Value("${fashionPath}")
    private String fashionPath;

    private CsvToDatabaseService csvToDatabaseService; // final 추가하기

    public CsvController(@Value("${fashionPath}") String fashionPath, CsvToDatabaseService csvToDatabaseService) {
        this.fashionPath = fashionPath;
        this.csvToDatabaseService = csvToDatabaseService;
    }

    @CrossOrigin
    @GetMapping("/csvToDatabase")
    public String csvToDatabase() {
        try {
            csvToDatabaseService.saveCsvDataToDatabase(fashionPath);
            return "CSV 파일을 DB 저장하는데 성공";
        } catch (IOException e) {
            e.printStackTrace();
            return "CSV 파일을 DB 저장하는데 실패";
        }
    }
}