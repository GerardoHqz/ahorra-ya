package com.grupo04.ahorraya.services;

import com.grupo04.ahorraya.models.dtos.DepartamentDTO;
import com.grupo04.ahorraya.models.entities.Departament;
import com.grupo04.ahorraya.models.entities.Store;

import java.util.List;
import java.util.UUID;

public interface DepartamentServices {
    void save(DepartamentDTO info) throws Exception;
    List<Departament> findAll();
    List<Store> getStoresByDepartament(Departament departament);
    void update(DepartamentDTO info, UUID id) throws Exception;
    Departament findByID(UUID id);
    Departament findByName(String name);
    void deleteByName(String name) throws Exception;
}
