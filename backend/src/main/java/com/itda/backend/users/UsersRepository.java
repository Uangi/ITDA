package com.itda.backend.users;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {
    Users findByUserId(String userId);

    Users findByUserName(String userName);

    Optional<Users> findByUserNo(Long userNo);

}
