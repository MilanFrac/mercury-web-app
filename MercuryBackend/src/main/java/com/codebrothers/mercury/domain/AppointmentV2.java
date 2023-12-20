package com.codebrothers.mercury.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "APPOINTMENTSV2")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AppointmentV2 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "FIRST_NAME")
    @NonNull String firstName; // personalData.imie

    @Column(name = "LAST_NAME")
    @NonNull String lastName; // personalData.nazwisko

    @Column(name = "EMAIL")
    String email; // personalData.adresMailowy

    @Column(name = "PHONE")
    @NonNull String phone; // personalData.numerTelefonu

    @Column(name = "CITY")
    @NonNull String city; // personalData.miasto

    @Column(name = "ZIP_CODE")
    @NonNull String zipCode; // personalData.kodPocztowy

    @Column(name = "STREET")
    @NonNull String street; // personalData.ulica

    @Column(name = "HOUSE_NUMBER")
    @NonNull Integer houseNumber; // 0

    @Column(name = "APARTMENT_NUMBER")
    @NonNull Integer apartmentNumber; // 0

    @Column(name = "START_DATE")
    @NonNull String startDate; // selectedDate start

    @Column(name = "END_DATE")
    @NonNull String endDate; // selectedDate end

    // @OneToMany(mappedBy = "services")
//     TODO: use one-to-many approach instead of elementCollection to increase performance (too many sql's)
    @Column(name = "SERVICES")
    @ElementCollection
    @NonNull List<String> services = new ArrayList<String>(); // [ 'example1', 'example2' ]
}
