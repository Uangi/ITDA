package com.itda.weather;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import lombok.Data;

@Data
@Entity(name = "weather")
public class Weather {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence-generator")
    @SequenceGenerator(name = "sequence-generator", sequenceName = "YOUR_SEQUENCE_NAME", allocationSize = 1)
    private int weather_num;

    @Column(name = "nowtemp")
    private long temp;

    @Column(name = "hightemp")
    private long temp_max;

    @Column(name = "lowtemp")
    private long temp_min;

}
