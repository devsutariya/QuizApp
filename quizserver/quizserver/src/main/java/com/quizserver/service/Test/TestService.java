package com.quizserver.service.Test;

import java.util.List;

import com.quizserver.dto.QuestionDTO;
import com.quizserver.dto.SubmitTestDTO;
import com.quizserver.dto.TestDTO;
import com.quizserver.dto.TestDetailsDTO;
import com.quizserver.dto.TestResultDTO;



public interface TestService {
    TestDTO createTest(TestDTO dto);
    QuestionDTO addQuestionInTest(QuestionDTO dto);
    List<TestDTO> getAllTest();
    TestDetailsDTO getAllQuestionsByTest(Long id);
    TestResultDTO submitTest(SubmitTestDTO request);
    List<TestResultDTO> getAllTestResults();
    List<TestResultDTO> getAllTestResultsByUserId(Long userId);
}
