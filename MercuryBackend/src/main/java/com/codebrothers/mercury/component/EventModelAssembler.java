package com.codebrothers.mercury.component;

import com.codebrothers.mercury.controller.EventController;
import com.codebrothers.mercury.domain.Event;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class EventModelAssembler implements RepresentationModelAssembler<Event, EntityModel<Event>> {


    @Override
    public EntityModel<Event> toModel(Event event) {

        return EntityModel.of(event,
                linkTo(methodOn(EventController.class).getOne(event.getId())).withSelfRel(),
                linkTo(methodOn(EventController.class).getAll()).withRel("events"));
    }
}