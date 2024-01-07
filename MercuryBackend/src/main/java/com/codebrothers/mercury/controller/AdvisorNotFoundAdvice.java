package com.codebrothers.mercury.controller;

import com.codebrothers.mercury.exception.AdvisorNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class AdvisorNotFoundAdvice {

        @ResponseBody
        @ExceptionHandler(AdvisorNotFoundException.class)
        @ResponseStatus(HttpStatus.NOT_FOUND)
        String advisorNotFoundHandler(AdvisorNotFoundException ex) {
            return ex.getMessage();
        }

}
