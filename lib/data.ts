// Mock data for the portal
import type { User } from "./auth";

export interface TrainingModule {
  id: string;
  title: string;
  duration: string;
  type: "video" | "infographic" | "simulation" | "live-recording";
  phase: "phase-1" | "phase-2";
  description: string;
  script: string;
  videoUrl: string;
  tags: string[];
  badge?: string;
  completedBy?: string[];
  reviewStatus?: "pending" | "approved" | "needs-revision" | "draft";
  reviewedBy?: string;
  reviewedDate?: string;
  curriculumAlignment?: "aligned" | "needs-review" | "not-aligned";
  itResourcesAvailable?: boolean;
  lastUpdated?: string;
  createdBy?: string;
}

export interface District {
  id: string;
  name: string;
  completionPercentage: number;
  status: "planned" | "in-progress" | "completed";
  traineesEnrolled: number;
}

export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  userRole: User["role"];
  category:
    | "bug"
    | "suggestion"
    | "content-issue"
    | "login-problem"
    | "content-effectiveness"
    | "platform-usability";
  priority: "low" | "medium" | "high";
  message: string;
  status: "new" | "in-review" | "resolved";
  createdDate: string;
  moduleId?: string;
  moduleTitle?: string;
}

export interface ContentReview {
  id: string;
  moduleId: string;
  moduleTitle: string;
  reviewerId: string;
  reviewerName: string;
  reviewType: "script" | "video" | "audio-visual" | "module";
  status: "pending" | "approved" | "needs-revision";
  feedback: string;
  curriculumAlignment: "aligned" | "needs-review" | "not-aligned";
  createdDate: string;
  reviewedDate?: string;
  revisions?: string[];
}

export interface Scope {
  id: string;
  phase: "phase-1" | "phase-2";
  objective: string;
  duration: string;
  targetAudience: string;
  modules: number;
  status: "planned" | "in-progress" | "completed";
  startDate: string;
  endDate: string;
  description: string;
  deliverables: string[];
}

