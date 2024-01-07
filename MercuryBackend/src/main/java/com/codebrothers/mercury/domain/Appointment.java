package com.codebrothers.mercury.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "APPOINTMENTS")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "CLIENT_ID")
    @NonNull private Client client;

    @Column(name = "REALIZATION_DATE")
    @NonNull private LocalDateTime realizationDate;

    @JoinColumn(name = "ADDRESS_ID")
    @OneToOne(fetch = FetchType.LAZY)
    @NonNull private Address realizationPlace;

    @Column(name = "CREATED_AT_DATE")
    private LocalDateTime createdAtDate;

    @Column(name = "UPDATED_AT_DATE")
    private LocalDateTime updatedAtDate;

    @JoinColumn(name = "CREATED_BY")
    @OneToOne(fetch = FetchType.LAZY)
    private Advisor createdBy;

    @JoinColumn(name = "LAST_UPDATED_BY")
    @OneToOne(fetch = FetchType.LAZY)
    private Advisor lastUpdatedBy;

//    @ManyToMany(mappedBy = "ADVISORS")
    @ManyToMany(mappedBy = "appointments")
    private Set<Advisor> advisors = new HashSet<>();
}
