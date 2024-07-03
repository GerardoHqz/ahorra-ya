package com.grupo04.ahorraya.services.servicesImpl;

import com.grupo04.ahorraya.Repository.CategoryRepository;
import com.grupo04.ahorraya.Repository.ImageRepository;
import com.grupo04.ahorraya.Repository.OfferRepository;
import com.grupo04.ahorraya.Repository.StoreRepository;
import com.grupo04.ahorraya.models.dtos.OfferDTO;
import com.grupo04.ahorraya.models.dtos.OfferUpdateDTO;
import com.grupo04.ahorraya.models.entities.Category;
import com.grupo04.ahorraya.models.entities.Offer;
import com.grupo04.ahorraya.models.entities.Store;
import com.grupo04.ahorraya.services.ImageServices;
import com.grupo04.ahorraya.services.OfferServices;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class OfferServicesImpl implements OfferServices {
    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private ImageServices imageServices;

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void createOffer(OfferDTO offer) throws Exception {
        try{
            Category category = categoryRepository.getByIdCategory(offer.getCategory());
            Store store = storeRepository.findByIdStore(offer.getStore());

            if(category == null)
                throw new Exception("La categoria no existe");
            if(store == null)
                throw new Exception("La tienda no existe");

            Offer newOffer = new Offer(offer.getName(), offer.getDescription(), offer.getPriceBefore(), offer.getPriceNow(),
                    offer.getInitDate(), offer.getEndDate(), offer.getActive(), store, category);
            offerRepository.save(newOffer);
        }
        catch (Exception e){
            throw new Exception("Error al crear la oferta");
        }

    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void updateOffer(OfferUpdateDTO info) throws Exception{
        Offer offer = offerRepository.getByIdOffer(info.getIdOffer());
        if (offer == null)
            throw new Exception("La oferta no existe");

        Category category = categoryRepository.getByIdCategory(info.getCategory());
        Store store = storeRepository.findByIdStore(info.getStore());

        if(category == null)
            throw new Exception("La categoria no existe");
        if(store == null)
            throw new Exception("La tienda no existe");


            offer.setIdOffer(info.getIdOffer());
            offer.setName(info.getName());
            offer.setDescription(info.getDescription());
            offer.setPriceBefore(info.getPriceBefore());
            offer.setPriceNow(info.getPriceNow());
            offer.setInitDate(info.getInitDate());
            offer.setEndDate(info.getEndDate());
            offer.setActive(info.getActive());
            offer.setCategory(category);
            offer.setStore(store);

            offerRepository.save(offer);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void deleteOffer(UUID idOffer) throws Exception {
        try{
            Offer offer = offerRepository.getByIdOffer(idOffer);
            if (offer == null)
                throw new Exception("La oferta no existe");

            imageServices.deleteByOffer(offer);
            offerRepository.deleteById(idOffer);
        }
        catch (Exception e){
            throw new Exception("Error al eliminar la oferta");
        }
    }

    @Override
    public void deleteOffersByStore(UUID idStore) throws Exception {
        try {
            List<Offer> offers = offerRepository.findOffersByStore_IdStore(idStore);
            System.out.println("Number of Offers: " + offers.size());
            for (Offer offer : offers) {
                System.out.println("Deleting images for offer: " + offer.getIdOffer());
                imageServices.deleteByOffer(offer);
                System.out.println("Deleting offer: " + offer.getIdOffer());
                offerRepository.deleteById(offer.getIdOffer());
            }
        } catch (Exception e) {
            throw new Exception("Error al eliminar las ofertas");
        }
    }

    @Override
    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }
    
    @Override
    public List<Offer> getOffersByName(String name) {
        return offerRepository.findAll().stream()
        		.filter(store -> store.getName().toLowerCase().contains(name.toLowerCase())).toList();
    }

    @Override
    public Offer getOfferById(UUID idOffer) {
        return offerRepository.getByIdOffer(idOffer);
    }

    @Override
    public List<Offer> getOfferByActive(Boolean active) {
        return offerRepository.findOfferByActive(active);
    }
}
