package com.grupo04.ahorraya.Repository;

import com.grupo04.ahorraya.models.entities.Image;
import com.grupo04.ahorraya.models.entities.Offer;
import com.grupo04.ahorraya.models.entities.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ImageRepository extends JpaRepository<Image, UUID> {
    Image findImageByidImage(UUID id);

    Image findImageByName(String name);

    List<Image> findAllByStore(Store store);
    List<Image> findAllByOffer(Offer offer);
}
