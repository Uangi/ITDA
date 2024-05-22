package com.itda.backend.fashion;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.opencsv.CSVWriter;

@Service
public class FashionService {

    @Value("${fashionPath}")
    private String fashionPath;
    
    @Value("${fashion.url}")
    private String fashionUrl;

    private final FashionRepository fashionRepository;

    @Autowired
    public FashionService(FashionRepository fashionRepository) {
        this.fashionRepository = fashionRepository;
    }

    @PostConstruct // 웹사이트 주소 때문에 변수에 의존성 주입 후 실행
    public List<Fashion> getFashionDatas() throws IOException {
        List<Fashion> fashionList = new ArrayList<>();
        Document document = Jsoup.connect(fashionUrl).get();
        Elements contents = document.select("ul.style-list li.style-list-item");

        for (int i = 0; i <= 20; i++) { // 데이터 20개 가져오기
            Element element = contents.get(i);
            Fashion fashion = Fashion.builder()
                    .image(element.select("a img").attr("abs:src")) // 이미지
                    .description(element.select("a span ").text()) // 설명
                    .build();
            fashionList.add(fashion);
        }

        writeFashionDataToCSV(fashionList, fashionPath);
        fashionRepository.saveAll(fashionList);
        return fashionList;
    }

    public void writeFashionDataToCSV(List<Fashion> fashionList, @Value("${fashion.filePath}") String fashionPath)
            throws IOException {
        try (CSVWriter writer = new CSVWriter(new FileWriter(fashionPath))) {
            // CSV 파일에 헤더 추가
            String[] header = { "Image", "Description" }; // "Image" 자리에 getImage(), "Description" 자리에 getDescription()
            writer.writeNext(header);

            // 크롤링한 데이터 파일에 저장
            for (Fashion fashion : fashionList) {
                String[] data = { fashion.getImage(), fashion.getDescription() };
                writer.writeNext(data); 
            }
        }
    }

}