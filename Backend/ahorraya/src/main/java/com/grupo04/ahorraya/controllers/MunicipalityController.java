package com.grupo04.ahorraya.controllers;

import com.grupo04.ahorraya.models.dtos.MessageDTO;
import com.grupo04.ahorraya.models.dtos.MunicipalityDTO;
import com.grupo04.ahorraya.models.entities.Municipality;
import com.grupo04.ahorraya.models.entities.User;
import com.grupo04.ahorraya.services.MunicipalityServices;
import com.grupo04.ahorraya.services.UserServices;
import com.grupo04.ahorraya.utils.RequestErrorHandler;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/municipality")
public class MunicipalityController {
    @Autowired
    private MunicipalityServices municipalityServices;

    @Autowired
    private UserServices userServices;

    @Autowired
    private RequestErrorHandler errorHandler;

    @PostMapping("/")
    public ResponseEntity<?> saveMunicipality(@RequestBody @Valid MunicipalityDTO info, BindingResult validations) throws Exception{
        if (validations.hasErrors()) {
            return new ResponseEntity<>(errorHandler.mapErrors(validations.getFieldErrors()), HttpStatus.BAD_REQUEST);
        }

        User userFound = userServices.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try{
            municipalityServices.save(info);
            return new ResponseEntity<>(new MessageDTO("Municipality created!"), HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<?> deleteMunicipality(@PathVariable String name) throws Exception{
        User userFound = userServices.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try{
            municipalityServices.deleteByName(name);
            return new ResponseEntity<>(new MessageDTO("Municipality deleted!"), HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllMunicipalities(){
        User userFound = userServices.findUserAuthenticated();
        if (userFound == null) {
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
        }

        List<Municipality> municipalities = municipalityServices.findALL();
        return new ResponseEntity<>(municipalities, HttpStatus.OK);
    }

    @GetMapping("/{name}")
    public ResponseEntity<?> getMunicipalityByName(@PathVariable String name){
        User userFound = userServices.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        Municipality municipalityFound = municipalityServices.findByName(name);
        if (municipalityFound == null){
            return new ResponseEntity<>(new MessageDTO("Municipality not found"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(municipalityFound, HttpStatus.OK);
    }

    @GetMapping("/stores/{name}")
    public ResponseEntity<?> getStoresByMunicipality(@PathVariable String name){

        User userFound = userServices.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        Municipality municipality = municipalityServices.findByName(name);
        if (municipality == null){
            return new ResponseEntity<>(new MessageDTO("Municipality not found"), HttpStatus.NOT_FOUND);
        }

        try{
            return new ResponseEntity<>(municipalityServices.getStoresByMunicipality(municipality.getName()), HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
