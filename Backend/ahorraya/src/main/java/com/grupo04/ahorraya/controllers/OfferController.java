package com.grupo04.ahorraya.controllers;

import com.grupo04.ahorraya.models.dtos.MessageDTO;
import com.grupo04.ahorraya.models.dtos.OfferDTO;
import com.grupo04.ahorraya.models.dtos.OfferUpdateDTO;
import com.grupo04.ahorraya.models.entities.User;
import com.grupo04.ahorraya.services.OfferServices;
import com.grupo04.ahorraya.services.UserServices;
import com.grupo04.ahorraya.utils.RequestErrorHandler;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/offer")
public class OfferController {
    @Autowired
    private OfferServices offerService;

    @Autowired
    private UserServices userService;

    @Autowired
    private RequestErrorHandler errorHandler;

    //Crear oferta
    @PostMapping("/")
    @Transactional(rollbackOn = Exception.class)
    public ResponseEntity<?> createOffer(@RequestBody @Valid OfferDTO info, BindingResult validations) throws Exception {
        if (validations.hasErrors()) {
            return ResponseEntity.badRequest().body(errorHandler.mapErrors(validations.getFieldErrors()));
        }

        User userFound = userService.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try {
            UUID offerID = offerService.createOffer(info);
            return new ResponseEntity<>(new MessageDTO(offerID.toString()), HttpStatus.OK);
        } catch (Exception e) {
           return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/")
    @Transactional(rollbackOn = Exception.class)
    public ResponseEntity<?> updateOffer(@RequestBody @Valid OfferUpdateDTO info, BindingResult validations) throws Exception {
        if (validations.hasErrors()) {
            return ResponseEntity.badRequest().body(errorHandler.mapErrors(validations.getFieldErrors()));
        }

        User userFound = userService.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try {
            offerService.updateOffer(info);
            return new ResponseEntity<>(new MessageDTO("Offer Updated!"), HttpStatus.OK);
        } catch (Exception e) {
           return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    @Transactional(rollbackOn = Exception.class)
    public ResponseEntity<?> deleteOffer(@PathVariable("id") UUID id) throws Exception {
        User userFound = userService.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try {
            offerService.deleteOffer(id);
            return new ResponseEntity<>(new MessageDTO("Offer Deleted!"), HttpStatus.OK);
        } catch (Exception e) {
           return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllOffers() {
        return new ResponseEntity<>(offerService.getAllOffers(), HttpStatus.OK);
    }
    
    @GetMapping("/name/{name}")
    public ResponseEntity<?> getByName(@PathVariable("name") String name) {
        User userFound = userService.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try {
            return new ResponseEntity<>(offerService.getOffersByName(name), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOfferById(@PathVariable("id") UUID id) {
        return new ResponseEntity<>(offerService.getOfferById(id), HttpStatus.OK);
    }

    @GetMapping("/active/{active}")
    public ResponseEntity<?> getOfferByActive(@PathVariable("active") Boolean active) {
        return new ResponseEntity<>(offerService.getOfferByActive(active), HttpStatus.OK);
    }

}
