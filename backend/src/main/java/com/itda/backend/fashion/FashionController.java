package com.itda.backend.fashion;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class FashionController {
    private final FashionRepository fashionRepository;
    private final FashionService fashionService;

    public FashionController(FashionRepository fashionRepository, FashionService fashionService) {
        this.fashionRepository = fashionRepository;
        this.fashionService = fashionService;
    }

    @GetMapping("/fashion")
    public List<Fashion> getFashionDataFromDB() throws Exception {
        getFashionDataFromService();
        return fashionRepository.findAll(); // "fashion"
    }

        public List<Fashion> getFashionDataFromService() throws Exception {
        List<Fashion> fashionList = fashionService.getFashionDatas();
        return fashionList; // 저장된 데이터를 반환
    }
}