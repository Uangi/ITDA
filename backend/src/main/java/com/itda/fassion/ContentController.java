// package com.itda.fassion;

// import org.springframework.core.io.UrlResource;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.ResponseBody;

// import lombok.Setter;

// @Setter
// public class ContentController {

// @PostMapping("/content/write")
// public String writeContent(ContentForm form) throws IOException {
// Content content = new Content();
// content.setTitle(form.getTitle());
// content.setWriter(form.getWriter());
// content.setTexts(form.getTexts());

// LocalDateTime NowTime = LocalDateTime.now();
// String formatDate = NowTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd
// HH:mm:ss"));
// content.setUpdateDate(formatDate);

// // 첨부파일, 이미지들 처리하는 부분
// UploadFile attachFile = fileStore.storeFile(form.getAttachFile());
// List<UploadFile> imageFiles = fileStore.storeFiles(form.getImageFiles());
// content.setAttachFile(attachFile);
// content.setImageFiles(imageFiles);

// contentService.writeContent(content);

// return "redirect:/basic-board";
// }

// @ResponseBody
// @GetMapping("/images/{filename}")
// public Resource showImage(@PathVariable String filename) throws
// MalformedURLException {
// return new UrlResource("file:" + fileStore.getFullPath(filename));
// }
// }
