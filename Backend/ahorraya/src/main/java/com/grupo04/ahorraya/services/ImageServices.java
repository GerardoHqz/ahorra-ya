package com.grupo04.ahorraya.services;

import com.grupo04.ahorraya.models.entities.Image;
import com.grupo04.ahorraya.models.entities.Offer;
import com.grupo04.ahorraya.models.entities.Store;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface ImageServices {
    void save(MultipartFile info, UUID store, UUID offer) throws Exception;
    void delete(UUID id);
    void deleteByOffer(Offer offer);
    Image findById(UUID id);
    Image findByName(String name);
    Resource getImage(String name);
    List<Image> getImageByStore(Store store);
    List<Image> getImageByOffer(Offer offer);
}
