package com.codebrothers.mercury.domain;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "ADVISORS")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Advisor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "FIRST_NAME")
    private String firstName;

    @Column(name = "LAST_NAME")
    private String lastName;

    @NaturalId
    @NonNull
    @Column(name = "COMPANY_PHONE_NUMBER")
    private String companyPhoneNumber;

    @Column(name = "EMAIL")
    private String email;

    /*
    @ManyToMany(
            cascade = {CascadeType.PERSIST, CascadeType.MERGE}
    )
    @JoinTable(
            name = "ADVISORS_APPOINTMENTS",
            joinColumns = @JoinColumn(name = "ADVISOR_ID"),
            inverseJoinColumns = @JoinColumn(name = "APPOINTMENT_ID")
    )
    */
    @JsonBackReference
    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Appointment> createdAppointments = new LinkedHashSet<>();

    @JsonBackReference
    @OneToMany(mappedBy = "lastUpdatedBy", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Appointment> updatedAppointments = new HashSet<>();

    public void addAppointment(Appointment appointment) {
        this.createdAppointments.add(appointment);
        appointment.setCreatedBy(this);
    }

    public void removeAppointment(Appointment appointment) {
        this.createdAppointments.remove(appointment);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;

        if (!(o instanceof Advisor))
            return false;

        Advisor advisor = (Advisor) o;
        return Objects.equals(companyPhoneNumber, advisor.companyPhoneNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(companyPhoneNumber);
    }
}

