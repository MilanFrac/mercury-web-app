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
public class EventDTO {
    private String title;
    private String description;
    private Instant realizationStartDate;
    private Instant realizationEndDate;
    private AddressDTO realizationPlace;
    private String serviceType;
}
