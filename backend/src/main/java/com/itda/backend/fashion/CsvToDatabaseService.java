package com.itda.backend.fashion;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

@Service
public class CsvToDatabaseService {

    @Value("${fashionPath}")
    private final String fashionPath;
    private final FashionRepository fashionRepository;

    public CsvToDatabaseService(@Value("${fashionPath}") String fashionPath, FashionRepository fashionRepository) {
        this.fashionPath = fashionPath;
        this.fashionRepository = fashionRepository;
    }

    public void saveCsvDataToDatabase(String fashionPath) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(fashionPath));
        String line;
        while ((line = reader.readLine()) != null) {
            // CSV 데이터를 파싱하여 데이터베이스에 저장
            String[] parts = line.split(","); // CSV 파일 쉼표로 구분
    
            // 첫 번째 열이 "Image"이고 두 번째 열이 null이 아닌 경우에만 데이터를 저장
            if (!parts[0].equalsIgnoreCase("\"Image\"") && !parts[1].equalsIgnoreCase("\"Description\"") && parts.length > 1 && parts[1] != null && !parts[1].isEmpty()) {
                Fashion fashion = Fashion.builder()
                        .image(parts[0])
                        .description(parts[1])
                        .build(); // 생성자를 통해 필드 설정
                fashionRepository.save(fashion); // DB 에 저장
            }
        }
        reader.close();
    }
}