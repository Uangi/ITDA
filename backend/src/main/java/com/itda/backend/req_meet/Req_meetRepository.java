package com.itda.backend.req_meet;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itda.backend.users.Users;

import java.util.List;

public interface Req_meetRepository extends JpaRepository<Req_meet, Long> {
    List<Req_meet> findBysenderUserId(String senderUserId);

    List<Req_meet> findByrecipientUserId(String recipientUserId);

    Req_meet findBySenderUserIdAndRecipientUserId(String senderUserId, String recipientUserId);

    List<Meet_schedule> findBySenderAndRecipient(String sender, String recipient);

    Meet_schedule save(Meet_schedule meetSchedule);

    Meet_schedule findByRecipient(Users recipient);

}
