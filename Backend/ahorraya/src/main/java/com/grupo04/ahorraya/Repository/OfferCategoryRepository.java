package com.grupo04.ahorraya.Repository;

import com.grupo04.ahorraya.models.entities.Offer_Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OfferCategoryRepository extends JpaRepository<Offer_Category, UUID> {
}
