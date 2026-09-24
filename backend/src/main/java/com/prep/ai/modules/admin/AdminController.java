package com.prep.ai.modules.admin;

import com.prep.ai.common.ApiResponse;
import com.prep.ai.modules.auth.UserRepository;
import com.prep.ai.modules.coding.CodingProblem;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Repository
interface AdminProblemRepository extends MongoRepository<CodingProblem, String> {}

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final AdminProblemRepository problemRepository;

    @GetMapping("/metrics")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getTelemetry() {
        return ResponseEntity.ok(ApiResponse.success(Map.of(
                "totalUsers", userRepository.count(),
                "totalProblems", problemRepository.count(),
                "aiServiceStatus", "HEALTHY",
                "systemLoad", "NORMAL"
        )));
    }

    @PostMapping("/problems")
    public ResponseEntity<ApiResponse<CodingProblem>> createProblem(@RequestBody CodingProblem problem) {
        CodingProblem saved = problemRepository.save(problem);
        return ResponseEntity.ok(ApiResponse.success(saved, "Coding problem created successfully"));
    }
}
