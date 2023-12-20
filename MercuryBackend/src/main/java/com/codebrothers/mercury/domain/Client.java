package com.codebrothers.mercury.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Table(name = "CLIENTS")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "PHONE_NUMBER")
    @NonNull private String phoneNumber;

    @Column(name = "FIRST_NAME")
    @NonNull private String firstName;

    @Column(name = "LAST_NAME")
    @NonNull private String lastName;

    @Column(name = "EMAIL")
    private String email;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Appointment> appointments;

}

