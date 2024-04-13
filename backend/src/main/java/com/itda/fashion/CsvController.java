package com.itda.fashion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class CsvController {

    private final String filePath;

    public CsvController(@Value("${fashion.filePath}") String filePath) {
        this.filePath = filePath;
    }

    @Autowired
    private CsvToDatabaseService csvToDatabaseService;

    @GetMapping("/csvToDatabase")
    public String csvToDatabase() {
        try {
            csvToDatabaseService.saveCsvDataToDatabase(filePath);
            return "CSV 파일이 성공적으로 데이터베이스에 저장되었습니다.";
        } catch (IOException e) {
            e.printStackTrace();
            return "CSV 파일을 데이터베이스에 저장하는 동안 오류가 발생했습니다.";
        }
    }
}
