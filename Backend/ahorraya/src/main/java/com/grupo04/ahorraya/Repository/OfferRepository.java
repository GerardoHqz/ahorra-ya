package com.grupo04.ahorraya.Repository;

import com.grupo04.ahorraya.models.entities.Category;
import com.grupo04.ahorraya.models.entities.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OfferRepository extends JpaRepository<Offer, UUID> {
    Offer getByIdOffer(UUID idOffer);
    Offer getByName(String name);
    List<Offer> findOfferByActive(Boolean active);
}
