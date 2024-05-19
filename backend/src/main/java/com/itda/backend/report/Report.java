package com.itda.backend.report;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.SequenceGenerator;

import com.itda.backend.board.Board;
import com.itda.backend.users.Users;

import lombok.Data;

@Entity(name = "Report")
@Data
public class Report {

    @Id
    @Column(name = "report_no")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "report_seq")
    @SequenceGenerator(name = "report_seq", sequenceName = "report_seq", allocationSize = 1)
    private Long reportNo;

    @ManyToOne
    private Users reporterUser;

    @Column(name = "post_no")
    private Long postNo;

    @ManyToOne
    private Board boardInfo;

    @Column(nullable = false, name = "reporter_id")
    private String reporterId;

    @ManyToOne
    private Users reportedUser;

    @Column(nullable = false, name = "reported_id")
    private String reportedId;

    @Column
    private String content;

    @Column(name = "report_reason")
    private String reportReason;

    @Column(name = "report_date")
    private LocalDate reportDate;

    @Column
    private String title;

    public Report() {
    }

    public Report(String reporterId, String reportedId, String content, String reportReason) {
        this.reporterId = reporterId;
        this.reportedId = reportedId;
        this.content = content;
        this.reportReason = reportReason;
    }

    @PrePersist
    public void reportDate() {
        this.reportDate = LocalDate.now();
    }

}
