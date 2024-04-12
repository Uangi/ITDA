package com.itda.fashion;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class FashionController {

    @Autowired
    private FashionService fashionService;

    @CrossOrigin
    @GetMapping("/fashion")
    public List<Fashion> getFashionData() throws Exception {

        return fashionService.getFashionDatas();
    }

    @GetMapping
    public String fashion(Model model) throws Exception {
        List<Fashion> fashionList = fashionService.getFashionDatas();
        model.addAttribute("fashion", fashionList);
        return "fashion";
    }
}
