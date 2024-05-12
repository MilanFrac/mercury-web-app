package com.codebrothers.mercury.component;

import com.codebrothers.mercury.domain.Advisor;
import com.codebrothers.mercury.repository.IAdvisorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Custom DataLoader class implementing CommandLineRunner.
 * It provides a comfortable way to populate database with predefined dump data.
 */
@Component
public class DataLoader implements CommandLineRunner {

    private final IAdvisorRepository advisorRepository;

    /**
     * DataLoader constructor.
     *
     * @param advisorRepository
     */
    @Autowired
    public DataLoader(IAdvisorRepository advisorRepository) {
        this.advisorRepository = advisorRepository;
    }

    /**
     * Startup method for DataLoader.
     *
     * @param args incoming main method arguments
     * @throws Exception
     */
    @Override
    public void run(String... args) throws Exception {
        loadAdvisors();
    }

    /**
     * Method for populating Advisors table with initial records.
     */
    private void loadAdvisors() {
        Advisor advisor = new Advisor("+48543233444");
        advisor.setFirstName("Maja");
        advisor.setLastName("Kowal");
        advisor.setEmail("mkowal@codebrothers.com");
        advisorRepository.save(advisor);
    }
}
