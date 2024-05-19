package com.itda.backend.report;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itda.backend.board.Board;
import com.itda.backend.board.BoardRepository;
import com.itda.backend.users.Users;
import com.itda.backend.users.UsersRepository;

@Service
public class ReportService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private BoardRepository boardRepository;

    public Users findByUserId(String reporterId) {
        return usersRepository.findByUserId(reporterId);
    }

    public Board findByPostNo(Long postNo) {
        System.out.println(postNo);
        return boardRepository.findByPostNo(postNo);
    }

    public Report findByReporterIdAndPostNo(String reporterId, Long boardNo) {
        return reportRepository.findByReporterIdAndPostNo(reporterId, boardNo);
    }

    public Report reportHandle(String reporterId, String reportedId, String title, String content, String reportReason,
            LocalDate reportDate, Long postNo, Board boardInfo) {

        Users existingReporterUser = usersRepository.findByUserId(reporterId);
        Users existingReportedUser = usersRepository.findByUserId(reportedId);

        if (existingReporterUser == null) {
            throw new IllegalArgumentException("존재하지 않는 신고자의 아이디입니다.");
        }

        if (existingReportedUser == null) {
            throw new IllegalArgumentException("존재하지 않는 피신고자의 아이디입니다.");
        }

        Report reportInfo = new Report();
        reportInfo.setReporterUser(existingReporterUser);
        reportInfo.setReportedUser(existingReportedUser);
        reportInfo.setReporterId(reporterId);
        reportInfo.setReportedId(reportedId);
        reportInfo.setTitle(title);
        reportInfo.setContent(content);
        reportInfo.setReportReason(reportReason);
        reportInfo.setReportDate(reportDate);
        reportInfo.setPostNo(postNo);
        reportInfo.setBoardInfo(boardInfo);

        Report saveReport = reportRepository.save(reportInfo);

        Board reportedBoard = boardRepository.findByPostNo(postNo);

        if (reportedBoard != null) {
            reportedBoard.setReportCount(reportedBoard.getReportCount() + 1);
            boardRepository.save(reportedBoard);
        } else {
            throw new IllegalArgumentException("게시물이 존재하지 않습니다.");
        }

        return saveReport;
    }

}
