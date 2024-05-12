package com.codebrothers.mercury.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDTO {
    private Long id;
    private Long clientId;
    private Long eventId;
    private LocalDateTime createdAtDate;
    private LocalDateTime updatedAtDate;
    private Long createdByAdvisorId;
    private Long lastUpdatedByAdvisorId;
}
