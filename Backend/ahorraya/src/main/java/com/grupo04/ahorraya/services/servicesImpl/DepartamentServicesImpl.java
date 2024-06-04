package com.grupo04.ahorraya.services.servicesImpl;

import com.grupo04.ahorraya.Repository.DepartamentRepository;
import com.grupo04.ahorraya.Repository.StoreRepository;
import com.grupo04.ahorraya.models.dtos.DepartamentDTO;
import com.grupo04.ahorraya.models.entities.Departament;
import com.grupo04.ahorraya.models.entities.Store;
import com.grupo04.ahorraya.services.DepartamentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DepartamentServicesImpl implements DepartamentServices {

    @Autowired
    DepartamentRepository departamentRepository;

    @Autowired
    StoreRepository storeRepository;

    @Override
    public void save(DepartamentDTO info) throws Exception {
        Departament newDepartament = new Departament(info.getDepartamentName());

        departamentRepository.save(newDepartament);
    }

    @Override
    public List<Departament> findAll() {
        return departamentRepository.findAll();
    }

    @Override
    public List<Store> getStoresByDepartament(Departament departament) {
        return storeRepository.findAllByDepartament(departament);
    }

    @Override
    public void update(DepartamentDTO info, UUID id) throws Exception {
        Departament departamentFind = findByID(id);

        departamentFind.setName(info.getDepartamentName());

        departamentRepository.save(departamentFind);
    }

    @Override
    public Departament findByID(UUID id) {
        return departamentRepository.findById(id).orElse(null);
    }

    @Override
    public Departament findByName(String name) {
        return departamentRepository.findByName(name);
    }

    @Override
    public void deleteByName(String name) throws Exception {
        Departament departament = departamentRepository.findByName(name);

        if (departament == null){
            throw new Exception("departament not found");
        }

        departamentRepository.delete(departament);
    }
}
