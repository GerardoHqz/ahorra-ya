package com.grupo04.ahorraya.services;

import com.grupo04.ahorraya.models.dtos.OfferDTO;
import com.grupo04.ahorraya.models.dtos.OfferUpdateDTO;
import com.grupo04.ahorraya.models.entities.Offer;

import java.util.List;
import java.util.UUID;

public interface OfferServices {
    void createOffer(OfferDTO offer) throws Exception;
    void updateOffer(OfferUpdateDTO offer) throws Exception;
    void  deleteOffer(UUID idOffer) throws Exception;
    List<Offer> getAllOffers();
    List<Offer> getOfferByActive(Boolean active);
    Offer getOfferById(UUID idOffer);

}
