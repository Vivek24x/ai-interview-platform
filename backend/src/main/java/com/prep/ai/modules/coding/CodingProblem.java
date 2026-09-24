package com.prep.ai.modules.coding;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "coding_problems")
@CompoundIndex(name = "difficulty_tags_idx", def = "{'difficulty': 1, 'tags': 1}")
public class CodingProblem {

    @Id
    private String id;

    @Indexed(unique = true)
    private String title;

    private String slug;

    private String difficulty; // EASY, MEDIUM, HARD

    private List<String> tags; // Array, Two Pointers, Dynamic Programming

    private List<String> companies; // Google, Amazon, Microsoft

    private String description;

    private List<String> constraints;

    private List<String> hints;

    private Map<String, String> starterCode; // e.g., "java": "class Solution..."

    private List<TestCase> testCases;

    @Builder.Default
    private int totalSubmissions = 0;

    @Builder.Default
    private int acceptedSubmissions = 0;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TestCase {
        private String input;
        private String expectedOutput;
        private boolean isPublic;
    }
}
