package com.grupo04.ahorraya.services.servicesImpl;

import com.grupo04.ahorraya.Repository.DepartamentRepository;
import com.grupo04.ahorraya.Repository.MunicipalityRepository;
import com.grupo04.ahorraya.Repository.OfferRepository;
import com.grupo04.ahorraya.Repository.StoreRepository;
import com.grupo04.ahorraya.models.dtos.StoreDTO;
import com.grupo04.ahorraya.models.dtos.StoreUpdateDTO;
import com.grupo04.ahorraya.models.entities.Departament;
import com.grupo04.ahorraya.models.entities.Municipality;
import com.grupo04.ahorraya.models.entities.Offer;
import com.grupo04.ahorraya.models.entities.Store;
import com.grupo04.ahorraya.services.StoreServices;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class StoreServicesImpl implements StoreServices {
    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private MunicipalityRepository municipalityRepository;

    @Autowired
    private DepartamentRepository departamentRepository;

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void saveStore(StoreDTO info) throws Exception {
        Departament departament = departamentRepository.findByName(info.getDepartament());
        if (departament == null) {
            throw new Exception("Departament not found");
        }

        Municipality municipality = municipalityRepository.findByName(info.getMunicipality());
        if (municipality == null) {
            throw new Exception("Municipality not found");
        }

        Store store = new Store(info.getName(), info.getDescription(), info.getLatitude(),
                info.getLongitude(), departament, municipality, info.getDirection(), info.getOwnerName(),
                info.getWebSite(), info.getPhone(), info.getEmail());
        storeRepository.save(store);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void deleteStore(UUID idStore) throws Exception{
        try {
            storeRepository.deleteById(idStore);
        } catch (Exception e) {
            throw new Exception("Error delete store");
        }
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void updateStore(StoreUpdateDTO info)throws Exception {
        Store store = storeRepository.findByIdStore(info.getIdStore());
        if (store == null) {
            throw new Exception("Store not found");
        }
        Departament departament = departamentRepository.findByName(info.getDepartament());

        if (departament == null) {
            throw new Exception("Departament not found");
        }

        Municipality municipality = municipalityRepository.findByName(info.getMunicipality());

        if (municipality == null) {
            throw new Exception("Municipality not found");
        }
            store.setIdStore(store.getIdStore());
            store.setName(info.getName());
            store.setDescription(info.getDescription());
            store.setLatitude(info.getLatitude());
            store.setLonguitude(info.getLongitude());
            store.setDepartament(departament);
            store.setMunicipality(municipality);
            store.setDirection(info.getDirection());
            store.setOwnerName(info.getOwnerName());
            store.setWebSite(info.getWebSite());
            store.setPhone(info.getPhone());
            store.setEmail(info.getEmail());

            storeRepository.save(store);
    }

    @Override
    public Store getStoreById(UUID idStore) {
        return storeRepository.findByIdStore(idStore);
    }

    @Override
    public Store getStoreByName(String name) {
        return storeRepository.findByName(name);
    }

    @Override
    public List<Store> getAllStores() {
        return storeRepository.findAll();
    }

    @Override
    public List<Offer> getOffersByStore(UUID idStore) {
        return offerRepository.findAll().stream()
                .filter(offer -> offer.getStore().getIdStore().equals(idStore)).toList();
    }

    @Override
    public List<Offer> getOffersActiveAndByStore(UUID idStore, Boolean active) {
        return offerRepository.findAll().stream()
                .filter(offer -> offer.getStore().getIdStore().equals(idStore) && offer.getActive().equals(active)).toList();
    }

}
