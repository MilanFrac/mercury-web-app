package com.codebrothers.mercury.service;

import com.codebrothers.mercury.domain.Event;
import com.codebrothers.mercury.exception.EventNotFoundException;
import com.codebrothers.mercury.repository.IEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public Event findEventById(Long eventId) {
        return eventRepository.findById(eventId).orElseThrow(() -> new EventNotFoundException(eventId));
    }

    /**
     * Retrieve all events from the database.
     *
     * @return List<Event>
     */
    public List<Event> findAllEvents() {
        return eventRepository.findAll();
    }

    /**
     * Remove specific Event by their id.
     *
     * @param eventId Long
     */
    public void deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
    }
}
