package com.itda.backend.report;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itda.backend.users.Users;

public interface ReportRepository extends JpaRepository<Report, Long> {

    Report findByReporterId(Users reforterId);

    Report findByReporterIdAndPostNo(String reporterId, Long postNo);
}
