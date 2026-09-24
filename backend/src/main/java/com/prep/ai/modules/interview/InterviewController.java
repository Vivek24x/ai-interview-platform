package com.prep.ai.modules.interview;

import com.prep.ai.client.FastApiClient;
import com.prep.ai.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Repository
interface MockInterviewRepository extends MongoRepository<MockInterviewSession, String> {
    List<MockInterviewSession> findByUserIdOrderByCreatedAtDesc(String userId);
}

@RestController
@RequestMapping("/interviews")
@RequiredArgsConstructor
public class InterviewController {

    private final MockInterviewRepository interviewRepository;
    private final FastApiClient fastApiClient;

    @PostMapping("/start")
    public ResponseEntity<ApiResponse<MockInterviewSession>> startSession(
            @RequestBody Map<String, String> request,
            Authentication auth) {
        String userId = auth != null ? auth.getName() : "student-demo-id";

        MockInterviewSession session = MockInterviewSession.builder()
                .userId(userId)
                .interviewType(request.getOrDefault("interviewType", "TECHNICAL"))
                .targetRole(request.getOrDefault("targetRole", "Software Engineer"))
                .targetCompany(request.getOrDefault("targetCompany", "General Tech"))
                .build();

        // Initial welcome message from AI
        session.getTranscript().add(MockInterviewSession.InterviewMessage.builder()
                .sender("AI_INTERVIEWER")
                .content("Welcome to your mock interview for " + session.getTargetRole() + ". Let's begin! Can you introduce yourself and walk me through an interesting technical project you built recently?")
                .timestamp(Instant.now())
                .build());

        MockInterviewSession saved = interviewRepository.save(session);
        return ResponseEntity.ok(ApiResponse.success(saved, "Interview session initiated"));
    }

    @PostMapping("/{sessionId}/reply")
    public Mono<ResponseEntity<ApiResponse<Map>>> replyToInterviewer(
            @PathVariable String sessionId,
            @RequestBody Map<String, Object> candidateMessage,
            Authentication auth) {
        return fastApiClient.evaluateInterviewTurn(Map.of(
                "sessionId", sessionId,
                "candidateResponse", candidateMessage.get("content")
        )).map(result -> ResponseEntity.ok(ApiResponse.success(result, "AI evaluation evaluated")));
    }

    @GetMapping("/my-history")
    public ResponseEntity<ApiResponse<List<MockInterviewSession>>> getUserHistory(Authentication auth) {
        String userId = auth != null ? auth.getName() : "student-demo-id";
        List<MockInterviewSession> history = interviewRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return ResponseEntity.ok(ApiResponse.success(history));
    }
}
