package com.prep.ai.modules.resume;

import com.prep.ai.client.FastApiClient;
import com.prep.ai.common.ApiResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "resume_reviews")
class ResumeReview {
    @Id
    private String id;
    private String userId;
    private String fileName;
    private int atsScore;
    private List<String> extractedSkills;
    private List<String> missingRecommended;
    private Map<String, Object> sectionScores;
    @CreatedDate
    private Instant createdAt;
}

@Repository
interface ResumeReviewRepository extends MongoRepository<ResumeReview, String> {
    List<ResumeReview> findByUserIdOrderByCreatedAtDesc(String userId);
}

@RestController
@RequestMapping("/resumes")
@RequiredArgsConstructor
public class ResumeController {

    private final FastApiClient fastApiClient;
    private final ResumeReviewRepository resumeReviewRepository;

    @PostMapping(value = "/analyze", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Mono<ResponseEntity<ApiResponse<Map>>> analyzeResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "targetRole", defaultValue = "Software Engineer") String targetRole,
            Authentication auth) throws IOException {

        byte[] bytes = file.getBytes();
        String originalFilename = file.getOriginalFilename();

        return fastApiClient.analyzeResume(bytes, originalFilename, targetRole)
                .map(result -> ResponseEntity.ok(ApiResponse.success(result, "Resume analyzed successfully")));
    }

    @GetMapping("/my-history")
    public ResponseEntity<ApiResponse<List<ResumeReview>>> getHistory(Authentication auth) {
        String userId = auth != null ? auth.getName() : "student-demo-id";
        return ResponseEntity.ok(ApiResponse.success(resumeReviewRepository.findByUserIdOrderByCreatedAtDesc(userId)));
    }
}
