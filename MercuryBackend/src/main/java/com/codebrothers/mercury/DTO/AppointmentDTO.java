package com.codebrothers.mercury.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDTO {
    private Long id;
    private Long clientId;
    private Long eventId;
    private Instant createdAtDate;
    private Instant updatedAtDate;
    private Long createdByAdvisorId;
    private Long lastUpdatedByAdvisorId;
}
