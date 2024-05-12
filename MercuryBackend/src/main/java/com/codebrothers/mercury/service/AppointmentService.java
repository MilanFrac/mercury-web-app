package com.codebrothers.mercury.service;

import com.codebrothers.mercury.domain.Appointment;
import com.codebrothers.mercury.exception.AppointmentNotFoundException;
import com.codebrothers.mercury.repository.IAppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for managing Appointment objects.
 */
@Service
public class AppointmentService {

    private final IAppointmentRepository appointmentRepository;
    private final EventService eventService;

    /**
     * AppointmentService constructor.
     *
     * @param appointmentRepository IAppointmentRepository
     */
    @Autowired
    public AppointmentService(IAppointmentRepository appointmentRepository, EventService eventService) {
        this.appointmentRepository = appointmentRepository;
        this.eventService = eventService;
    }

    /**
     * Find Appointment with the specific id.
     *
     * @param appointmentId Long
     * @return Appointment
     */
    public Appointment findAppointmentById(Long appointmentId) {
        return appointmentRepository.findById(appointmentId).orElseThrow(() -> new AppointmentNotFoundException(appointmentId));
    }

    /**
     * Persist given Appointment in the database.
     *
     * @param appointment Appointment
     * @return Appointment
     */
    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    /**
     * Update given Appointment in the database and return it.
     *
     * @param appointment Appointment
     * @return Appointment
     */
    public Appointment updateAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    /**
     * Remove Appointment with given id from the database.
     * Remove related Event as well.
     *
     * @param appointmentId Long
     */
    public void deleteAppointment(Long appointmentId) {
        Long eventId = findAppointmentById(appointmentId).getEvent().getId();
        appointmentRepository.deleteById(appointmentId);
        eventService.deleteEvent(eventId);
    }
}
