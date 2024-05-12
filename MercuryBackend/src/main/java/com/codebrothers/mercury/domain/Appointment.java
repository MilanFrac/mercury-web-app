package com.codebrothers.mercury.domain;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "APPOINTMENTS")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id") // used for breaking the circular reference issues
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Appointment implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnoreProperties(value = {"APPOINTMENTS", "hibernateLazyInitializer"}) // Have to be left, otherwise serialization problems
    @JsonManagedReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CLIENT_ID")
    @NonNull private Client client;

    @JsonIgnoreProperties(value = {"APPOINTMENTS", "hibernateLazyInitializer"})
    @JoinColumn(name = "EVENT_ID")
    @OneToOne(fetch = FetchType.LAZY)
    @NonNull private Event event;

    @Column(name = "CREATED_AT_DATE")
    private LocalDateTime createdAtDate;

    @Column(name = "UPDATED_AT_DATE")
    private LocalDateTime updatedAtDate;

    @JsonManagedReference
    @JoinColumn(name = "CREATED_BY")
    @ManyToOne(fetch = FetchType.LAZY)
    private Advisor createdBy;

    @JsonManagedReference
    @JoinColumn(name = "LAST_UPDATED_BY")
    @ManyToOne(fetch = FetchType.LAZY)
    private Advisor lastUpdatedBy;

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;

        if (!(o instanceof Appointment))
            return false;

        return id != null && id.equals(((Appointment) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
