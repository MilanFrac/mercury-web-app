package com.codebrothers.mercury.service;

import com.codebrothers.mercury.domain.Address;
import com.codebrothers.mercury.repository.IAddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for managing Address objects.
 */
@Service
public class AddressService {

    private final IAddressRepository addressRepository;

    /**
     * AddressService constructor.
     *
     * @param addressRepository IAddressRepository
     */
    @Autowired
    public AddressService(IAddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    /**
     * Method for getting existing Address.
     * If the Address does not exist, then create a new one.
     *
     * @param cityName String
     * @param zipCode String
     * @param streetName String
     * @param houseNumber Integer
     * @param apartmentNumber Integer
     * @return Address
     */
    public Address getOrCreateAddress(
            String cityName,
            String zipCode,
            String streetName,
            Integer houseNumber,
            Integer apartmentNumber
    ) {

        Address existingAddress = addressRepository.findByAllFields(
                cityName, zipCode, streetName, houseNumber, apartmentNumber
        );

        if (existingAddress != null) {
            return existingAddress;
        } else {
            Address address = new Address();
            address.setCityName(cityName);
            address.setZipCode(zipCode);
            address.setStreetName(streetName);
            address.setHouseNumber(houseNumber);
            address.setApartmentNumber(apartmentNumber);

            return addressRepository.save(address);
        }
    }
}
