package com.codebrothers.mercury.repository;

import com.codebrothers.mercury.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IEventRepository extends JpaRepository<Event, Long> {

}