export const TRAINING_MODULES: TrainingModule[] = [
  {
    id: "1",
    title: "Foundation of Quality Education",
    duration: "25 mins",
    type: "video",
    phase: "phase-1",
    description:
      "Understanding the principles of quality education and student-centered learning approaches.",
    script:
      "This module covers the fundamental concepts of quality education including curriculum design, student engagement, and assessment strategies.",
    videoUrl: "/education-video.jpg",
    tags: ["25-35 mins", "video", "foundation"],
    badge: "Online & Offline Supported",
    completedBy: ["1"],
  },
  {
    id: "2",
    title: "Active Learning Strategies",
    duration: "30 mins",
    type: "simulation",
    phase: "phase-1",
    description:
      "Interactive simulation of modern classroom management and active learning techniques.",
    script:
      "Explore various active learning strategies including collaborative work, peer learning, and technology integration.",
    videoUrl: "/active-learning-concept.png",
    tags: ["30 mins", "simulation", "interactive"],
    badge: "Online & Offline Supported",
    reviewStatus: "pending",
    curriculumAlignment: "needs-review",
    itResourcesAvailable: true,
  },
  {
    id: "3",
    title: "Digital Tools in Education",
    duration: "28 mins",
    type: "infographic",
    phase: "phase-1",
    description:
      "Comprehensive guide to using digital tools and technology in modern classrooms.",
    script:
      "Learn about digital tools that enhance teaching effectiveness and student engagement in contemporary education.",
    videoUrl: "/digital-education-tools.jpg",
    tags: ["25-35 mins", "infographic"],
    badge: "Online & Offline Supported",
    completedBy: ["1"],
  },
  {
    id: "4",
    title: "Student Assessment Methods",
    duration: "32 mins",
    type: "video",
    phase: "phase-1",
    description:
      "Modern approaches to student assessment and formative evaluation.",
    script:
      "Discover innovative assessment methods including formative assessment, peer assessment, and self-assessment techniques.",
    videoUrl: "/assessment-methods.jpg",
    tags: ["30+ mins", "video"],
    badge: "Online & Offline Supported",
  },
  {
    id: "5",
    title: "Inclusive Classroom Practices",
    duration: "27 mins",
    type: "live-recording",
    phase: "phase-1",
    description:
      "Creating inclusive learning environments for all students including special needs learners.",
    script:
      "Learn strategies for creating inclusive classrooms that support diverse learning needs and abilities.",
    videoUrl: "/inclusive-education.jpg",
    tags: ["25-35 mins", "live-recording"],
    reviewStatus: "needs-revision",
    curriculumAlignment: "aligned",
    itResourcesAvailable: true,
    reviewedBy: "DPD Staff Officer",
    reviewedDate: "2025-11-10",
  },
  {
    id: "6",
    title: "Curriculum Development Basics",
    duration: "35 mins",
    type: "video",
    phase: "phase-1",
    description:
      "Fundamentals of curriculum planning and development aligned with national standards.",
    script:
      "Understand curriculum development processes, alignment with standards, and implementation strategies.",
    videoUrl: "/curriculum-concept.png",
    tags: ["30+ mins", "video"],
    badge: "Online & Offline Supported",
  },
  {
    id: "7",
    title: "Subject-Specific Pedagogy - Mathematics",
    duration: "33 mins",
    type: "simulation",
    phase: "phase-2",
    description:
      "Advanced teaching methods for mathematics with focus on conceptual understanding.",
    script:
      "Master modern approaches to teaching mathematics that promote deep understanding and problem-solving skills.",
    videoUrl: "/math-pedagogy.jpg",
    tags: ["30+ mins", "simulation"],
    completedBy: ["1"],
  },
  {
    id: "8",
    title: "Subject-Specific Pedagogy - Science",
    duration: "34 mins",
    type: "video",
    phase: "phase-2",
    description:
      "Inquiry-based learning and practical demonstrations for science education.",
    script:
      "Learn inquiry-based approaches and practical lab demonstrations for engaging science instruction.",
    videoUrl: "/science-pedagogy.jpg",
    tags: ["30+ mins", "video"],
    badge: "Online & Offline Supported",
  },
  {
    id: "9",
    title: "Teacher Professional Development",
    duration: "26 mins",
    type: "infographic",
    phase: "phase-2",
    description:
      "Continuous professional growth and reflective practice for teachers.",
    script:
      "Explore strategies for ongoing professional development, reflective practice, and career growth.",
    videoUrl: "/professional-development.jpg",
    tags: ["25-35 mins", "infographic"],
    reviewStatus: "draft",
    curriculumAlignment: "needs-review",
    itResourcesAvailable: false,
  },
  {
    id: "10",
    title: "Student Well-being and Mental Health",
    duration: "29 mins",
    type: "live-recording",
    phase: "phase-2",
    description:
      "Supporting student mental health and emotional well-being in educational settings.",
    script:
      "Learn about supporting student mental health and creating safe, supportive classroom environments.",
    videoUrl: "/student-wellbeing.jpg",
    tags: ["25-35 mins", "live-recording"],
  },
  {
    id: "11",
    title: "Community Engagement in Schools",
    duration: "31 mins",
    type: "video",
    phase: "phase-2",
    description:
      "Building partnerships with families and communities to support student learning.",
    script:
      "Understand how to engage families and communities effectively in the educational process.",
    videoUrl: "/community-engagement.png",
    tags: ["30+ mins", "video"],
    badge: "Online & Offline Supported",
  },
  {
    id: "12",
    title: "Leadership and School Management",
    duration: "36 mins",
    type: "simulation",
    phase: "phase-2",
    description:
      "Educational leadership and effective school management strategies.",
    script:
      "Explore leadership competencies and management approaches for educational institutions.",
    videoUrl: "/school-leadership.jpg",
    tags: ["30+ mins", "simulation"],
  },
];

