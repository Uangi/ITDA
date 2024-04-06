package com.itda.weather;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import lombok.Data;

@Data
@Entity(name = "Weather")

public class Weather {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence-generator")
    @SequenceGenerator(name = "sequence-generator", sequenceName = "YOUR_SEQUENCE_NAME", allocationSize = 1)
    @Column(name = "weather_num")
    public Long weather_num;

    @Column(name = "nowtemp")
    public String nowtemp;

    @Column(name = "hightemp")
    public String hightemp; // temp_max 본래 값 이름

    @Column(name = "lowtemp")
    public String lowtemp;

}
