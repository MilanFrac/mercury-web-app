package com.codebrothers.mercury.service;

import com.codebrothers.mercury.domain.Advisor;
import com.codebrothers.mercury.domain.Appointment;
import com.codebrothers.mercury.exception.AdvisorNotFoundException;
import com.codebrothers.mercury.repository.IAdvisorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for managing Advisor objects.
 */
@Service
public class AdvisorService {

    private final IAdvisorRepository advisorRepository;

    /**
     * AdvisorService constructor.
     *
     * @param advisorRepository IAdvisorRepository
     */
    @Autowired
    public AdvisorService(IAdvisorRepository advisorRepository) {
        this.advisorRepository = advisorRepository;
    }

    /**
     * Find specific Advisor by their id.
     *
     * @param advisorId Long
     * @return Advisor
     */
    public Advisor getByAdvisorId(Long advisorId) {
        return advisorRepository.findById(advisorId).orElseThrow(() -> new AdvisorNotFoundException(advisorId));
    }

    /**
     * Assign an Appointment to an Advisor.
     *
     * @param appointment Appointment
     * @param advisor Advisor
     */
    public void addAppointmentToAdvisor(Appointment appointment, Advisor advisor) {
        advisor.addAppointment(appointment);
        advisorRepository.save(advisor);
    }

    /**
     * Persist given Advisor in the database.
     *
     * @param advisor Advisor
     * @return Advisor
     */
    public Advisor createAdvisor(Advisor advisor) {
        return advisorRepository.save(advisor);
    }
}
