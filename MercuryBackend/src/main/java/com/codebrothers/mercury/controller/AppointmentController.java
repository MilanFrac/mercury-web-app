package com.codebrothers.mercury.controller;

import com.codebrothers.mercury.DTO.AppointmentFromFormDTO;
import com.codebrothers.mercury.component.AppointmentMapper;
import com.codebrothers.mercury.component.AppointmentModelAssembler;
import com.codebrothers.mercury.domain.*;
import com.codebrothers.mercury.repository.IAppointmentRepository;
import com.codebrothers.mercury.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/api/v1/appointments")
public class AppointmentController {

    Logger logger = LoggerFactory.getLogger(AppointmentController.class);

    private final IAppointmentRepository appointmentRepository;
    private final AppointmentModelAssembler assembler;
    private final AppointmentMapper appointmentMapper;
    private final AppointmentService appointmentService;

    /**
     * AppointmentController constructor.
     *
     * @param appointmentRepository IAppointmentRepository
     * @param assembler AppointmentModelAssembler
     * @param appointmentMapper AppointmentMapper
     * @param appointmentService AppointmentService
     */
    @Autowired
    AppointmentController(
            IAppointmentRepository appointmentRepository,
            AppointmentModelAssembler assembler,
            AppointmentMapper appointmentMapper,
            AppointmentService appointmentService
    ) {
        this.appointmentRepository = appointmentRepository;
        this.assembler = assembler;
        this.appointmentMapper = appointmentMapper;
        this.appointmentService = appointmentService;
    }

    /**
     * GET method for retrieving all Appointments from the database.
     *
     * @return CollectionModel<EntityModel<Appointment>>
     */
    @GetMapping
    public CollectionModel<EntityModel<Appointment>> getAll() {

        List<EntityModel<Appointment>> appointments = appointmentService.findAllAppointments().stream()
                .map(assembler::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(appointments, linkTo(methodOn(AppointmentController.class).getAll()).withSelfRel());
    }

    /**
     * GET method for retrieving one specific Appointment from the database.
     *
     * @param id Long
     * @return EntityModel<Appointment>
     */
    @GetMapping("/{id}")
    public EntityModel<Appointment> getOne(@PathVariable Long id) {

        Appointment appointment = appointmentService.findAppointmentById(id);
        return assembler.toModel(appointment);
    }

    /**
     * POST method for creating a new Appointment from submitted form.
     *
     * @param appointmentFromFormDTO AppointmentFromFormDTO
     * @return ResponseEntity<?>
     */
    @PostMapping
    public ResponseEntity<?> addAppointment(@RequestBody AppointmentFromFormDTO appointmentFromFormDTO) {

        try {
            // Persist Appointment and related entities
            Appointment appointment = appointmentMapper.mapToAppointment(appointmentFromFormDTO);
            Appointment createdAppointment = appointmentService.createAppointment(appointment);

            EntityModel<Appointment> entityModel = assembler.toModel(createdAppointment);

            return ResponseEntity
                    .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                    .body(entityModel);

        } catch (Exception e) {
            logger.error("Error occurred while creating appointment: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // TODO: rewrite this to handle assigning Advisors, LastUpdatedBy, CreatedBy in Appointments by single REST API call
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAppointment(@RequestBody Appointment newAppointment, @PathVariable Long id) {

        // TODO: make it smarter
        Appointment updatedAppointment = appointmentRepository.findById(id)
                .map( appointment -> {
                    // TODO: preconfigure and set all neccessary metadata on frontend
                    appointment.setClient(newAppointment.getClient()); // Received from specific form section
                    appointment.setEvent(newAppointment.getEvent());
                    // appointment.setAdvisors(newAppointment.getAdvisors()); // Chosen from multiselect list of Advisors
                    appointment.setUpdatedAtDate(Instant.now()); // Better to get the time from backend?? TODO: discuss it
                    appointment.setLastUpdatedBy(newAppointment.getLastUpdatedBy()); // Received from frontend based on Id of logged in Advisor
                    appointment.setCreatedAtDate(newAppointment.getCreatedAtDate()); // Already set, but can be updated ?? I don't think so... TODO: discuss if should be removed
                    appointment.setCreatedBy(newAppointment.getCreatedBy()); // Already set, but can be updated ?? I don't think so... TODO: discuss if should be removed

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

    /**
     * DELETE method for removing Appointment from the database.
     * Makes related Event to be deleted as well.
     *
     * @param id Long
     * @return ResponseEntity<?>
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable Long id) {

        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }

}
