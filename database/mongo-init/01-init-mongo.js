// MongoDB Database Initialization Script for PrepAI

db = db.getSiblingDB('prep_ai_db');

print('>>> Initializing PrepAI MongoDB Collections & Indexes...');

// 1. Users Collection
db.createCollection('users');
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "totalPoints": -1 });
db.users.createIndex({ "streakDays": -1 });

// Seed Default Admin User (password is BCrypt for 'admin123')
db.users.insertOne({
  email: "admin@prepai.com",
  password: "$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi",
  fullName: "System Administrator",
  college: "Headquarters",
  targetRole: "Platform Admin",
  roles: ["ROLE_ADMIN", "ROLE_STUDENT"],
  streakDays: 30,
  totalPoints: 5000,
  problemsSolved: 120,
  emailVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

// 2. Coding Problems Collection
db.createCollection('coding_problems');
db.coding_problems.createIndex({ "slug": 1 }, { unique: true });
db.coding_problems.createIndex({ "difficulty": 1, "tags": 1 });
db.coding_problems.createIndex({ "title": "text", "description": "text" });

// Seed Sample Problem
db.coding_problems.insertOne({
  title: "Two Sum",
  slug: "two-sum",
  difficulty: "EASY",
  tags: ["Array", "Hash Table"],
  companies: ["Google", "Amazon", "Microsoft", "Meta"],
  description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists."
  ],
  hints: [
    "A brute force approach checks all pairs in O(n^2).",
    "Can you use a HashMap to achieve linear O(n) time?"
  ],
  starterCode: {
    java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{};\n    }\n}",
    python: "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Your code here\n        return []"
  },
  testCases: [
    { input: "[2,7,11,15]\n9", expectedOutput: "[0,1]", isPublic: true },
    { input: "[3,2,4]\n6", expectedOutput: "[1,2]", isPublic: true },
    { input: "[3,3]\n6", expectedOutput: "[0,1]", isPublic: false }
  ],
  totalSubmissions: 450,
  acceptedSubmissions: 395
});

// 3. Mock Interviews Collection
db.createCollection('mock_interviews');
db.mock_interviews.createIndex({ "userId": 1, "createdAt": -1 });
db.mock_interviews.createIndex({ "status": 1 });

// 4. Resume Reviews Collection
db.createCollection('resume_reviews');
db.resume_reviews.createIndex({ "userId": 1, "createdAt": -1 });

// 5. Quizzes & Tests Collection
db.createCollection('quizzes');
db.quizzes.createIndex({ "topic": 1, "difficulty": 1 });

print('>>> PrepAI MongoDB Initialized Successfully!');