export const DISTRICTS: District[] = [
  {
    id: "1",
    name: "Peshawar",
    completionPercentage: 78,
    status: "in-progress",
    traineesEnrolled: 145,
  },
  {
    id: "2",
    name: "Mardan",
    completionPercentage: 65,
    status: "in-progress",
    traineesEnrolled: 98,
  },
  {
    id: "3",
    name: "Swat",
    completionPercentage: 52,
    status: "planned",
    traineesEnrolled: 87,
  },
  {
    id: "4",
    name: "Kohat",
    completionPercentage: 71,
    status: "in-progress",
    traineesEnrolled: 76,
  },
];

export const MOCK_FEEDBACK: Feedback[] = [
  {
    id: "1",
    userId: "1",
    userName: "Ayesha Khan",
    userRole: "trainee",
    category: "suggestion",
    priority: "medium",
    message:
      "The video quality in Module 3 could be improved. Consider higher resolution uploads.",
    status: "in-review",
    createdDate: "2025-11-15",
  },
  {
    id: "2",
    userId: "4",
    userName: "Dr. Malik",
    userRole: "trainer",
    category: "content-issue",
    priority: "high",
    message:
      "Some content in Phase 2 mathematics module is outdated. Needs revision.",
    status: "in-review",
    createdDate: "2025-11-12",
  },
  {
    id: "4",
    userId: "6",
    userName: "DPD Staff Officer",
    userRole: "dpd_rpdc",
    category: "suggestion",
    priority: "low",
    message: "Add district-wise progress comparison feature.",
    status: "resolved",
    createdDate: "2025-11-01",
  },
];

export const PROJECT_SCOPE: Scope[] = [
  {
    id: "1",
    phase: "phase-1",
    objective: "Foundation Building for All Teachers",
    duration: "8 weeks",
    targetAudience: "All practicing teachers in KPK",
    modules: 6,
    status: "in-progress",
    startDate: "2025-09-01",
    endDate: "2025-10-31",
    description:
      "Phase 1 focuses on establishing foundational knowledge and skills for quality education delivery. Teachers will learn core pedagogical principles, assessment methods, and digital integration in classrooms.",
    deliverables: [
      "6 comprehensive training modules",
      "Completion certification for all participants",
      "Digital resource library with downloadable materials",
      "Assessment rubrics and templates",
      "Online discussion forums for peer learning",
    ],
  },
  {
    id: "2",
    phase: "phase-2",
    objective: "Advanced Specialization and Leadership",
    duration: "10 weeks",
    targetAudience: "Phase 1 completers and subject specialists",
    modules: 6,
    status: "planned",
    startDate: "2025-11-01",
    endDate: "2026-01-15",
    description:
      "Phase 2 provides advanced subject-specific pedagogy, leadership development, and specialized skills. Teachers will develop expertise in their subject areas and gain capabilities for mentoring colleagues.",
    deliverables: [
      "6 advanced specialization modules",
      "Subject-specific resource packs",
      "Leadership development certificate",
      "Mentorship program framework",
      "Impact assessment and research data",
      "Trainer certification pathway",
    ],
  },
];

export const MONTHLY_REPORT = {
  totalActiveUsers: 342,
  completedModules: 156,
  resolvedFeedback: 28,
  weeklyData: [
    { week: "Week 1", users: 85, completions: 32 },
    { week: "Week 2", users: 92, completions: 41 },
    { week: "Week 3", users: 78, completions: 38 },
    { week: "Week 4", users: 87, completions: 45 },
  ],
};

