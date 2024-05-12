package com.codebrothers.mercury.service;

import com.codebrothers.mercury.domain.Client;
import com.codebrothers.mercury.repository.IClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for managing Client objects.
 */
@Service
public class ClientService {

    private final IClientRepository clientRepository;

    /**
     * ClientService constructor.
     * @param clientRepository IClientRepository
     */
    @Autowired
    public ClientService(IClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    /**
     * Method for getting existing Client.
     * If the Client does not exist, then create a new one.
     *
     * @param phoneNumber String
     * @param firstName String
     * @param lastName String
     * @param email String
     * @return Client
     * @throws Exception
     */
    public Client getOrCreateClient(String phoneNumber, String firstName, String lastName, String email) throws Exception {

        Client existingClient = (Client) clientRepository.findByPhoneNumber(phoneNumber);
        if (existingClient != null) {
            if (existingClient.getFirstName().equals(firstName) && existingClient.getLastName().equals(lastName)) {
                return existingClient;
            } else {
                throw new Exception("Client with given phone number exists but first name or last name does not match!");
            }
        }

        // If client not found, create a new one
        Client newClient = new Client();
        newClient.setFirstName(firstName);
        newClient.setLastName(lastName);
        newClient.setPhoneNumber(phoneNumber);
        newClient.setEmail(email);

        return (Client) clientRepository.save(newClient);
    }

    /**
     * Persist given Client in the database.
     *
     * @param client Client
     * @return Client
     */
    public Client createClient(Client client) {
        return clientRepository.save(client);
    }
}
