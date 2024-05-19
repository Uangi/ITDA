package com.itda.backend.req_meet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itda.backend.users.Users;
import com.itda.backend.users.UsersService;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/req_meet")
public class Req_controller {

    @Autowired
    private Req_meetService req_meetService;

    @Autowired
    private UsersService usersService;

    @CrossOrigin
    @PostMapping("/send_request")
    public Req_meet sendRequest(@RequestBody Req_meetRequest request) {

        String senderUserId = request.getSenderUserId();
        Users sender = usersService.findByUserId(senderUserId);

        if (sender != null) {
            String recipientUserId = request.getRecipientUserId();
            Date meetingDate = request.getMeetingDate();
            String meetingTime = request.getMeetingTime();
            String meetingPlace = request.getMeetingPlace();

            return req_meetService.sendRequest(sender, recipientUserId, meetingDate, meetingTime, meetingPlace);
        } else {
            throw new IllegalArgumentException("Invalid senderUserId");
        }
    }

    @CrossOrigin
    @GetMapping("/requests")
    public List<Req_meet> getRequests() {
        return req_meetService.getRequests();
    }

    @CrossOrigin
    @GetMapping("/request_status")
    public Req_meet getStatus(HttpSession session, @RequestParam("recipientUserId") String recipientUserId) {
        String senderUserId = (String) session.getAttribute("userId");
        return req_meetService.getRequestStatus(senderUserId, recipientUserId);
    }

    @CrossOrigin
    @PostMapping("/accept_request")
    public Meet_schedule acceptRequest(@RequestBody Map<String, String> requestData) {
        String senderUserId = requestData.get("senderUserId");
        String recipientUserId = requestData.get("recipientUserId");

        return req_meetService.meetSchedules(senderUserId, recipientUserId);
    }

    @CrossOrigin
    @PostMapping("/reject_request")
    public void rejectRequest(@RequestBody Map<String, String> requestData) {
        String senderUserId = requestData.get("senderUserId");
        String recipientUserId = requestData.get("recipientUserId");

        req_meetService.meetReject(senderUserId, recipientUserId);
    }

    @CrossOrigin
    @GetMapping("/schedule")
    public List<Meet_schedule> schedule(HttpSession session) {
        String recipient = (String) session.getAttribute("userId");
        return req_meetService.schedule(recipient);
    }

}
