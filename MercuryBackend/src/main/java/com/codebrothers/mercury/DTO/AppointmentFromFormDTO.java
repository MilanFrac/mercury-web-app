package com.codebrothers.mercury.DTO;

import lombok.Getter;

import java.time.Instant;

@Getter
public class AppointmentFromFormDTO {
    private ClientDTO client;
    private EventDTO event;
    private Instant createdAtDate;
    private Instant updatedAtDate;
    private Long advisorId;
}
