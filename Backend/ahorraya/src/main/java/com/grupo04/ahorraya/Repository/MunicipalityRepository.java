package com.grupo04.ahorraya.Repository;

import com.grupo04.ahorraya.models.entities.Municipality;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MunicipalityRepository extends JpaRepository<Municipality, UUID> {
    Municipality findByName(String name);
    List<Municipality> findMunicipalitiesByDepartament_Name(String name);
}
