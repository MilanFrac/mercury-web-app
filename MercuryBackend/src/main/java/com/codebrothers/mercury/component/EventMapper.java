package com.codebrothers.mercury.component;

import com.codebrothers.mercury.DTO.AddressDTO;
import com.codebrothers.mercury.DTO.EventDTO;
import com.codebrothers.mercury.domain.Address;
import com.codebrothers.mercury.domain.Event;
import com.codebrothers.mercury.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Custom mapper for EventDTO -> Event entity.
 */
@Component
public class EventMapper {


    private final AddressService addressService;

    /**
     * EventMapper constructor.
     *
     * @param addressService
     */
    @Autowired
    public EventMapper(AddressService addressService) {
        this.addressService = addressService;
    }

    /**
     * Method that maps EventDTO to Event.
     *
     * @param dto EventDTO
     * @return Event
     */
    public Event mapToEvent(EventDTO dto) {
        Event event = new Event();
        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setRealizationStartDate(dto.getRealizationStartDate());
        event.setRealizationEndDate(dto.getRealizationEndDate());

        AddressDTO addressDTO = dto.getRealizationPlace();
        Address address = addressService.getOrCreateAddress(
                addressDTO.getCityName(),
                addressDTO.getZipCode(),
                addressDTO.getStreetName(),
                addressDTO.getHouseNumber(),
                addressDTO.getApartmentNumber()
        );
        event.setRealizationPlace(address);
        event.setServiceType(dto.getServiceType());

        return event;
    }
}
