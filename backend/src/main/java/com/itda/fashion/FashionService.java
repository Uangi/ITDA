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
import org.springframework.stereotype.Service;
import com.opencsv.CSVWriter;
import java.io.FileWriter;

@Service
public class FashionService {
    private static String Fashion_URL = "크롤링할 데이터";

    @PostConstruct
    public List<Fashion> getFashionDatas() throws IOException {
        List<Fashion> fashionList = new ArrayList<>();
        Document document = Jsoup.connect(Fashion_URL).get();

        // Elements contents = document.select("section ul.type2 li");

        Elements contents = document.select("ul.style-list li.style-list-item");
        // Elements contents2 = document.select("section ul.style-list
        // style-list--full");

        for (Element content : contents) {
            Fashion fashion = Fashion.builder()
                    .image(content.select("a img").attr("abs:src")) // 이미지
                    // .subject(content.select("h4 a").text())
                    .subject(content.select("a span ").text()) // 설명

                    // .url(content.select("a").attr("abs:href")) // 링크
                    .build();
            fashionList.add(fashion);
        }

        return fashionList;
    }

}
