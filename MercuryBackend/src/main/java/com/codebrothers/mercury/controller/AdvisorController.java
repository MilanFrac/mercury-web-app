package com.codebrothers.mercury.controller;

import com.codebrothers.mercury.component.AdvisorModelAssembler;
import com.codebrothers.mercury.exception.AdvisorNotFoundException;
import com.codebrothers.mercury.domain.Advisor;
import com.codebrothers.mercury.repository.IAdvisorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/api")
public class AdvisorController {

    @Autowired
    private final IAdvisorRepository advisorRepository;

    private final AdvisorModelAssembler assembler;

    AdvisorController(IAdvisorRepository advisorRepository, AdvisorModelAssembler assembler) {
        this.advisorRepository = advisorRepository;
        this.assembler = assembler;
    }
    @GetMapping("/advisors")
    public CollectionModel<EntityModel<Advisor>> getAll() {

        List<EntityModel<Advisor>> advisors = advisorRepository.findAll().stream()
                .map(assembler::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(advisors, linkTo(methodOn(AdvisorController.class).getAll()).withSelfRel());
    }

    @GetMapping("/advisors/{id}")
    public EntityModel<Advisor> getOne(@PathVariable Long id) {

        Advisor advisor = advisorRepository.findById(id)
                .orElseThrow( () -> new AdvisorNotFoundException(id) );

        return assembler.toModel(advisor);
    }

    @PostMapping("/advisors")
    public ResponseEntity<?> addAdvisor ( @RequestBody Advisor advisor ) {

        EntityModel<Advisor> entityModel = assembler.toModel(advisorRepository.save(advisor));

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }

    @PutMapping("/advisors/{id}")
    public ResponseEntity<?> updateAdvisor( @RequestBody Advisor newAdvisor, @PathVariable Long id ) {

        Advisor updatedAdvisor = advisorRepository.findById(id)
                .map(advisor -> {
                    advisor.setFirstName(newAdvisor.getFirstName());
                    advisor.setLastName(newAdvisor.getLastName());
                    advisor.setEmail(newAdvisor.getEmail());
                    advisor.setCompanyPhoneNumber(newAdvisor.getCompanyPhoneNumber());
                    advisor.setAppointments(newAdvisor.getAppointments());

                    return advisorRepository.save(advisor);
                })
                .orElseGet(() -> {
                    newAdvisor.setId(id);
                    return advisorRepository.save(newAdvisor);
                });

        EntityModel<Advisor> entityModel = assembler.toModel(updatedAdvisor);

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }

    @DeleteMapping("/advisors/{id}")
    ResponseEntity<?> deleteAdvisor(@PathVariable Long id) {

        advisorRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
