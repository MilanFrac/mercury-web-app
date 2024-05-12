package com.codebrothers.mercury.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.codebrothers.mercury.domain.Client;

public interface IClientRepository extends JpaRepository<Client, Long> {

    Client findByPhoneNumber(String phoneNumber);
}