export const CONTENT_REVIEWS: ContentReview[] = [
  {
    id: "1",
    moduleId: "2",
    moduleTitle: "Active Learning Strategies",
    reviewerId: "6",
    reviewerName: "DPD Staff Officer",
    reviewType: "script",
    status: "pending",
    feedback:
      "Script needs alignment with Single National Curriculum standards. Please review section 3.",
    curriculumAlignment: "needs-review",
    createdDate: "2025-11-14",
  },
  {
    id: "2",
    moduleId: "5",
    moduleTitle: "Inclusive Classroom Practices",
    reviewerId: "6",
    reviewerName: "DPD Staff Officer",
    reviewType: "video",
    status: "needs-revision",
    feedback:
      "Video quality is good but audio needs improvement. Also ensure subtitles are available.",
    curriculumAlignment: "aligned",
    createdDate: "2025-11-10",
    reviewedDate: "2025-11-12",
    revisions: [
      "Improve audio quality",
      "Add subtitles",
      "Verify curriculum alignment",
    ],
  },
  {
    id: "3",
    moduleId: "9",
    moduleTitle: "Teacher Professional Development",
    reviewerId: "6",
    reviewerName: "DPD Staff Officer",
    reviewType: "module",
    status: "pending",
    feedback:
      "Module structure is good. Need to verify IT resources availability before publishing.",
    curriculumAlignment: "needs-review",
    createdDate: "2025-11-13",
  },
];

export interface LiveSession {
  id: string;
  title: string;
  description: string;
  trainerId: string;
  trainerName: string;
  moduleId?: string;
  moduleTitle?: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  status: "scheduled" | "live" | "completed" | "cancelled";
  participants: number;
  maxParticipants: number;
  meetingLink?: string;
  recordingUrl?: string;
  feedbackCount?: number;
}

export interface TraineeProgress {
  traineeId: string;
  traineeName: string;
  traineeEmail: string;
  enrolledModules: string[];
  completedModules: string[];
  inProgressModules: string[];
  completionPercentage: number;
  lastActivity: string;
  totalTimeSpent: string;
  averageScore?: number;
  phase1Progress: number;
  phase2Progress: number;
}

export const LIVE_SESSIONS: LiveSession[] = [
  {
    id: "1",
    title: "Foundation of Quality Education - Live Workshop",
    description:
      "Interactive live session covering quality education principles and student-centered learning.",
    trainerId: "4",
    trainerName: "Dr. Malik",
    moduleId: "1",
    moduleTitle: "Foundation of Quality Education",
    scheduledDate: "2025-11-20",
    scheduledTime: "14:00",
    duration: "60 mins",
    status: "scheduled",
    participants: 24,
    maxParticipants: 30,
    meetingLink: "https://meet.kpk.edu/session-1",
  },
  {
    id: "2",
    title: "Active Learning Strategies - Live Demo",
    description:
      "Real-time demonstration of active learning techniques in classroom settings.",
    trainerId: "4",
    trainerName: "Dr. Malik",
    moduleId: "2",
    moduleTitle: "Active Learning Strategies",
    scheduledDate: "2025-11-18",
    scheduledTime: "10:00",
    duration: "45 mins",
    status: "completed",
    participants: 28,
    maxParticipants: 30,
    recordingUrl: "/recordings/session-2",
    feedbackCount: 12,
  },
  {
    id: "3",
    title: "Digital Tools in Education - Q&A Session",
    description:
      "Open Q&A session about digital tools and technology integration in classrooms.",
    trainerId: "4",
    trainerName: "Dr. Malik",
    moduleId: "3",
    moduleTitle: "Digital Tools in Education",
    scheduledDate: "2025-11-22",
    scheduledTime: "16:00",
    duration: "30 mins",
    status: "scheduled",
    participants: 15,
    maxParticipants: 25,
    meetingLink: "https://meet.kpk.edu/session-3",
  },
];

export const TRAINEE_PROGRESS_DATA: TraineeProgress[] = [
  {
    traineeId: "1",
    traineeName: "Ayesha Khan",
    traineeEmail: "ayesha.khan@kpk.edu",
    enrolledModules: ["1", "2", "3", "4", "5", "6"],
    completedModules: ["1", "3"],
    inProgressModules: ["2"],
    completionPercentage: 33,
    lastActivity: "2025-11-15",
    totalTimeSpent: "2h 15m",
    averageScore: 85,
    phase1Progress: 40,
    phase2Progress: 0,
  },
  {
    traineeId: "9",
    traineeName: "Fatima Ali",
    traineeEmail: "fatima.ali@kpk.edu",
    enrolledModules: ["1", "2", "3", "4", "5", "6"],
    completedModules: ["1", "2", "3"],
    inProgressModules: ["4"],
    completionPercentage: 50,
    lastActivity: "2025-11-16",
    totalTimeSpent: "3h 30m",
    averageScore: 88,
    phase1Progress: 60,
    phase2Progress: 0,
  },
  {
    traineeId: "10",
    traineeName: "Hassan Ahmed",
    traineeEmail: "hassan.ahmed@kpk.edu",
    enrolledModules: ["1", "2", "3", "4", "5", "6", "7", "8"],
    completedModules: ["1", "2", "3", "4", "5", "6"],
    inProgressModules: ["7"],
    completionPercentage: 75,
    lastActivity: "2025-11-17",
    totalTimeSpent: "5h 45m",
    averageScore: 92,
    phase1Progress: 100,
    phase2Progress: 33,
  },
];

