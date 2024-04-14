package com.itda.fashion;

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
    private final String filePath;
    private final String fashionUrl;

    public FashionService(@Value("${fashion.url}") String fashionUrl, @Value("${fashion.filePath}") String filePath) {
        this.fashionUrl = fashionUrl;
        this.filePath = filePath;
    }

    @PostConstruct
    public List<Fashion> getFashionDatas() throws IOException {
        List<Fashion> fashionList = new ArrayList<>();
        Document document = Jsoup.connect(fashionUrl).get();
        Elements contents = document.select("ul.style-list li.style-list-item");

        // @@@

        // Elements contents = document.select("MAIL_CSS_QUERY");
        // targetUrl = Fashion_URL
        // connectAndGetDocument = getFashionDatas

        for (Element content : contents) {
            Fashion fashion = Fashion.builder()
                    .image(content.select("a img").attr("abs:src")) // 이미지
                    .subject(content.select("a span ").text()) // 설명
                    .build();
            fashionList.add(fashion);
        }
        writeFashionDataToCSV(fashionList, filePath);
        return fashionList;

    }

    public void writeFashionDataToCSV(List<Fashion> fashionList, String filePath) throws IOException {
        try (CSVWriter writer = new CSVWriter(new FileWriter(filePath))) {
            // CSV 파일에 헤더 추가
            String[] header = { "Image", "Subject" };
            writer.writeNext(header);

            // 패션 데이터를 CSV 파일에 쓰기
            for (Fashion fashion : fashionList) {
                String[] data = { fashion.getImage(), fashion.getSubject() };
                writer.writeNext(data);
            }
        }
    }

}