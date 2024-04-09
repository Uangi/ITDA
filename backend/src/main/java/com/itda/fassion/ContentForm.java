package com.itda.fassion;

import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import lombok.Data;

@Data
public class ContentForm {

    private int id;
    private String title;
    private String texts;

    private String writer;
    private String password;

    private String updateDate;

    private MultipartFile attachFile; // 첨부 파일
    private List<MultipartFile> imageFiles; // 첨부 이미지
}
