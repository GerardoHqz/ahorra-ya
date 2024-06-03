package com.grupo04.ahorraya.services.servicesImpl;

import com.grupo04.ahorraya.Repository.OfferCategoryRepository;
import com.grupo04.ahorraya.models.dtos.OfferCategoryDTO;
import com.grupo04.ahorraya.models.entities.Offer_Category;
import com.grupo04.ahorraya.services.OfferCategoryServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class OfferCategoryServicesImpl implements OfferCategoryServices {
    @Autowired
    OfferCategoryRepository offerCategoryRepository;

    @Override
    public void createOfferCategory(OfferCategoryDTO info) throws Exception {
        try{
            Offer_Category offerCategory = new Offer_Category(info.getOfferId(), info.getCategoryId());
            offerCategoryRepository.save(offerCategory);
        } catch (Exception e) {
            throw new Exception("Error creating offer-category");
        }
    }

    @Override
    public void deleteOfferCategory(OfferCategoryDTO info) throws Exception{
        try{
            Offer_Category offerCategory = new Offer_Category(info.getOfferId(), info.getCategoryId());
            offerCategoryRepository.delete(offerCategory);
        } catch (Exception e) {
            throw new Exception("Error deleting offer-category");
        }
    }

    @Override
    public void deleteOfferCategoryById(UUID id) throws Exception{
        try{
            offerCategoryRepository.deleteById(id);
        } catch (Exception e) {
            throw new Exception("Error deleting offer-category");
        }
    }

    @Override
    public void deleteAllOfferCategories() throws Exception{
        try{
            offerCategoryRepository.deleteAll();
        } catch (Exception e) {
            throw new Exception("Error deleting all offer-categories");
        }
    }

    @Override
    public void updateOfferCategory(OfferCategoryDTO info) throws Exception{
        try{
            Offer_Category offerCategory = new Offer_Category(info.getOfferId(), info.getCategoryId());
            offerCategoryRepository.save(offerCategory);
        } catch (Exception e) {
            throw new Exception("Error updating offer-category");
        }
    }

    @Override
    public List<Offer_Category> getAllOfferCategories() {
        return offerCategoryRepository.findAll();
    }

    @Override
    public Offer_Category getOfferCategoryById(UUID id) {
        return offerCategoryRepository.findById(id).get();
    }

}
