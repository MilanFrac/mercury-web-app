package com.codebrothers.mercury.exception;

public class AdvisorNotFoundException extends RuntimeException {

    public AdvisorNotFoundException(Long id) {
        super("Could not find advisor " + id);
    }

}
