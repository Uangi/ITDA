package com.itda.fashion;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

@Service
public class FashionService {
    private static String Fashion_URL = " https://www.hkbs.co.kr/news/articleList.html?sc_section_code=S1N1&view_type=sm";

    @PostConstruct
    public List<Fashion> getFashionDatas() throws IOException {
        List<Fashion> fashionList = new ArrayList<>();
        Document document = Jsoup.connect(Fashion_URL).get();

        Elements contents = document.select("section ul.type2 li");

        for (Element content : contents) {
            Fashion fashion = Fashion.builder()
                    .image(content.select("a img").attr("abs:src")) // 이미지
                    .subject(content.select("h4 a").text()) // 제목
                    .url(content.select("a").attr("abs:href")) // 링크
                    .build();
            fashionList.add(fashion);
        }

        return fashionList;
    }
}
