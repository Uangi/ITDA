package com.itda.backend.users;

import org.springframework.web.multipart.MultipartFile;

import com.itda.backend.location.Location;

import lombok.Data;

@Data
public class CreateUserRequest {
    private Users users;
    private Location location;
    private MultipartFile uploadFile;

    public CreateUserRequest() {
    }

    public CreateUserRequest(Users users, Location location, MultipartFile uploadFile) {
        this.users = users;
        this.location = location;
        this.uploadFile = uploadFile;
    }

}
