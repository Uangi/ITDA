package com.itda.fashion;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Service;

@Service
public class FashionService {

    private WebDriver driver;
    private WebElement element;
    private String url;

    public FashionService() {
        // WebDriver 경로 설정
        System.setProperty("webdriver.chrome.driver",
                "C:/ITDA/backend/chromedriver-win64/chromedriver.exe");

        // WebDriver 옵션 설정
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--disable-popup-blocking");

        driver = new ChromeDriver(options);

        url = "https://www.lookpin.co.kr/coordi";
    }

    public void activateBot() {
        try {
            driver.get(url);

            Thread.sleep(2000);

            element = driver.findElement(By.className("sc-gcUDKN.sHabK"));

            element = driver.findElement(
                    By.xpath("/html/div/section/main/div/div[2]/div[2]/section[4]/div[1]/div[1]/a/div/div/img"));
            String image = element.getAttribute("image");

            element = driver
                    .findElement(By.xpath("/html/div/section/main/div/div[2]/div[2]/section[4]/div[1]/div[1]/div/p"));
            String description = element.getText();

            System.out.println("1위 노래는 [" + image + "]입니다.");
            System.out.println("좋아요 수는 [" + description + "]입니다.");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.close();
        }
    }
}
