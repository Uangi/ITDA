package com.itda.fashion;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@Entity(name = "Fashion")
public class Fashion {
    // private String url;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence-generator")
    @SequenceGenerator(name = "sequence-generator", sequenceName = "YOUR_SEQUENCE_NAME", allocationSize = 1)
    @Column(name = "id")
    public Long id;

    @Column
    private String image;

    @Column
    private String subject;

    @Builder
    public Fashion(String subject, String image) {
        this.subject = subject;
        this.image = image;
    }
}
