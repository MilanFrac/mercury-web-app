package com.codebrothers.mercury.component;

import com.codebrothers.mercury.controller.AppointmentV2Controller;
import com.codebrothers.mercury.domain.AppointmentV2;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class AppointmentV2ModelAssembler implements RepresentationModelAssembler<AppointmentV2, EntityModel<AppointmentV2>> {


    @Override
    public EntityModel<AppointmentV2> toModel(AppointmentV2 appointment) {

        return EntityModel.of(appointment,
                linkTo(methodOn(AppointmentV2Controller.class).getOne(appointment.getId())).withSelfRel(),
                linkTo(methodOn(AppointmentV2Controller.class).getAll()).withRel("appointmentsV2"));
    }
}
