package com.quizserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizserver.entities.Question;

public interface  QuestionRepository extends JpaRepository<Question, Long> {
    
}
