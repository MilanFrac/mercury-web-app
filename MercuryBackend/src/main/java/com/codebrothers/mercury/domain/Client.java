package com.codebrothers.mercury.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Table(name = "CLIENTS")
public class Client implements Serializable {

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

    @JsonBackReference
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Appointment> appointments = new ArrayList<>();

    public void addAppointment(Appointment appointment) {
        this.appointments.add(appointment);
        appointment.setClient(this);
    }

    public void removeAppointment(Appointment appointment) {
        this.appointments.remove(appointment);
        appointment.setClient(null);
    }
}
