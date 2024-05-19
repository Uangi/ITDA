package com.itda.backend.req_meet;

import com.itda.backend.users.Users;
import com.itda.backend.users.UsersRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class Req_meetService {

    @Autowired
    private Req_meetRepository req_meetRepository;

    @Autowired
    private UsersRepository usersRepository;

    public Req_meet sendRequest(Users sender, String recipientUserId, Date meetingDate,
            String meetingTime, String meetingPlace) {
        Users existingSender = usersRepository.findByUserId(sender.getUserId());
        Users existingRecipient = usersRepository.findByUserId(recipientUserId);

        if (existingSender == null) {
            throw new IllegalArgumentException("존재하지 않는 보내는 사람의 아이디입니다.");
        }

        if (existingRecipient == null) {
            throw new IllegalArgumentException("존재하지 않는 받는 사람의 아이디입니다.");
        }

        if (existingSender.getDiaQty() < 250) {
            throw new IllegalArgumentException("신청자의 다이아 개수가 부족합니다.");
        }

        Req_meet reqMeet = new Req_meet();
        reqMeet.setSender(sender);
        reqMeet.setSenderUserId(sender.getUserId());
        reqMeet.setRecipient(existingRecipient);
        reqMeet.setMeetingDate(meetingDate);
        reqMeet.setMeetingPlace(meetingPlace);
        reqMeet.setMeetingTime(meetingTime);
        reqMeet.setStatus(RequestStatus.WAITING);

        return req_meetRepository.save(reqMeet);
    }

    public Req_meet respondRequest(Long requestId, boolean accepted) {
        Req_meet request = req_meetRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 요청입니다."));

        if (accepted) {
            request.setStatus(RequestStatus.ACCEPTED);
            request.getSender().decreaseDiaQty(250);
        } else {
            request.setStatus(RequestStatus.REJECTED);
        }

        return req_meetRepository.save(request);
    }

    public List<Req_meet> getRequests() {
        return req_meetRepository.findAll();
    }

    public Req_meet getRequestStatus(String senderUserId, String recipientUserId) {
        return req_meetRepository.findBySenderUserIdAndRecipientUserId(senderUserId, recipientUserId);
    }

    public Meet_schedule meetSchedules(String senderUserId, String recipientUserId) {
        Req_meet meetRequest = (Req_meet) req_meetRepository.findBySenderUserIdAndRecipientUserId(senderUserId,
                recipientUserId);

        if (meetRequest != null)
            meetRequest.setStatus(RequestStatus.ACCEPTED);
        req_meetRepository.save(meetRequest);

        if (meetRequest != null) {
            Meet_schedule meetSchedule = new Meet_schedule();

            meetSchedule.setSender(meetRequest.getSender());
            meetSchedule.setRecipient(meetRequest.getRecipient());
            meetSchedule.setMeetingDate(meetRequest.getMeetingDate());
            meetSchedule.setMeetingTime(meetRequest.getMeetingTime());
            meetSchedule.setMeetingPlace(meetRequest.getMeetingPlace());
            meetSchedule.setStatus(RequestStatus.ACCEPTED);
            meetRequest.getSender().decreaseDiaQty(250);

            return req_meetRepository.save(meetSchedule);
        } else {

            return null;
        }
    }

    public void meetReject(String senderUserId, String recipientUserId) {
        Req_meet meetRequest = (Req_meet) req_meetRepository.findBySenderUserIdAndRecipientUserId(senderUserId,
                recipientUserId);

        if (meetRequest != null) {
            meetRequest.setStatus(RequestStatus.REJECTED);
            req_meetRepository.save(meetRequest);
        }
    }

    public List<Meet_schedule> schedule(String recipient) {
        Users recipientUser = usersRepository.findByUserId(recipient);

        return (List<Meet_schedule>) req_meetRepository.findByRecipient(recipientUser);
    }
}