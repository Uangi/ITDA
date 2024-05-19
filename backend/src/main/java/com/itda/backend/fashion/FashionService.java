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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.opencsv.CSVWriter;

@Service
public class FashionService {

    @Value("${fashionPath}")
    private final String fashionPath;
    
    @Value("${fashion.url}")
    private final String fashionUrl;

    public FashionService(@Value("${fashion.url}") String fashionUrl,
            @Value("${fashionPath}") String fashionPath) {
        this.fashionUrl = fashionUrl;
        this.fashionPath = fashionPath;
    }

    @PostConstruct
    public List<Fashion> getFashionDatas() throws IOException {
        List<Fashion> fashionList = new ArrayList<>();
        Document document = Jsoup.connect(fashionUrl).get();
        Elements contents = document.select("ul.style-list li.style-list-item");

        for (int i = 0; i < 20; i++) { // 데이터 20개 가져오기
            Element element = contents.get(i);
            Fashion fashion = Fashion.builder()
                    .image(element.select("a img").attr("abs:src")) // 이미지
                    .description(element.select("a span ").text()) // 설명
                    .build();
            fashionList.add(fashion);
        }

        writeFashionDataToCSV(fashionList, fashionPath);
        return fashionList;

    }

    public void writeFashionDataToCSV(List<Fashion> fashionList, @Value("${fashion.filePath}") String fashionPath)
            throws IOException {
        try (CSVWriter writer = new CSVWriter(new FileWriter(fashionPath))) {
            // CSV 파일에 헤더 추가
            String[] header = { "Image", "Description" };
            writer.writeNext(header);

            // 패션 데이터를 CSV 파일에 쓰기
            for (Fashion fashion : fashionList) {
                String[] data = { fashion.getImage(), fashion.getDescription() };
                writer.writeNext(data);
            }
        }
    }

}