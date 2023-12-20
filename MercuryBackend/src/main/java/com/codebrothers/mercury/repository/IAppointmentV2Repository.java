package com.codebrothers.mercury.repository;

import com.codebrothers.mercury.domain.AppointmentV2;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAppointmentV2Repository extends JpaRepository<AppointmentV2, Long> {

}
