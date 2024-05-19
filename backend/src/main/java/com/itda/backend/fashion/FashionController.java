package com.itda.backend.fashion;

import java.util.List;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    @CrossOrigin
    @GetMapping("/fashion")
    public List<Fashion> getFashionDataFromDB() {
        
        return fashionRepository.findAll();
    }

    @CrossOrigin
    @GetMapping
    public String fashion(Model model) throws Exception {
        List<Fashion> fashionList = fashionService.getFashionDatas();
        model.addAttribute("fashion", fashionList);
        return "fashion";
    }
}