export interface QuizQuestion {
  id: string;
  question: string;
  type: "multiple-choice" | "true-false" | "short-answer";
  options?: string[];
  correctAnswer: string | number;
  points: number;
}

export interface Quiz {
  id: string;
  moduleId: string;
  moduleTitle: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  totalPoints: number;
  passingScore: number;
  timeLimit?: number; // in minutes
  attemptsAllowed: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  traineeId: string;
  traineeName: string;
  answers: { questionId: string; answer: string | number }[];
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  completedAt: string;
  timeSpent: number; // in minutes
}

export interface Certificate {
  id: string;
  traineeId: string;
  traineeName: string;
  moduleId?: string;
  moduleTitle?: string;
  certificateType: "module" | "phase" | "completion";
  issuedDate: string;
  certificateNumber: string;
  downloadUrl?: string;
}

export interface Discussion {
  id: string;
  moduleId: string;
  moduleTitle: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  createdAt: string;
  replies: DiscussionReply[];
  likes: number;
}

export interface DiscussionReply {
  id: string;
  discussionId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
  likes: number;
}

export const QUIZZES: Quiz[] = [
  {
    id: "1",
    moduleId: "1",
    moduleTitle: "Foundation of Quality Education",
    title: "Quality Education Assessment",
    description: "Test your understanding of quality education principles",
    questions: [
      {
        id: "q1",
        question: "What is the primary goal of student-centered learning?",
        type: "multiple-choice",
        options: [
          "Teacher control",
          "Student engagement and autonomy",
          "Rigid curriculum",
          "Standardized testing",
        ],
        correctAnswer: 1,
        points: 10,
      },
      {
        id: "q2",
        question: "Quality education focuses only on academic achievement.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 1,
        points: 10,
      },
      {
        id: "q3",
        question: "Describe one key principle of quality education.",
        type: "short-answer",
        correctAnswer: "",
        points: 20,
      },
    ],
    totalPoints: 40,
    passingScore: 70,
    timeLimit: 15,
    attemptsAllowed: 3,
  },
  {
    id: "2",
    moduleId: "2",
    moduleTitle: "Active Learning Strategies",
    title: "Active Learning Quiz",
    description: "Assess your knowledge of active learning techniques",
    questions: [
      {
        id: "q4",
        question: "Which is NOT an active learning strategy?",
        type: "multiple-choice",
        options: [
          "Peer learning",
          "Collaborative work",
          "Passive listening",
          "Technology integration",
        ],
        correctAnswer: 2,
        points: 10,
      },
      {
        id: "q5",
        question: "Active learning requires student participation.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 0,
        points: 10,
      },
    ],
    totalPoints: 20,
    passingScore: 70,
    timeLimit: 10,
    attemptsAllowed: 2,
  },
];

