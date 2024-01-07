package com.codebrothers.mercury.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ADDRESSES")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Address {

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

    @OneToOne(mappedBy = "realizationPlace", cascade = CascadeType.ALL, orphanRemoval = true, fetch= FetchType.LAZY)
    private Appointment appointment;
}
