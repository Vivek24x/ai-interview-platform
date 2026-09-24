package com.prep.ai.modules.interview;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "mock_interviews")
public class MockInterviewSession {

    @Id
    private String id;

    @Indexed
    private String userId;

    private String interviewType; // TECHNICAL, HR, BEHAVIORAL, SYSTEM_DESIGN

    private String targetRole;

    private String targetCompany;

    @Builder.Default
    private String status = "IN_PROGRESS"; // IN_PROGRESS, COMPLETED, CANCELLED

    @Builder.Default
    private List<InterviewMessage> transcript = new ArrayList<>();

    private Integer overallScore; // 0-100

    private Integer technicalAccuracyScore;

    private Integer communicationScore;

    private List<String> keyStrengths;

    private List<String> improvementAreas;

    private String detailedSummary;

    @CreatedDate
    private Instant createdAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class InterviewMessage {
        private String sender; // "AI_INTERVIEWER" or "CANDIDATE"
        private String content;
        private Instant timestamp;
        private Double clarityScore;
        private Double technicalDepthScore;
        private String quickCoachingTip;
    }
}
