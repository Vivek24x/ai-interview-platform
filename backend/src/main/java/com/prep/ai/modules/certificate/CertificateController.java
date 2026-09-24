package com.prep.ai.modules.certificate;

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
import java.util.Optional;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "certificates")
class Certificate {
    @Id
    private String id;
    private String certNumber;
    private String userId;
    private String recipientName;
    private String trackTitle;
    private String sha256VerificationHash;
    private Instant issuedAt;
}

@Repository
interface CertificateRepository extends MongoRepository<Certificate, String> {
    List<Certificate> findByUserId(String userId);
    Optional<Certificate> findByCertNumber(String certNumber);
}

@RestController
@RequestMapping("/certificates")
@RequiredArgsConstructor
public class CertificateController {

    private final CertificateRepository certificateRepository;

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<Certificate>>> getMyCertificates(Authentication auth) {
        String userId = auth != null ? auth.getName() : "student-demo-id";
        return ResponseEntity.ok(ApiResponse.success(certificateRepository.findByUserId(userId)));
    }

    @GetMapping("/verify/{certNumber}")
    public ResponseEntity<ApiResponse<Certificate>> verifyCertificate(@PathVariable String certNumber) {
        Certificate cert = certificateRepository.findByCertNumber(certNumber)
                .orElseThrow(() -> new RuntimeException("Certificate not found or invalid"));
        return ResponseEntity.ok(ApiResponse.success(cert, "Certificate successfully verified"));
    }
}
