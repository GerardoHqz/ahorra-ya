package com.grupo04.ahorraya.services;

import com.grupo04.ahorraya.models.dtos.MunicipalityDTO;
import com.grupo04.ahorraya.models.entities.Municipality;
import com.grupo04.ahorraya.models.entities.Store;

import java.util.List;
import java.util.UUID;

public interface MunicipalityServices {
    void save(MunicipalityDTO info) throws Exception;
    List<Municipality> findALL();
    List<Store> getStoresByMunicipality(String municipality);
    Municipality findByID(UUID municipalityID);
    Municipality findByName(String name);
    void deleteByName(String name) throws Exception;
}
