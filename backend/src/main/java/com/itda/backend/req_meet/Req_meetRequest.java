package com.itda.backend.req_meet;

import java.util.Date;

import javax.servlet.http.HttpSession;

public class Req_meetRequest {
    private String senderUserId;
    private String recipientUserId;
    private Date meetingDate;
    private String meetingPlace;
    private String meetingTime;

    public Req_meetRequest() {
    }

    public Req_meetRequest(String senderUserId, String recipientUserId, Date meetingDate, String meetingPlace,
            String meetingTime) {
        this.senderUserId = senderUserId;
        this.recipientUserId = recipientUserId;
        this.meetingDate = meetingDate;
        this.meetingPlace = meetingPlace;
        this.meetingTime = meetingTime;
    }

    public String getSenderUserId() {
        return senderUserId;
    }

    public void setSenderUserId(String senderUserId) {
        this.senderUserId = senderUserId;
    }

    public String getRecipientUserId() {
        return recipientUserId;
    }

    public void setRecipientUserId(String recipientUserId) {
        this.recipientUserId = recipientUserId;
    }

    public Date getMeetingDate() {
        return meetingDate;
    }

    public void setMeetingDate(Date meetingDate) {
        this.meetingDate = meetingDate;
    }

    public String getMeetingPlace() {
        return meetingPlace;
    }

    public void setMeetingPlace(String meetingPlace) {
        this.meetingPlace = meetingPlace;
    }

    public String getMeetingTime() {
        return meetingTime;
    }

    public void setMeetingTime(String meetingTime) {
        this.meetingTime = meetingTime;
    }

    public HttpSession getSession() {
        throw new UnsupportedOperationException("Unimplemented method 'getSession'");
    }
}
