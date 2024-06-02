package com.grupo04.ahorraya.Repository;

import com.grupo04.ahorraya.models.entities.Departament;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DepartamentRepository extends JpaRepository<Departament, UUID> {
    Departament findByName(String name);
}
