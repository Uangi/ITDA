package com.itda.backend.report;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.itda.backend.board.Board;
import com.itda.backend.users.Users;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping("/users")
    public Report reportHandle(@RequestBody Report request) {

        String reporterId = request.getReporterId();
        Users reporterUser = reportService.findByUserId(reporterId);

        Long postNo = request.getPostNo();
        Board boardInfo = reportService.findByPostNo(postNo);

        Report existingReport = reportService.findByReporterIdAndPostNo(reporterId, postNo);

        if (existingReport != null) {
            throw new IllegalArgumentException("이미 접수된 신고입니다.");
        }

        if (reporterUser != null) {
            request.setReportDate(LocalDate.now());

            String reportedId = request.getReportedId();
            String title = request.getTitle();
            String content = request.getContent();
            String reportReason = request.getReportReason();

            return reportService.reportHandle(reporterId, reportedId, title, content, reportReason,
                    request.getReportDate(), postNo, boardInfo);
        } else {
            throw new IllegalArgumentException("신고자의 정보를 찾을 수 없습니다.");
        }
    }

    @GetMapping("/getUser")
    public Board getUser(@RequestParam Long postNo) {
        return reportService.findByPostNo(postNo);
    }

}
