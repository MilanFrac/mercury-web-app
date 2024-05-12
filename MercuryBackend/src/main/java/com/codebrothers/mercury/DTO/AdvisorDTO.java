package com.codebrothers.mercury.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdvisorDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String companyPhoneNumber;
    private String email;
}
