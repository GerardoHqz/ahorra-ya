package com.grupo04.ahorraya.services.servicesImpl;

import com.grupo04.ahorraya.Repository.OfferRepository;
import com.grupo04.ahorraya.Repository.StoreRepository;
import com.grupo04.ahorraya.models.dtos.StoreDTO;
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

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void saveStore(StoreDTO info) throws Exception {
        try {
            Store store = new Store(info.getName(), info.getDescription(), info.getLatitude(),
                    info.getLongitude(), info.getDepartament(), info.getMunicipality(), info.getDirection(), info.getOwnerName(), info.getWebSite(), info.getPhone(), info.getEmail());
            storeRepository.save(store);
        } catch (Exception e) {
            throw new Exception("Error save store");
        }

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
    public void updateStore(StoreDTO info)throws Exception {
        try {
            Store store = new Store(info.getName(), info.getDescription(), info.getLatitude(),
                    info.getLongitude(), info.getDepartament(), info.getMunicipality(), info.getDirection(), info.getOwnerName(), info.getWebSite(), info.getPhone(), info.getEmail());
            storeRepository.save(store);
        } catch (Exception e) {
            throw new Exception("Error update store");
        }
    }

    @Override
    public Store getStoreById(UUID idStore) {
        return storeRepository.getByIdStore(idStore);
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
