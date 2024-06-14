package com.grupo04.ahorraya.controllers;

import com.grupo04.ahorraya.models.dtos.MessageDTO;
import com.grupo04.ahorraya.models.dtos.TokenDTO;
import com.grupo04.ahorraya.models.entities.User;
import com.grupo04.ahorraya.services.UserServices;
import com.grupo04.ahorraya.utils.RequestErrorHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserServices userService;

    @Autowired
    private RequestErrorHandler errorHandler;

    //REVISION
    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(@RequestBody TokenDTO token) {
        User userFound = userService.findUserAuthenticated();
        if (userFound == null)
            return new ResponseEntity<>(new MessageDTO("User not authenticated"), HttpStatus.NOT_FOUND);

        try {
            User user = userService.getUserFromToken(token.getToken());
            userService.toggleToken(user);
            return new ResponseEntity<>(new MessageDTO("User logged out"), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
