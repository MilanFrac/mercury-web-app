package com.codebrothers.mercury.controller;

import com.codebrothers.mercury.component.AppointmentModelAssembler;
import com.codebrothers.mercury.domain.Address;
import com.codebrothers.mercury.domain.Appointment;
import com.codebrothers.mercury.exception.AppointmentNotFoundException;
import com.codebrothers.mercury.repository.IAppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

//@CrossOrigin(
//        origins = "http://localhost:5173",
//        methods = {
//                RequestMethod.GET,
//                RequestMethod.PUT,
//                RequestMethod.DELETE,
//                RequestMethod.POST
//        })
@RestController
@RequestMapping("/api")
public class AppointmentController {

    @Autowired
    private IAppointmentRepository appointmentRepository;

    private final AppointmentModelAssembler assembler;

    AppointmentController(IAppointmentRepository appointmentRepository, AppointmentModelAssembler assembler) {
        this.appointmentRepository = appointmentRepository;
        this.assembler = assembler;
    }

    @GetMapping("/appointments")
    public CollectionModel<EntityModel<Appointment>> getAll() {

        List<EntityModel<Appointment>> appointments = appointmentRepository.findAll().stream()
                .map(assembler::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(appointments, linkTo(methodOn(AppointmentController.class).getAll()).withSelfRel());
    }

    @GetMapping("/appointments/{id}")
    public EntityModel<Appointment> getOne(@PathVariable Long id) {

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow( () -> new AppointmentNotFoundException(id));

        return assembler.toModel(appointment);
    }

    // TODO: customize it to handle creation of Appointment and all related Entities by single POST of the form
    @PostMapping("/appointments")
    public ResponseEntity<?> addAppointment(@RequestBody Appointment newAppointment) {

        EntityModel<Appointment> entityModel = assembler.toModel(appointmentRepository.save(newAppointment));

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }

    // TODO: rewrite this to handle assigning Advisors, LastUpdatedBy, CreatedBy in Appointments by single REST API call
    @PutMapping("/appointments/{id}")
    public ResponseEntity<?> updateAppointment(@RequestBody Appointment newAppointment, @PathVariable Long id) {

        // TODO: make it smarter
        Appointment updatedAppointment = appointmentRepository.findById(id)
                .map( appointment -> {
                    // TODO: preconfigure and set all neccessary metadata on frontend
                    appointment.setClient(newAppointment.getClient()); // Received from specific form section
                    appointment.setAdvisors(newAppointment.getAdvisors()); // Chosen from multiselect list of Advisors
                    appointment.setUpdatedAtDate(LocalDateTime.now()); // Better to get the time from backend?? TODO: discuss it
                    appointment.setLastUpdatedBy(newAppointment.getLastUpdatedBy()); // Received from frontend based on Id of logged in Advisor
                    appointment.setCreatedAtDate(newAppointment.getCreatedAtDate()); // Already set, but can be updated ?? I don't think so... TODO: discuss if should be removed
                    appointment.setCreatedBy(newAppointment.getCreatedBy()); // Already set, but can be updated ?? I don't think so... TODO: discuss if should be removed
                    appointment.setRealizationDate(newAppointment.getRealizationDate()); // Received from frontend form
                    appointment.setRealizationPlace(newAppointment.getRealizationPlace()); // Received from specific form section

                    return appointmentRepository.save(appointment);
                })
                .orElseGet( () -> {
                    newAppointment.setId(id);
                    return appointmentRepository.save(newAppointment);
                });

        EntityModel<Appointment> entityModel = assembler.toModel(updatedAppointment);

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }

    @DeleteMapping("/appointments/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable Long id) {

        appointmentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
