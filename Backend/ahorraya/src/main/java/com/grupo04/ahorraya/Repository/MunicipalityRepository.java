package com.grupo04.ahorraya.Repository;

import com.grupo04.ahorraya.models.entities.Municipality;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MunicipalityRepository extends JpaRepository<Municipality, UUID> {
    Municipality findByName(String name);
}
