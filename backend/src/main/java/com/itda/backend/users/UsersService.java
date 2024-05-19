package com.itda.backend.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    public List<Users> findAll() {

        return usersRepository.findAll();

    }

    public Users findByUserName(String loggedInUserName) {

        return usersRepository.findByUserName(loggedInUserName);
    }

    public Users findByUserId(String userId) {

        return usersRepository.findByUserId(userId);
    }

    public Optional<Users> findByUserNo(Long userNo) {

        return usersRepository.findByUserNo(userNo);
    }

    @Transactional
    public Users save(Users users){
        
        return usersRepository.save(users);
    }

}
