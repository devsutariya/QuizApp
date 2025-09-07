package com.quizserver.service.user;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizserver.entities.User;
import com.quizserver.enums.UserRole;
import com.quizserver.repository.UserRepository;

import jakarta.annotation.PostConstruct;

@Service
public class UserServiceimpl implements UserService {
    
    @Autowired      
    private UserRepository userRepository;

    @PostConstruct
    private void createAdminUser(){
         User optionalUser = userRepository.findByRole(UserRole.ADMIN);
         if(optionalUser == null){
            User user = new User();
            user.setName("admin");
            user.setEmail("admin@gmail.com");
            user.setPassword("admin");
            user.setRole(UserRole.ADMIN);
            userRepository.save(user);
         }
    }

    public  Boolean hasUserWithEmail(String email){
        return userRepository.findByEmail(email).isPresent();

    }

    public User createUser(User user){
        user.setRole(UserRole.USER);
        return userRepository.save(user);
    }
 
    public User login(User user){
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
        if(optionalUser.isPresent() && user.getPassword().equals(optionalUser.get().getPassword())){
            return optionalUser.get();
        }
        return null; 
    }
}


