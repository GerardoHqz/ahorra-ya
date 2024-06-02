package com.grupo04.ahorraya.services.servicesImpl;

import com.grupo04.ahorraya.Repository.MunicipalityRepository;
import com.grupo04.ahorraya.Repository.StoreRepository;
import com.grupo04.ahorraya.models.dtos.MunicipalityDTO;
import com.grupo04.ahorraya.models.entities.Municipality;
import com.grupo04.ahorraya.models.entities.Store;
import com.grupo04.ahorraya.services.MunicipalityServices;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MunicipalityServicesImpl implements MunicipalityServices {

    @Autowired
    MunicipalityRepository municipalityRepository;

    @Autowired
    StoreRepository storeRepository;

    @Override
    public void save(MunicipalityDTO info) throws Exception {
        Municipality newMunicipality = new Municipality(info.getNameMunicipality(), info.getNameDepartament());

        municipalityRepository.save(newMunicipality);
    }

    @Override
    public List<Municipality> findALL() {
        return municipalityRepository.findAll();
    }

    @Override
    public List<Store> getStoresByMunicipality(Municipality municipality) {
        return storeRepository.findAllByMunicipality(municipality);
    }

    @Override
    public void update(MunicipalityDTO municipality, UUID municipalityID) throws Exception {
        Municipality municipalityFind = findByID(municipalityID);

        municipalityFind.setName(municipality.getNameMunicipality());
        municipalityFind.setDepartament(municipality.getNameDepartament());

        municipalityRepository.save(municipalityFind);
    }

    @Override
    public Municipality findByID(UUID municipalityID) {
        return municipalityRepository.findById(municipalityID).orElse(null);
    }

    @Override
    public Municipality findByName(String name) {
        return municipalityRepository.findByName(name);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void deleteByName(String name) throws Exception {
        Municipality municipality = municipalityRepository.findByName(name);

        if (municipality == null){
            throw new Exception("municipality not found");
        }

        municipalityRepository.delete(municipality);
    }
}
