package com.prep.ai.config;

import com.prep.ai.modules.auth.User;
import com.prep.ai.modules.auth.UserRepository;
import com.prep.ai.modules.coding.CodingProblem;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Repository
interface DataInitProblemRepository extends MongoRepository<CodingProblem, String> {
    boolean existsBySlug(String slug);
}

@Slf4j
@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final DataInitProblemRepository problemRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        try {
            seedAdminUser();
            seedInitialProblems();
        } catch (Exception e) {
            log.warn("Database initialization skipped or deferred: {}", e.getMessage());
        }
    }

    private void seedAdminUser() {
        if (!userRepository.existsByEmail("admin@prepai.com")) {
            log.info("Seeding default Administrator user: admin@prepai.com");
            User admin = User.builder()
                    .email("admin@prepai.com")
                    .fullName("Platform Administrator")
                    .password(passwordEncoder.encode("admin123"))
                    .roles(Set.of("ROLE_ADMIN", "ROLE_STUDENT"))
                    .college("Global Tech Academy")
                    .targetRole("Platform Architect")
                    .streakDays(30)
                    .totalPoints(5000)
                    .problemsSolved(120)
                    .emailVerified(true)
                    .createdAt(Instant.now())
                    .build();
            userRepository.save(admin);
            log.info("Admin user created successfully!");
        }
    }

    private void seedInitialProblems() {
        if (!problemRepository.existsBySlug("two-sum")) {
            log.info("Seeding initial coding problems...");
            CodingProblem twoSum = CodingProblem.builder()
                    .title("Two Sum")
                    .slug("two-sum")
                    .difficulty("EASY")
                    .tags(List.of("Array", "Hash Table"))
                    .companies(List.of("Google", "Amazon", "Microsoft", "Meta"))
                    .description("Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.")
                    .constraints(List.of("2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9"))
                    .hints(List.of("Try using a HashMap to achieve linear O(n) lookup time."))
                    .starterCode(Map.of(
                            "java", "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int comp = target - nums[i];\n            if (map.containsKey(comp)) return new int[]{map.get(comp), i};\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}",
                            "python", "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        seen = {}\n        for i, n in enumerate(nums):\n            if target - n in seen: return [seen[target - n], i]\n            seen[n] = i\n        return []"
                    ))
                    .testCases(List.of(
                            new CodingProblem.TestCase("[2,7,11,15]\n9", "[0,1]", true),
                            new CodingProblem.TestCase("[3,2,4]\n6", "[1,2]", true),
                            new CodingProblem.TestCase("[3,3]\n6", "[0,1]", false)
                    ))
                    .build();

            CodingProblem validParen = CodingProblem.builder()
                    .title("Valid Parentheses")
                    .slug("valid-parentheses")
                    .difficulty("EASY")
                    .tags(List.of("Stack", "String"))
                    .companies(List.of("Amazon", "Bloomberg", "Google"))
                    .description("Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.")
                    .constraints(List.of("1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."))
                    .hints(List.of("Use a stack. Push expected closing brackets and pop when matched."))
                    .starterCode(Map.of(
                            "java", "class Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}",
                            "python", "class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        mapping = {')': '(', '}': '{', ']': '['}\n        for char in s:\n            if char in mapping:\n                if not stack or stack.pop() != mapping[char]: return False\n            else: stack.append(char)\n        return not stack"
                    ))
                    .testCases(List.of(
                            new CodingProblem.TestCase("()", "true", true),
                            new CodingProblem.TestCase("()[]{}", "true", true),
                            new CodingProblem.TestCase("(]", "false", false)
                    ))
                    .build();

            problemRepository.saveAll(List.of(twoSum, validParen));
            log.info("Initial coding problems seeded successfully!");
        }
    }
}
