package com.grupo04.ahorraya.services;

import com.grupo04.ahorraya.models.dtos.ChangePasswordDTO;
import com.grupo04.ahorraya.models.dtos.LoginDTO;
import com.grupo04.ahorraya.models.dtos.RegisterDTO;
import com.grupo04.ahorraya.models.entities.Token;
import com.grupo04.ahorraya.models.entities.User;

public interface UserServices {
    void save(RegisterDTO info) throws Exception;
    void login(LoginDTO info) throws Exception;
    void changePassword(ChangePasswordDTO info) throws Exception;
    Token registerToken(User user) throws Exception;
    Boolean isTokenValid(User user, String token);
    void cleanTokens(User user) throws Exception;
    User getUserFromToken (String info);
    Boolean comparePass(String toCompare, String current);
    void toggleToken(User user);
    User findUserAuthenticated();
    User findByUsername(String email);

}
