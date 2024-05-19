package com.itda.backend.req_meet;

import java.util.Date;

import javax.persistence.CascadeType;
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

import lombok.Data;

@Entity(name = "Req_meet")
@Data
public class Req_meet {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "req_meet_seq")
    @SequenceGenerator(name = "req_meet_seq", sequenceName = "req_meet_seq", allocationSize = 1)
    @Column(name = "no")
    private Long no;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private Users sender;

    @Column(name = "sender_user_id")
    private String senderUserId;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "recipient_user_id", referencedColumnName = "user_id")
    private Users recipient;

    @Column(name = "meeting_date")
    private Date meetingDate;

    @Column(name = "meeting_place")
    private String meetingPlace;

    @Column(name = "meeting_time")
    private String meetingTime;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    public Req_meet() {
    }

    public Req_meet(String senderUserId, Users recipient, Date meetingDate, String meetingPlace,
            RequestStatus status,
            String meetingTime) {
        this.senderUserId = senderUserId;
        this.recipient = recipient;
        this.meetingDate = meetingDate;
        this.meetingPlace = meetingPlace;
        this.status = status;
        this.meetingTime = meetingTime;
    }

}
