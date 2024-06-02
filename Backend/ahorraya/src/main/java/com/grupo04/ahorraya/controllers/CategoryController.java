package com.grupo04.ahorraya.controllers;

import com.grupo04.ahorraya.Repository.CategoryRepository;
import com.grupo04.ahorraya.models.dtos.CategoryDTO;
import com.grupo04.ahorraya.models.dtos.MessageDTO;
import com.grupo04.ahorraya.models.dtos.TokenDTO;
import com.grupo04.ahorraya.models.entities.User;
import com.grupo04.ahorraya.services.CategoryServices;
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
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryServices categoryService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserServices userService;

    @Autowired
    private RequestErrorHandler errorHandler;

    @PostMapping("/")
    public ResponseEntity<?> createCategory(@RequestBody @Valid CategoryDTO categoryDTO, BindingResult validations)throws Exception {
        if (validations.hasErrors()) {
            return ResponseEntity.badRequest().body(errorHandler.mapErrors(validations.getFieldErrors()));
        }

        User userFound = userService.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try {
            categoryService.saveCategory(categoryDTO);
            return new ResponseEntity<>(new MessageDTO("User Created!"), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateCategory(@RequestBody @Valid CategoryDTO categoryDTO, BindingResult validations) throws Exception {
        if (validations.hasErrors()) {
            return ResponseEntity.badRequest().body(errorHandler.mapErrors(validations.getFieldErrors()));
        }
        User userFound = userService.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try {
            categoryService.updateCategory(categoryDTO);
            return new ResponseEntity<>(new MessageDTO("User Updated!"), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/")
    public ResponseEntity<?> deleteCategory(@RequestBody @Valid CategoryDTO categoryDTO, BindingResult validations) throws Exception {
        if (validations.hasErrors()) {
            return ResponseEntity.badRequest().body(errorHandler.mapErrors(validations.getFieldErrors()));
        }
        User userFound = userService.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
        try {
            UUID idCategory =  categoryRepository.findByName(categoryDTO.getName()).getIdCategory();
            categoryService.deleteCategory(idCategory);
            return new ResponseEntity<>(new MessageDTO("User Deleted!"), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllCategories() {
        User userFound = userService.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
        try {
            return new ResponseEntity<>(categoryService.getAllCategories(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable UUID id) {
        User userFound = userService.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
        try {
            return new ResponseEntity<>(categoryService.getCategoryById(id), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //All offers by category
    @GetMapping("/offer/{id}")
    public ResponseEntity<?> getOfferByCategoryId(@PathVariable UUID id) {
        User userFound = userService.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
        try {
            return new ResponseEntity<>(categoryService.findOfferByIdCategory(id), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //All offers by category and active
    @GetMapping("/offer/active/{id}")
    public ResponseEntity<?> getStoreByCategoryId(@PathVariable UUID id) {
        User userFound = userService.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);
        try {
            return new ResponseEntity<>(categoryService.findOfferByActiveAndCategoryId(true,id), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
