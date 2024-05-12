package com.codebrothers.mercury.component;

import com.codebrothers.mercury.DTO.AppointmentFromFormDTO;
import com.codebrothers.mercury.domain.Advisor;
import com.codebrothers.mercury.domain.Appointment;
import com.codebrothers.mercury.domain.Client;
import com.codebrothers.mercury.domain.Event;
import com.codebrothers.mercury.service.AdvisorService;
import com.codebrothers.mercury.service.ClientService;
import com.codebrothers.mercury.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * Custom mapper for AppointmentFromFormDTO -> Appointment entity.
 */
@Component
public class AppointmentMapper {

    private final ClientService clientService;

    private final EventService eventService;

    private final AdvisorService advisorService;

    private final EventMapper eventMapper;

    /**
     * AppointmentMapper constructor.
     *
     * @param clientService
     * @param eventService
     * @param advisorService
     * @param eventMapper
     */
    @Autowired
    public AppointmentMapper(ClientService clientService, EventService eventService, AdvisorService advisorService, EventMapper eventMapper) {
        this.clientService = clientService;
        this.eventService = eventService;
        this.advisorService = advisorService;
        this.eventMapper = eventMapper;
    }

    /**
     * Method that maps AppointmentFromFormDTO to Appointment.
     *
     * @param dto AppointmentFromFormDTO
     * @return Appointment
     * @throws Exception
     */
    public Appointment mapToAppointment(AppointmentFromFormDTO dto) throws Exception {
        // ONLY CASE WHEN CREATING A NEW APPOINTMENT

        Appointment appointment = new Appointment();

        // Set createdAtDate and updatedAtDate
        LocalDateTime now = LocalDateTime.now();
        if(dto.getCreatedAtDate().equals(null)) {
            appointment.setCreatedAtDate(now);
        } else {
            appointment.setCreatedAtDate(dto.getCreatedAtDate());
        }
        appointment.setUpdatedAtDate(now);

        // Fetch Client by its properties or create a new one
        Client client = clientService.getOrCreateClient(
                dto.getClient().getPhoneNumber(),
                dto.getClient().getFirstName(),
                dto.getClient().getLastName(),
                dto.getClient().getEmail()
        );
        appointment.setClient(client);

        // Create a new Event
        Event event = eventService.createEvent(eventMapper.mapToEvent(dto.getEvent()));
        appointment.setEvent(event);

        // Fetch Advisor by its ID
        Advisor advisor = advisorService.getByAdvisorId(dto.getAdvisorId());
        appointment.setCreatedBy(advisor);
        appointment.setLastUpdatedBy(advisor);

        client.addAppointment(appointment); // Remember to update Client with appointment
        return appointment;
    }
}
