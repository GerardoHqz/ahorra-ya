package com.grupo04.ahorraya.services.servicesImpl;

import com.grupo04.ahorraya.Repository.OfferRepository;
import com.grupo04.ahorraya.models.dtos.OfferDTO;
import com.grupo04.ahorraya.models.entities.Offer;
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

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void createOffer(OfferDTO offer) throws Exception {
        try{
            Offer newOffer = new Offer(offer.getName(), offer.getDescription(), offer.getPriceBefore(), offer.getPriceNow(),
                    offer.getInitDate(), offer.getEndDate(), offer.getActive(), offer.getStore(), offer.getCategory());
            offerRepository.save(newOffer);
        }
        catch (Exception e){
            throw new Exception("Error al crear la oferta");
        }

    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void updateOffer(OfferDTO info) throws Exception{
        try{
            Offer offer = new Offer(info.getName(), info.getDescription(), info.getPriceBefore(), info.getPriceNow(),
                    info.getInitDate(), info.getEndDate(), info.getActive(), info.getStore(), info.getCategory());
            offerRepository.save(offer);
        }
        catch (Exception e){
            throw new Exception("Error al actualizar la oferta");
        }
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void deleteOffer(UUID idOffer) throws Exception {
        try{
            offerRepository.deleteById(idOffer);
        }
        catch (Exception e){
            throw new Exception("Error al eliminar la oferta");
        }
    }

    @Override
    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
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
