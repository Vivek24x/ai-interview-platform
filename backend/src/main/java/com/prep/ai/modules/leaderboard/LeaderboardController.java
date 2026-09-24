package com.prep.ai.modules.leaderboard;

import com.prep.ai.common.ApiResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
class LeaderboardEntryDto {
    private int rank;
    private String userId;
    private String name;
    private String college;
    private double score;
    private int streak;
}

@RestController
@RequestMapping("/leaderboard")
@RequiredArgsConstructor
public class LeaderboardController {

    private final StringRedisTemplate redisTemplate;
    private static final String LEADERBOARD_KEY = "leaderboard:global";

    @GetMapping("/global")
    public ResponseEntity<ApiResponse<List<LeaderboardEntryDto>>> getGlobalLeaderboard(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        List<LeaderboardEntryDto> entries = new ArrayList<>();
        try {
            Set<ZSetOperations.TypedTuple<String>> scoredMembers =
                    redisTemplate.opsForZSet().reverseRangeWithScores(LEADERBOARD_KEY, (long) page * size, (long) (page + 1) * size - 1);

            if (scoredMembers != null) {
                int rank = page * size + 1;
                for (ZSetOperations.TypedTuple<String> tuple : scoredMembers) {
                    entries.add(LeaderboardEntryDto.builder()
                            .rank(rank++)
                            .userId(tuple.getValue())
                            .name(tuple.getValue())
                            .college("Tech Institute")
                            .score(tuple.getScore() != null ? tuple.getScore() : 0.0)
                            .streak(5)
                            .build());
                }
            }
        } catch (Exception e) {
            // Fallback sample data when Redis is offline
            entries = List.of(
                    new LeaderboardEntryDto(1, "u1", "Siddharth Rao", "IIT Bombay", 3420, 42),
                    new LeaderboardEntryDto(2, "u2", "Ananya Sharma", "BITS Pilani", 3190, 38),
                    new LeaderboardEntryDto(3, "u3", "Alex Mercer", "State Tech University", 2890, 26)
            );
        }

        return ResponseEntity.ok(ApiResponse.success(entries));
    }
}
