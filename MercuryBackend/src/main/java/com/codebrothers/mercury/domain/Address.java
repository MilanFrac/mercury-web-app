package com.codebrothers.mercury.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name = "ADDRESSES")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Address implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "CITY_NAME")
    private String cityName;

    @Column(name = "ZIP_CODE")
    private String zipCode;

    @Column(name = "STREET_NAME")
    private String streetName;

    @Column(name = "HOUSE_NUMBER")
    private Integer houseNumber;

    @Column(name = "APARTMENT_NUMBER")
    private Integer apartmentNumber;
}
