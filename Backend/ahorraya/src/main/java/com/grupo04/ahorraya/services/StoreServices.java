package com.grupo04.ahorraya.services;

import com.grupo04.ahorraya.models.dtos.RegisterDTO;
import com.grupo04.ahorraya.models.dtos.StoreDTO;
import com.grupo04.ahorraya.models.dtos.StoreUpdateDTO;
import com.grupo04.ahorraya.models.entities.Offer;
import com.grupo04.ahorraya.models.entities.Store;

import java.util.List;
import java.util.UUID;

public interface StoreServices {

    void saveStore(StoreDTO store) throws Exception;

    void deleteStore(UUID idStore) throws Exception;
    void updateStore(StoreUpdateDTO store) throws Exception;
    Store getStoreById(UUID id);
    Store getStoreByName(String name);
    List<Store> getAllStores();
    List<Offer> getOffersByStore(UUID idStore);
    List<Offer> getOffersActiveAndByStore(UUID idStore, Boolean active);

}
