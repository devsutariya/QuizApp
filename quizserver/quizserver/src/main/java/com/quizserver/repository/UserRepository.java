package com.quizserver.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizserver.entities.User;
import com.quizserver.enums.UserRole;

public interface UserRepository extends JpaRepository<User, Long>  {
    Optional<User> findByEmail(String email);
    User findByRole(UserRole role);
}
