package com.codebrothers.mercury.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "EVENTS")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Event implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "TITLE")
    @NonNull private String title;

    @Column(name = "DESCRIPTION")
    @NonNull private String description;

    @Column(name = "REALIZATION_DATE")
    @NonNull private LocalDateTime realizationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ADDRESS_ID")
    @JsonIgnoreProperties(value = {"EVENTS", "hibernateLazyInitializer"})
    @NonNull private Address realizationPlace;

    @Column(name = "SERVICE_TYPE")
    @NonNull private String serviceType;

}
