package com.codebrothers.mercury.controller;

import com.codebrothers.mercury.exception.AppointmentV2NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class AppointmentV2NotFoundAdvice {

    @ResponseBody
    @ExceptionHandler(AppointmentV2NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String appointmentV2NotFoundHandler(AppointmentV2NotFoundException ex) {
        return ex.getMessage();
    }
}
