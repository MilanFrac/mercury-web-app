package com.codebrothers.mercury.exception;

public class AppointmentV2NotFoundException extends RuntimeException {

    public AppointmentV2NotFoundException(Long id) {
        super("V2 - Could not find appointment with id: " + id);
    }
}
