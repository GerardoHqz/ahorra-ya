package com.grupo04.ahorraya.controllers;

import com.grupo04.ahorraya.models.dtos.FavoriteDTO;
import com.grupo04.ahorraya.models.dtos.MessageDTO;
import com.grupo04.ahorraya.models.entities.User;
import com.grupo04.ahorraya.services.FavoriteServices;
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
@RequestMapping("/favorite")
public class FavoriteController {
    @Autowired
    private FavoriteServices favoriteServices;

    @Autowired
    private UserServices userService;

    @Autowired
    private RequestErrorHandler errorHandler;

    @PostMapping("/")
    public ResponseEntity<?> addFavorite(@RequestBody @Valid FavoriteDTO info, BindingResult validations) throws Exception {
        if (validations.hasErrors()) {
            return ResponseEntity.badRequest().body(errorHandler.mapErrors(validations.getFieldErrors()));
        }

        User userFound = userService.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try {
            favoriteServices.addFavorite(info.getStore(), userFound.getIdUser());
            return new ResponseEntity<>(new MessageDTO("Favorite added successfully!"), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{storeId}")
    public ResponseEntity<?> removeFavorite(@PathVariable("storeId") UUID storeId) {
    	User userFound = userService.findUserAuthenticated();
    	if (userFound == null)
    		return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);		
    	try {
    		favoriteServices.removeFavorite(userFound.getIdUser(), storeId);
    		return new ResponseEntity<>(new MessageDTO("Favorite removed successfully!"), HttpStatus.OK);
    	} catch (Exception e) {
    		return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }


    @GetMapping("/")
    public ResponseEntity<?> getFavorites() {
        User userFound = userService.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try {
            return new ResponseEntity<>(favoriteServices.getFavorites(userFound.getIdUser()), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/{storeId}")
    public ResponseEntity<?> getOneFavorite(@PathVariable("storeId") UUID storeId) throws Exception {
    	User userFound = userService.findUserAuthenticated();
    	if (userFound == null)
    		return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);		
    	try {
    		return new ResponseEntity<>(favoriteServices.getOneFavorite(userFound.getIdUser(), storeId), HttpStatus.OK);
    	} catch (Exception e) {
    		return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }

}
