package com.itda.backend.location;

import lombok.Data;

@Data
public class LocationDTO {

    private Long userNo;
    private String ADDRESS;
    private String ADJUSTED_LAT;
    private String ADJUSTED_LNG;
    private String CREATED_LOCATION_TIME;
    private String LAT;
    private String LNG;
    private String distance;

    private String user_id;
    private String user_Name;
    private String user_Age;
    private String user_Address;
    private String user_Hobby;
    private String user_Profile;
    private String user_MBTI;

}
