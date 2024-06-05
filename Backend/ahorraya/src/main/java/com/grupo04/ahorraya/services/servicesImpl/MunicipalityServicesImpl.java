package com.grupo04.ahorraya.services.servicesImpl;

import com.grupo04.ahorraya.Repository.DepartamentRepository;
import com.grupo04.ahorraya.Repository.MunicipalityRepository;
import com.grupo04.ahorraya.Repository.StoreRepository;
import com.grupo04.ahorraya.models.dtos.MunicipalityDTO;
import com.grupo04.ahorraya.models.entities.Departament;
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

    @Autowired
    DepartamentRepository departamentRepository;
    @Override
    public void save(MunicipalityDTO info) throws Exception {
        if (municipalityRepository.findByName(info.getNameMunicipality()) != null){
            throw new Exception("Municipality already exists");
        }

        Departament departament = departamentRepository.findByIdDepartamento(info.getDepartament());
        if (departament == null){
            throw new Exception("Departament not found");
        }
        Municipality newMunicipality = new Municipality(info.getNameMunicipality(), departament);

        municipalityRepository.save(newMunicipality);
    }

    @Override
    public List<Municipality> findALL() {
        return municipalityRepository.findAll();
    }

    @Override
    public List<Store> getStoresByMunicipality(String municipality) {
        return storeRepository.findAll()
                .stream().map(store -> {
                    if (store.getMunicipality().getName().equals(municipality)){
                        return store;
                    }
                    return null;
                }).toList();
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
