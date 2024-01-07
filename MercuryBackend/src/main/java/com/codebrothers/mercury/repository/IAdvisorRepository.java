package com.codebrothers.mercury.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.codebrothers.mercury.domain.Advisor;
public interface IAdvisorRepository extends JpaRepository<Advisor, Long> {

}
