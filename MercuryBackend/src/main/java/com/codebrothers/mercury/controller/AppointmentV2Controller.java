package com.codebrothers.mercury.controller;

import com.codebrothers.mercury.component.AppointmentV2ModelAssembler;
import com.codebrothers.mercury.domain.AppointmentV2;
import com.codebrothers.mercury.exception.AppointmentV2NotFoundException;
import com.codebrothers.mercury.repository.IAppointmentV2Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
@RequestMapping("/api2")
public class AppointmentV2Controller {

    private final IAppointmentV2Repository appointmentRepository;

    private final AppointmentV2ModelAssembler assembler;

    @Autowired
    AppointmentV2Controller(IAppointmentV2Repository appointmentRepository, AppointmentV2ModelAssembler assembler) {
        this.appointmentRepository = appointmentRepository;
        this.assembler = assembler;
    }

    @GetMapping("/appointmentsv2")
    public CollectionModel<EntityModel<AppointmentV2>> getAll() {

        List<EntityModel<AppointmentV2>> appointments = appointmentRepository.findAll().stream()
                .map(assembler::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(appointments, linkTo(methodOn(AppointmentV2Controller.class).getAll()).withSelfRel());
    }

    @GetMapping("/appointmentsv2/{id}")
    public EntityModel<AppointmentV2> getOne(@PathVariable Long id) {

        AppointmentV2 appointment = appointmentRepository.findById(id)
                .orElseThrow( () -> new AppointmentV2NotFoundException(id));

        return assembler.toModel(appointment);
    }

    // TODO: customize it to handle creation of Appointment and all related Entities by single POST of the form
    @PostMapping("/appointmentsv2")
    public ResponseEntity<?> addAppointment(@RequestBody AppointmentV2 newAppointment) {

        EntityModel<AppointmentV2> entityModel = assembler.toModel(appointmentRepository.save(newAppointment));

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }

    // TODO: rewrite this to handle assigning Advisors, LastUpdatedBy, CreatedBy in Appointments by single REST API call
    @PutMapping("/appointmentsv2/{id}")
    public ResponseEntity<?> updateAppointment(@RequestBody AppointmentV2 newAppointment, @PathVariable Long id) {

        // TODO: make it smarter
        AppointmentV2 updatedAppointment = appointmentRepository.findById(id)
                .map( appointment -> {
                    // TODO: preconfigure and set all neccessary metadata on frontend
                    appointment.setFirstName(newAppointment.getFirstName());
                    appointment.setLastName(newAppointment.getLastName());
                    appointment.setEmail(newAppointment.getEmail());
                    appointment.setPhone(newAppointment.getPhone());
                    appointment.setCity(newAppointment.getCity());
                    appointment.setZipCode(newAppointment.getZipCode());
                    appointment.setStreet(newAppointment.getStreet());
                    appointment.setHouseNumber(newAppointment.getHouseNumber());
                    appointment.setApartmentNumber(newAppointment.getApartmentNumber());
                    appointment.setStartDate(newAppointment.getStartDate());
                    appointment.setEndDate(newAppointment.getEndDate());
                    appointment.setServices(newAppointment.getServices());

                    return appointmentRepository.save(appointment);
                })
                .orElseGet( () -> {
                    newAppointment.setId(id);
                    return appointmentRepository.save(newAppointment);
                });

        EntityModel<AppointmentV2> entityModel = assembler.toModel(updatedAppointment);

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }

    @DeleteMapping("/appointmentsv2/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable Long id) {

        appointmentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
