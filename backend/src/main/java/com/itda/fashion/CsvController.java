package com.itda.fashion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CsvController {

    private final String filePath;
    private CsvToDatabaseService csvToDatabaseService;

    public CsvController(@Value("${fashion.filePath}") String filePath, CsvToDatabaseService csvToDatabaseService) {
        this.filePath = filePath;
        this.csvToDatabaseService = csvToDatabaseService;
    }

    @GetMapping("/csvToDatabase")
    public String csvToDatabase() {
        try {
            csvToDatabaseService.saveCsvDataToDatabase(filePath);
            return "CSV 파일을 DB 저장하는데 성공";
        } catch (IOException e) {
            e.printStackTrace();
            return "CSV 파일을 DB 저장하는데 실패";
        }
    }
}