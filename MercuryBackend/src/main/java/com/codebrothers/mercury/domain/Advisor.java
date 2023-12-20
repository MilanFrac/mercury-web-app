package com.codebrothers.mercury.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ADVISORS")
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Advisor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // @Column(name = "ADVISOR_ID")
    private long id;

    @Column(name = "FIRST_NAME")
    private String firstName;

    @Column(name = "LAST_NAME")
    private String lastName;

    @NonNull
    @Column(name = "COMPANY_PHONE_NUMBER")
    private String companyPhoneNumber;

    @Column(name = "EMAIL")
    private String email;

    @ManyToMany(
            cascade = {CascadeType.MERGE, CascadeType.PERSIST}
    )
    @JoinTable(
            name = "ADVISORS_APPOINTMENTS",
            joinColumns = @JoinColumn(name = "ADVISOR_ID"),
            inverseJoinColumns = @JoinColumn(name = "APPOINTMENT_ID")
    )
    private Set<Appointment> appointments = new HashSet<>();

    public void addAppointment(Appointment appointment) {
        this.appointments.add(appointment);
        appointment.getAdvisors().add(this);
    }

    public void removeAppointment(Appointment appointment) {
        this.appointments.remove(appointment);
        appointment.getAdvisors().remove(this);
    }
}

