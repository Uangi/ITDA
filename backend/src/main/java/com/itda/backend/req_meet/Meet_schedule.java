package com.itda.backend.req_meet;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import com.itda.backend.users.Users;

@Entity
public class Meet_schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "meet_sched_seq")
    @SequenceGenerator(name = "meet_sched_seq", sequenceName = "meet_sched_seq", allocationSize = 1)
    @Column(name = "no")
    private Long no;

    @ManyToOne
    @JoinColumn(referencedColumnName = "user_id")
    private Users sender;

    @ManyToOne
    @JoinColumn(referencedColumnName = "user_id")
    private Users recipient;

    @Column(name = "meeting_date")
    private Date meetingDate;

    @Column(name = "meeting_time")
    private String meetingTime;

    @Column(name = "meeting_place")
    private String meetingPlace;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    public Meet_schedule() {
    }

    public Meet_schedule(Users sender, Users recipient, Date meetingDate, String meetingTime, String meetingPlace,
            RequestStatus status) {
        this.sender = sender;
        this.recipient = recipient;
        this.meetingDate = meetingDate;
        this.meetingTime = meetingTime;
        this.meetingPlace = meetingPlace;
        this.status = status;
    }

    public Long getNo() {
        return no;
    }

    public void setNo(Long no) {
        this.no = no;
    }

    public Users getSender() {
        return sender;
    }

    public void setSender(Users sender) {
        this.sender = sender;
    }

    public Users getRecipient() {
        return recipient;
    }

    public void setRecipient(Users recipient) {
        this.recipient = recipient;
    }

    public Date getMeetingDate() {
        return meetingDate;
    }

    public void setMeetingDate(Date meetingDate) {
        this.meetingDate = meetingDate;
    }

    public String getMeetingTime() {
        return meetingTime;
    }

    public void setMeetingTime(String meetingTime) {
        this.meetingTime = meetingTime;
    }

    public String getMeetingPlace() {
        return meetingPlace;
    }

    public void setMeetingPlace(String meetingPlace) {
        this.meetingPlace = meetingPlace;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

}
