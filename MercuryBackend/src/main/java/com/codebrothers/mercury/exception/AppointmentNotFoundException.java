package com.codebrothers.mercury.exception;

public class AppointmentNotFoundException extends RuntimeException {

    public AppointmentNotFoundException(Long id) {
        super("Could not find appointment with id: " + id);
    }
}
