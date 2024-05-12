package com.codebrothers.mercury.service;

import com.codebrothers.mercury.domain.Appointment;
import com.codebrothers.mercury.repository.IAppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for managing Appointment objects.
 */
@Service
public class AppointmentService {

    private final IAppointmentRepository appointmentRepository;

    /**
     * AppointmentService constructor.
     *
     * @param appointmentRepository IAppointmentRepository
     */
    @Autowired
    public AppointmentService(IAppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
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
}
