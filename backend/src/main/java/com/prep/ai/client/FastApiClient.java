package com.prep.ai.client;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Slf4j
@Service
public class FastApiClient {

    private final WebClient webClient;
    private final String internalSecret;

    public FastApiClient(
            @Value("${app.services.ai-service.base-url}") String baseUrl,
            @Value("${app.services.ai-service.secret}") String secret) {
        this.internalSecret = secret;
        this.webClient = WebClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader("X-Internal-Secret", secret)
                .build();
    }

    /**
     * Send resume bytes to FastAPI for PDF extraction and Gemini ATS evaluation
     */
    public Mono<Map> analyzeResume(byte[] fileBytes, String filename, String targetRole) {
        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        builder.part("file", new ByteArrayResource(fileBytes))
                .filename(filename);
        builder.part("target_role", targetRole);

        return webClient.post()
                .uri("/api/v1/resume/analyze")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData(builder.build()))
                .retrieve()
                .bodyToMono(Map.class)
                .doOnError(e -> log.error("Failed to call AI Resume Service: {}", e.getMessage()));
    }

    /**
     * Evaluate candidate's conversational turn in mock interview
     */
    public Mono<Map> evaluateInterviewTurn(Map<String, Object> payload) {
        return webClient.post()
                .uri("/api/v1/interview/evaluate-turn")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(payload)
                .retrieve()
                .bodyToMono(Map.class)
                .doOnError(e -> log.error("Failed to evaluate interview turn: {}", e.getMessage()));
    }
}
