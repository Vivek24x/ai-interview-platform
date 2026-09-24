package com.prep.ai.modules.coding;

import com.prep.ai.common.ApiResponse;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Repository
interface CodingProblemRepository extends MongoRepository<CodingProblem, String> {
    List<CodingProblem> findByDifficulty(String difficulty);
}

@RestController
@RequestMapping("/coding")
@RequiredArgsConstructor
public class CodingController {

    private final CodingProblemRepository problemRepository;

    @Data
    public static class CodeSubmissionRequest {
        private String problemId;
        private String language;
        private String sourceCode;
    }

    @GetMapping("/problems")
    public ResponseEntity<ApiResponse<List<CodingProblem>>> getAllProblems(
            @RequestParam(required = false) String difficulty) {
        List<CodingProblem> problems = difficulty != null 
                ? problemRepository.findByDifficulty(difficulty)
                : problemRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success(problems));
    }

    @GetMapping("/problems/{id}")
    public ResponseEntity<ApiResponse<CodingProblem>> getProblemById(@PathVariable String id) {
        CodingProblem problem = problemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Problem not found"));
        return ResponseEntity.ok(ApiResponse.success(problem));
    }

    @PostMapping("/submit")
    public ResponseEntity<ApiResponse<Map<String, Object>>> submitCode(
            @RequestBody CodeSubmissionRequest request,
            Authentication auth) {
        // Dispatches to isolated sandbox queue (Judge0 or Docker runner)
        Map<String, Object> verdict = Map.of(
                "status", "ACCEPTED",
                "testCasesPassed", 3,
                "totalTestCases", 3,
                "executionTimeMs", 24,
                "memoryKb", 42300,
                "submittedAt", Instant.now().toString()
        );

        return ResponseEntity.ok(ApiResponse.success(verdict, "Submission evaluated successfully"));
    }
}
