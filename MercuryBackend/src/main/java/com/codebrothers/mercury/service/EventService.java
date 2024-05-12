package com.codebrothers.mercury.service;

import com.codebrothers.mercury.domain.Event;
import com.codebrothers.mercury.repository.IEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service class for managing Event objects.
 */
@Service
public class EventService {

    private final IEventRepository eventRepository;

    /**
     * EventService constructor.
     * @param eventRepository IEventRepository
     */
    @Autowired
    public EventService(IEventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    /**
     * Persist given Event in the database.
     *
     * @param event Event
     * @return Event
     */
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    /**
     * Find specific Event by their id.
     *
     * @param eventId Long
     * @return Optional<Event>
     */
    public Optional<Event> getEvent(Long eventId) {
        return eventRepository.findById(eventId);
    }

    /**
     * Retrieve all events from the database.
     *
     * @return List<Event>
     */
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
}
