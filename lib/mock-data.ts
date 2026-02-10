import type { Learner, SessionRecord } from "./auth-context"

export const initialLearners: Learner[] = [
  {
    id: "1",
    name: "Emma Johnson",
    age: 8,
    grade: "Grade 2",
    email: "emma@example.com",
    startDate: "1/15/2024",
  },
  {
    id: "2",
    name: "Liam Smith",
    age: 9,
    grade: "Grade 3",
    email: "liam@example.com",
    startDate: "2/1/2024",
  },
]

export const sessionHistory: SessionRecord[] = [
  { id: "1", date: "2024-01-20", learningMode: "Letter Recognition", duration: "12 min", attempts: 15, correct: 14, score: 92 },
  { id: "2", date: "2024-01-20", learningMode: "Word Formation", duration: "18 min", attempts: 10, correct: 9, score: 88 },
  { id: "3", date: "2024-01-19", learningMode: "Phonics Practice", duration: "15 min", attempts: 20, correct: 15, score: 76 },
  { id: "4", date: "2024-01-19", learningMode: "Braille Matching", duration: "10 min", attempts: 12, correct: 11, score: 95 },
  { id: "5", date: "2024-01-18", learningMode: "Guided Reading", duration: "20 min", attempts: 8, correct: 7, score: 82 },
  { id: "6", date: "2024-01-18", learningMode: "Free Exploration", duration: "25 min", attempts: 5, correct: 5, score: 98 },
  { id: "7", date: "2024-01-17", learningMode: "Letter Recognition", duration: "14 min", attempts: 18, correct: 15, score: 85 },
  { id: "8", date: "2024-01-17", learningMode: "Phonics Practice", duration: "16 min", attempts: 22, correct: 17, score: 79 },
]

export const learningModes = [
  {
    id: "letter-recognition",
    name: "Letter Recognition",
    description: "Learn to identify individual Braille letters and their corresponding sounds",
    level: "Beginner",
    icon: "letter" as const,
  },
  {
    id: "phonics-practice",
    name: "Phonics Practice",
    description: "Practice letter sounds and phonetic patterns with audio feedback",
    level: "Beginner",
    icon: "sound" as const,
  },
  {
    id: "word-formation",
    name: "Word Formation",
    description: "Build complete words by combining letters and understanding word structure",
    level: "Intermediate",
    icon: "word" as const,
  },
  {
    id: "braille-matching",
    name: "Braille Matching",
    description: "Match Braille patterns to letters, words, or pictures",
    level: "Beginner",
    icon: "matching" as const,
  },
  {
    id: "guided-reading",
    name: "Guided Reading",
    description: "Read simple stories with guided support and comprehension checks",
    level: "Advanced",
    icon: "reading" as const,
  },
  {
    id: "free-exploration",
    name: "Free Exploration",
    description: "Explore the Braille board freely without structured exercises",
    level: "All Levels",
    icon: "explore" as const,
  },
]

export const performanceData = [
  { mode: "Letter Recognition", avgScore: 88, sessions: 5 },
  { mode: "Phonics Practice", avgScore: 78, sessions: 4 },
  { mode: "Word Formation", avgScore: 90, sessions: 3 },
  { mode: "Braille Matching", avgScore: 92, sessions: 4 },
  { mode: "Guided Reading", avgScore: 72, sessions: 2 },
  { mode: "Free Exploration", avgScore: 95, sessions: 1 },
]

export const recentActivity = [
  { mode: "Letter Recognition", score: 92, duration: "12 min", date: "2024-01-20 10:30 AM" },
  { mode: "Word Formation", score: 88, duration: "18 min", date: "2024-01-20 09:15 AM" },
  { mode: "Phonics Practice", score: 76, duration: "15 min", date: "2024-01-19 02:45 PM" },
]
