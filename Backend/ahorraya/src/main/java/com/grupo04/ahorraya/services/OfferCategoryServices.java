package com.grupo04.ahorraya.services;

import com.grupo04.ahorraya.models.dtos.OfferCategoryDTO;
import com.grupo04.ahorraya.models.entities.Offer_Category;

import java.util.List;
import java.util.UUID;

public interface OfferCategoryServices {
    void createOfferCategory(OfferCategoryDTO info) throws Exception;
    void deleteOfferCategory(OfferCategoryDTO info) throws Exception;
    void deleteOfferCategoryById(UUID id)throws Exception;
    void deleteAllOfferCategories() throws Exception;
    void updateOfferCategory(OfferCategoryDTO info)throws Exception;
    List<Offer_Category> getAllOfferCategories();
    Offer_Category getOfferCategoryById(UUID id);

}
