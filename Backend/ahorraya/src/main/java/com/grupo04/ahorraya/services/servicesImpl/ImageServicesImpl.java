package com.grupo04.ahorraya.services.servicesImpl;

import com.grupo04.ahorraya.Repository.ImageRepository;
import com.grupo04.ahorraya.models.entities.Image;
import com.grupo04.ahorraya.models.entities.Offer;
import com.grupo04.ahorraya.models.entities.Store;
import com.grupo04.ahorraya.services.ImageServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class ImageServicesImpl implements ImageServices {

    @Autowired
    ImageRepository imageRepository;

    @Value("$upload.directory")
    private String uploadDirectory;

    @Override
    public void save(MultipartFile info, Store store, Offer offer) throws Exception {
        String imageName = UUID.randomUUID().toString() + info.getOriginalFilename();

        Path imagePath = Paths.get(uploadDirectory).resolve(imageName).normalize();
        Files.copy(info.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);

        Image image = new Image(imageName, imagePath.toString(), store, offer);
        imageRepository.save(image);
    }

    @Override
    public void delete(UUID id) {
        Image image = imageRepository.findImageByidImage(id);
        imageRepository.delete(image);
    }

    @Override
    public Image findById(UUID id) {
        return imageRepository.findImageByidImage(id);
    }

    @Override
    public Image findByName(String name) {
        return imageRepository.findImageByName(name);
    }

    @Override
    public Resource getImage(String name) {
        try {
            Path imagePath = Paths.get(uploadDirectory).resolve(name).normalize();
            Resource resource = new UrlResource(imagePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Image not found: " + imagePath);
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error loading the image", e);
        }

    }

    @Override
    public List<Image> getImageByStore(Store store) {
        return imageRepository.findAllByStore(store);
    }

    @Override
    public List<Image> getImageByOffer(Offer offer) {
        return imageRepository.findAllByOffer(offer);
    }
}
