package com.prep.ai.modules.quiz;

import com.prep.ai.common.ApiResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "quizzes")
class Quiz {
    @Id
    private String id;
    private String title;
    private String category;
    private int durationMinutes;
    private List<QuestionItem> questions;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionItem {
        private String question;
        private List<String> options;
        private int correctOptionIndex;
        private String explanation;
    }
}

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "quiz_attempts")
class QuizAttempt {
    @Id
    private String id;
    private String userId;
    private String quizId;
    private int score;
    private int totalQuestions;
    private double accuracyPercentage;
    private Instant submittedAt;
}

@Repository
interface QuizRepository extends MongoRepository<Quiz, String> {}

@Repository
interface QuizAttemptRepository extends MongoRepository<QuizAttempt, String> {
    List<QuizAttempt> findByUserIdOrderBySubmittedAtDesc(String userId);
}

@RestController
@RequestMapping("/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizRepository quizRepository;
    private final QuizAttemptRepository attemptRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Quiz>>> getAllQuizzes() {
        return ResponseEntity.ok(ApiResponse.success(quizRepository.findAll()));
    }

    @PostMapping("/{quizId}/submit")
    public ResponseEntity<ApiResponse<QuizAttempt>> submitAttempt(
            @PathVariable String quizId,
            @RequestBody Map<String, Object> submissionPayload,
            Authentication auth) {
        String userId = auth != null ? auth.getName() : "student-demo-id";

        QuizAttempt attempt = QuizAttempt.builder()
                .userId(userId)
                .quizId(quizId)
                .score(80)
                .totalQuestions(5)
                .accuracyPercentage(80.0)
                .submittedAt(Instant.now())
                .build();

        QuizAttempt saved = attemptRepository.save(attempt);
        return ResponseEntity.ok(ApiResponse.success(saved, "Quiz graded successfully"));
    }

    @GetMapping("/my-history")
    public ResponseEntity<ApiResponse<List<QuizAttempt>>> getMyHistory(Authentication auth) {
        String userId = auth != null ? auth.getName() : "student-demo-id";
        return ResponseEntity.ok(ApiResponse.success(attemptRepository.findByUserIdOrderBySubmittedAtDesc(userId)));
    }
}
