package com.grupo04.ahorraya.controllers;

import com.grupo04.ahorraya.models.dtos.DepartamentDTO;
import com.grupo04.ahorraya.models.dtos.MessageDTO;
import com.grupo04.ahorraya.models.entities.Departament;
import com.grupo04.ahorraya.models.entities.User;
import com.grupo04.ahorraya.services.DepartamentServices;
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
@RequestMapping("/departament")
public class DepartamentController {

    @Autowired
    private UserServices userServices;

    @Autowired
    private DepartamentServices departamentServices;

    @Autowired
    private RequestErrorHandler errorHandler;

    @PostMapping("/")
    public ResponseEntity<?> saveDepartament(@RequestBody @Valid DepartamentDTO info, BindingResult validations) throws Exception{
        if (validations.hasErrors()) {
            return new ResponseEntity<>(errorHandler.mapErrors(validations.getFieldErrors()), HttpStatus.BAD_REQUEST);
        }

        User userFound = userServices.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try{
            departamentServices.save(info);
            return new ResponseEntity<>(new MessageDTO("Departament created!"), HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<?> deleteDepartament(@PathVariable String name) throws Exception{
        User userFound = userServices.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try{
            departamentServices.deleteByName(name);
            return new ResponseEntity<>(new MessageDTO("Departament deleted!"), HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllDepartaments(){
        User userFound = userServices.findUserAuthenticated();
        if (userFound == null) {
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
        }

        List<Departament> departaments = departamentServices.findAll();
        return new ResponseEntity<>(departaments, HttpStatus.OK);
    }

    @GetMapping("/{name}")
    public ResponseEntity<?> getDepartamentByName(@PathVariable String name){
        User userFound = userServices.findUserAuthenticated();
        if (userFound == null) {
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
        }

        Departament departamentFound = departamentServices.findByName(name);
        if (departamentFound == null){
            return new ResponseEntity<>(new MessageDTO("Municipality not found"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(departamentFound, HttpStatus.OK);
    }

    @GetMapping("/stores/{id}")
    public ResponseEntity<?> getStoresByDepartament(@PathVariable UUID id){

        User userFound = userServices.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        Departament departament = departamentServices.findByID(id);
        if (departament == null){
            return new ResponseEntity<>(new MessageDTO("Departament not found"), HttpStatus.NOT_FOUND);
        }

        try{
            return new ResponseEntity<>(departamentServices.getStoresByDepartament(departament), HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
