package com.grupo04.ahorraya.controllers;

import com.grupo04.ahorraya.models.dtos.AddImageDTO;
import com.grupo04.ahorraya.models.dtos.ImageUpdateDTO;
import com.grupo04.ahorraya.models.dtos.MessageDTO;
import com.grupo04.ahorraya.models.entities.Image;
import com.grupo04.ahorraya.models.entities.Offer;
import com.grupo04.ahorraya.models.entities.Store;
import com.grupo04.ahorraya.models.entities.User;
import com.grupo04.ahorraya.services.ImageServices;
import com.grupo04.ahorraya.services.OfferServices;
import com.grupo04.ahorraya.services.StoreServices;
import com.grupo04.ahorraya.services.UserServices;
import com.grupo04.ahorraya.utils.RequestErrorHandler;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    private ImageServices imageServices;

    @Autowired
    private UserServices userServices;

    @Autowired
    private StoreServices storeServices;

    @Autowired
    private OfferServices offerServices;

    @Autowired
    private RequestErrorHandler errorHandler;

    @PostMapping("/")
    public ResponseEntity<?> saveImage(@ModelAttribute @Valid AddImageDTO info, BindingResult validations) throws Exception{
        User userFound = userServices.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try{
            imageServices.save(info.getFile(),info.getStore(),info.getOffer());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable UUID id){

        User userFound = userServices.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try{
            imageServices.delete(id);
            return ResponseEntity.ok("Image deleted successfully");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete image");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getImageById(@PathVariable UUID id){
        Image image = imageServices.findById(id);

        if (image != null) {
            Resource resource = imageServices.getImage(image.getName());
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(resource);
        } else {
            return new ResponseEntity<>(new MessageDTO("image not found"), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/info/id/{id}")
    public ResponseEntity<?> getImageInfoById(@PathVariable UUID id){
        User userFound = userServices.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        Image image = imageServices.findById(id);

        if (image != null) {
            return new ResponseEntity<>(image, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new MessageDTO("image not found"), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/info/name/{name}")
    public ResponseEntity<?> getImageInfoByName(@PathVariable String name){
        User userFound = userServices.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        Image image = imageServices.findByName(name);

        if (image != null) {
            return new ResponseEntity<>(image, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new MessageDTO("image not found"), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<?> getImageByName(@PathVariable String name){
        User userFound = userServices.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        Image image = imageServices.findByName(name);
        if (image != null) {
            Resource resource = imageServices.getImage(image.getName());
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(resource);
        } else {
            return new ResponseEntity<>(new MessageDTO("image not found"), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/")
    @Transactional(rollbackOn = Exception.class)
    public ResponseEntity<?> updateImage(@RequestBody @Valid ImageUpdateDTO info, BindingResult validations) throws Exception{
        if (validations.hasErrors()) {
            return ResponseEntity.badRequest().body(errorHandler.mapErrors(validations.getFieldErrors()));
        }

        User userFound = userServices.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try{
            imageServices.updateImage(info);
            return new ResponseEntity<>(new MessageDTO("Image Updated!"), HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/store/{id}")
    public ResponseEntity<?> getAllImagesByStore(@PathVariable UUID id){
        User userFound = userServices.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        Store store = storeServices.getStoreById(id);
        if (store == null){
            return new ResponseEntity<>(new MessageDTO("Store not found"), HttpStatus.NOT_FOUND);
        }

        try{
            return new ResponseEntity<>(imageServices.getImageByStore(store), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/offer/{id}")
    public ResponseEntity<?> getAllImagesByOffer(@PathVariable UUID id){
        User userFound = userServices.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        Offer offer = offerServices.getOfferById(id);
        if (offer == null){
            return new ResponseEntity<>(new MessageDTO("Offer not found"), HttpStatus.NOT_FOUND);
        }

        try{
            return new ResponseEntity<>(imageServices.getImageByOffer(offer), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/offer/{id}")
    public ResponseEntity<?> deleteImagesByOffer(@PathVariable UUID id){
        User userFound = userServices.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        Offer offer = offerServices.getOfferById(id);
        if (offer == null){
            return new ResponseEntity<>(new MessageDTO("Offer not found"), HttpStatus.NOT_FOUND);
        }

        try{
            imageServices.deleteByOffer(offer);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
