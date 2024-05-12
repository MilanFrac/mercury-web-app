package com.codebrothers.mercury.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddressDTO {
    private String cityName;
    private String zipCode;
    private String streetName;
    private Integer houseNumber;
    private Integer apartmentNumber;
}
