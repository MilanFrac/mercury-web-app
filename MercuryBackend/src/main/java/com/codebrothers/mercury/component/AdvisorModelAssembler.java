package com.codebrothers.mercury.component;

import com.codebrothers.mercury.controller.AdvisorController;
import com.codebrothers.mercury.domain.Advisor;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class AdvisorModelAssembler implements RepresentationModelAssembler<Advisor, EntityModel<Advisor>> {

    @Override
    public EntityModel<Advisor> toModel(Advisor advisor) {

        return EntityModel.of(advisor,
                linkTo(methodOn(AdvisorController.class).getOne(advisor.getId())).withSelfRel(),
                linkTo(methodOn(AdvisorController.class).getAll()).withRel("advisors"));
    }
}
