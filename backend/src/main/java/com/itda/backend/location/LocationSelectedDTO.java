package com.itda.backend.location;

import java.util.List;

import lombok.Data;

@Data
public class LocationSelectedDTO {

    private Long id;
    private Long userNo;
    private Long selected;
    private String createdSelectedTime;
    private List<Long> userList;
}
