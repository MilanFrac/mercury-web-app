package com.codebrothers.mercury.component;

import com.codebrothers.mercury.controller.AppointmentController;
import com.codebrothers.mercury.domain.Appointment;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class AppointmentModelAssembler implements RepresentationModelAssembler<Appointment, EntityModel<Appointment>> {


    @Override
    public EntityModel<Appointment> toModel(Appointment appointment) {

        return EntityModel.of(appointment,
                linkTo(methodOn(AppointmentController.class).getOne(appointment.getId())).withSelfRel(),
                linkTo(methodOn(AppointmentController.class).getAll()).withRel("appointments"));
    }
}
