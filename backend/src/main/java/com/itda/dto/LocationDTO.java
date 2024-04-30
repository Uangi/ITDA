package com.itda.dto;

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

}
