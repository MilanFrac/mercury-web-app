package com.codebrothers.mercury.DTO;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class AppointmentFromFormDTO {
    private ClientDTO client;
    private EventDTO event;
    private LocalDateTime createdAtDate;
    private LocalDateTime updatedAtDate;
    private Long advisorId;
}