export const QUIZ_ATTEMPTS: QuizAttempt[] = [
  {
    id: "1",
    quizId: "1",
    traineeId: "1",
    traineeName: "Ayesha Khan",
    answers: [
      { questionId: "q1", answer: 1 },
      { questionId: "q2", answer: 1 },
      {
        questionId: "q3",
        answer: "Quality education focuses on holistic development",
      },
    ],
    score: 35,
    totalPoints: 40,
    percentage: 88,
    passed: true,
    completedAt: "2025-11-15T10:30:00",
    timeSpent: 12,
  },
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "1",
    traineeId: "1",
    traineeName: "Ayesha Khan",
    moduleId: "1",
    moduleTitle: "Foundation of Quality Education",
    certificateType: "module",
    issuedDate: "2025-11-15",
    certificateNumber: "KPK-TTC-2025-001",
  },
  {
    id: "2",
    traineeId: "1",
    traineeName: "Ayesha Khan",
    moduleId: "3",
    moduleTitle: "Digital Tools in Education",
    certificateType: "module",
    issuedDate: "2025-11-16",
    certificateNumber: "KPK-TTC-2025-002",
  },
];

export const DISCUSSIONS: Discussion[] = [
  {
    id: "1",
    moduleId: "1",
    moduleTitle: "Foundation of Quality Education",
    authorId: "1",
    authorName: "Ayesha Khan",
    title: "How to implement student-centered learning in large classes?",
    content:
      "I'm struggling with implementing student-centered approaches in my class of 45 students. Any suggestions?",
    createdAt: "2025-11-15T09:00:00",
    replies: [
      {
        id: "r1",
        discussionId: "1",
        authorId: "9",
        authorName: "Fatima Ali",
        content:
          "Try breaking them into smaller groups and rotating activities. It works well!",
        createdAt: "2025-11-15T10:00:00",
        likes: 3,
      },
    ],
    likes: 5,
  },
  {
    id: "2",
    moduleId: "2",
    moduleTitle: "Active Learning Strategies",
    authorId: "9",
    authorName: "Fatima Ali",
    title: "Best tools for collaborative learning?",
    content:
      "What digital tools have you found most effective for collaborative learning activities?",
    createdAt: "2025-11-16T14:00:00",
    replies: [],
    likes: 2,
  },
];

export interface TrainerAssignment {
  id: string;
  title: string;
  description: string;
  trainerId: string;
  trainerName: string;
  moduleId?: string;
  moduleTitle?: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "completed";
  requestedBy: string;
  rpdcCenter: string;
  supportNeeded?: string;
  lastUpdated: string;
}

export const TRAINER_ASSIGNMENTS: TrainerAssignment[] = [
  {
    id: "assign-1",
    title: "Finalize Active Learning dry-run",
    description:
      "Review the revised script, record a short walkthrough, and submit readiness notes for RPDC Peshawar.",
    trainerId: "4",
    trainerName: "Dr. Malik",
    moduleId: "2",
    moduleTitle: "Active Learning Strategies",
    dueDate: "2025-11-20",
    priority: "high",
    status: "in-progress",
    requestedBy: "DPD Staff Officer",
    rpdcCenter: "Peshawar RPDC",
    supportNeeded: "Need IT support for recording booth on Nov 19",
    lastUpdated: "2025-11-18",
  },
  {
    id: "assign-2",
    title: "Pilot Digital Pedagogy session",
    description:
      "Conduct a 30-minute pilot with the Swat cohort and capture engagement metrics for dashboards.",
    trainerId: "4",
    trainerName: "Dr. Malik",
    moduleId: "3",
    moduleTitle: "Digital Tools in Education",
    dueDate: "2025-11-24",
    priority: "medium",
    status: "pending",
    requestedBy: "RPDC Coordinator",
    rpdcCenter: "Swat RPDC",
    supportNeeded: "Need tablets check-list before travel",
    lastUpdated: "2025-11-17",
  },
  {
    id: "assign-3",
    title: "Collect trainee feedback - Inclusive Practices",
    description:
      "After delivering the inclusive classroom module, consolidate top issues and share with DPD.",
    trainerId: "4",
    trainerName: "Dr. Malik",
    moduleId: "5",
    moduleTitle: "Inclusive Classroom Practices",
    dueDate: "2025-11-27",
    priority: "low",
    status: "pending",
    requestedBy: "DPD System Administrator",
    rpdcCenter: "Central DPD",
    lastUpdated: "2025-11-16",
  },
];
