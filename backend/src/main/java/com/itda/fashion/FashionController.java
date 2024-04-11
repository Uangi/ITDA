package com.itda.fashion;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FashionController {

    @Autowired
    private FashionService fashionService;

    @GetMapping("/fashion")
    public String fashion(Model model) throws Exception {
        List<Fashion> fashionList = fashionService.getFashionDatas();
        model.addAttribute("fashion", fashionList);

        return "fashion";
    }
}
