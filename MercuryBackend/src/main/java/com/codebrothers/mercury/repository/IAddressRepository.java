package com.codebrothers.mercury.repository;

import com.codebrothers.mercury.domain.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IAddressRepository extends JpaRepository<Address, Long> {

    @Query(
            "SELECT a FROM Address a " +
                    "WHERE a.cityName = :cityName " +
                    "AND a.zipCode = :zipCode " +
                    "AND a.streetName = :streetName " +
                    "AND a.houseNumber = :houseNumber " +
                    "AND a.apartmentNumber = :apartmentNumber")
    public Address findByAllFields(
           @Param("cityName") String cityName,
           @Param("zipCode") String zipCode,
           @Param("streetName") String streetName,
           @Param("houseNumber") Integer houseNumber,
           @Param("apartmentNumber") Integer apartmentNumber
    );
}
