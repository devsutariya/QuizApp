package com.quizserver.entities;

import com.quizserver.dto.QuestionDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Question {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String questionText;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String answer;

    @ManyToOne
    @JoinColumn(name = "test_id")
    private Test test;

    public QuestionDTO getDto(){
        QuestionDTO questionDTO = new QuestionDTO();
        questionDTO.setId(id);
        questionDTO.setQuestionText(questionText);
        questionDTO.setOptionA(optionA);
        questionDTO.setOptionB(optionB);
        questionDTO.setOptionC(optionC);
        questionDTO.setOptionD(optionD);
        questionDTO.setAnswer(answer);
        return questionDTO;
    }
}
