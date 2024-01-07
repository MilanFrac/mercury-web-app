package com.codebrothers.mercury.repository;

import com.codebrothers.mercury.domain.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAppointmentRepository extends JpaRepository<Appointment, Long> {

}
