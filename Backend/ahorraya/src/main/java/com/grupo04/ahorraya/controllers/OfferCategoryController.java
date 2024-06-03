package com.grupo04.ahorraya.controllers;

import com.grupo04.ahorraya.models.dtos.MessageDTO;
import com.grupo04.ahorraya.models.dtos.OfferCategoryDTO;
import com.grupo04.ahorraya.models.entities.User;
import com.grupo04.ahorraya.services.OfferCategoryServices;
import com.grupo04.ahorraya.services.UserServices;
import com.grupo04.ahorraya.utils.RequestErrorHandler;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/offer-category")
public class OfferCategoryController {
    @Autowired
    private OfferCategoryServices offerCategoryServices;

    @Autowired
    private UserServices userService;

    @Autowired
    RequestErrorHandler errorHandler;

    @PostMapping("/")
    public ResponseEntity<?> createOfferCategory(@RequestBody @Valid OfferCategoryDTO info, BindingResult validations)throws Exception {
        if (validations.hasErrors())
            return ResponseEntity.badRequest().body(errorHandler.mapErrors(validations.getFieldErrors()));

        User userFound = userService.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try {
            offerCategoryServices.createOfferCategory(info);
            return ResponseEntity.ok("Offer-Category created successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/")
    public ResponseEntity<?> updateOfferCategory(@RequestBody @Valid OfferCategoryDTO info, BindingResult validations) throws Exception {
        if (validations.hasErrors())
            return ResponseEntity.badRequest().body(errorHandler.mapErrors(validations.getFieldErrors()));

        User userFound = userService.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try {
            offerCategoryServices.updateOfferCategory(info);
            return new ResponseEntity<>(new MessageDTO("Offer-Category Created!"), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/")
    public ResponseEntity<?> deleteOfferCategory(@RequestBody @Valid OfferCategoryDTO info, BindingResult validations) throws Exception {
        if (validations.hasErrors())
            return ResponseEntity.badRequest().body(errorHandler.mapErrors(validations.getFieldErrors()));

        User userFound = userService.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try {
            offerCategoryServices.deleteOfferCategory(info);
            return new ResponseEntity<>(new MessageDTO("Offer-Category deleted successfully"), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOfferCategoryById(@PathVariable UUID id) throws Exception {
        User userFound = userService.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try {
            offerCategoryServices.deleteOfferCategoryById(id);
            return new ResponseEntity<>(new MessageDTO("Offer-Category deleted successfully!"), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/all")
    public ResponseEntity<?> deleteAllOfferCategories() throws Exception {
        User userFound = userService.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try {
            offerCategoryServices.deleteAllOfferCategories();
            return new ResponseEntity<>(new MessageDTO("All Offer-Categories deleted successfully!"), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllOfferCategories() {
        User userFound = userService.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try {
            return new ResponseEntity<>(offerCategoryServices.getAllOfferCategories(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOfferCategoryById(@PathVariable UUID id) {
        User userFound = userService.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try {
            return new ResponseEntity<>(offerCategoryServices.getOfferCategoryById(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
