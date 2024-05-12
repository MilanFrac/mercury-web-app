package com.codebrothers.mercury.controller;

import com.codebrothers.mercury.component.EventModelAssembler;
import com.codebrothers.mercury.domain.Event;
import com.codebrothers.mercury.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/api/v1/events")
public class EventController {

    private final EventService eventService;
    private final EventModelAssembler assembler;

    @Autowired
    public EventController(EventService eventService, EventModelAssembler assembler) {
        this.eventService = eventService;
        this.assembler = assembler;
    }

    @GetMapping("/{id}")
    public EntityModel<Event> getOne(@PathVariable Long id) {

        Event event = eventService.findEventById(id);
        return assembler.toModel(event);
    }

    @GetMapping
    public CollectionModel<EntityModel<Event>> getAll() {

        List<EntityModel<Event>> events = eventService.findAllEvents().stream()
                .map(assembler::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(events, linkTo(methodOn(EventController.class).getAll()).withSelfRel());
    }

}
