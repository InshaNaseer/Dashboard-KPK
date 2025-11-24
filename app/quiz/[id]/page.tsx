"use client";

import { useParams, useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth-context";
import { QUIZZES, QUIZ_ATTEMPTS } from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const quiz = QUIZZES.find((q) => q.id === params.id);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string | number }>(
    {}
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<{
    score: number;
    percentage: number;
    passed: boolean;
  } | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(
    quiz?.timeLimit ? quiz.timeLimit * 60 : null
  );

  if (!quiz) {
    return (
      <MainLayout>
        <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardContent className="py-16 text-center">
              <p className="text-slate-600 text-lg">Quiz not found</p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  if (user?.role !== "trainee") {
    return (
      <MainLayout>
        <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardContent className="py-16 text-center">
              <p className="text-slate-600 text-lg">
                Only trainees can access quizzes
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const userAttempts = QUIZ_ATTEMPTS.filter(
    (a) => a.quizId === quiz.id && a.traineeId === user.id
  ).length;
  const attemptsRemaining = quiz.attemptsAllowed - userAttempts;

  const handleAnswerChange = (questionId: string, answer: string | number) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    let totalScore = 0;
    let totalPoints = 0;

    quiz.questions.forEach((question) => {
      totalPoints += question.points;
      const userAnswer = answers[question.id];
      if (
        question.type === "multiple-choice" ||
        question.type === "true-false"
      ) {
        if (userAnswer === question.correctAnswer) {
          totalScore += question.points;
        }
      } else if (question.type === "short-answer") {
        // For short answers, give partial credit (simplified)
        totalScore += question.points * 0.8;
      }
    });

    const percentage = Math.round((totalScore / totalPoints) * 100);
    const passed = percentage >= quiz.passingScore;

    setScore({ score: totalScore, percentage, passed });
    setIsSubmitted(true);

    toast({
      title: passed ? "Congratulations!" : "Keep Learning",
      description: `You scored ${percentage}% (${totalScore}/${totalPoints} points). ${
        passed ? "You passed!" : `You need ${quiz.passingScore}% to pass.`
      }`,
    });
  };

  if (isSubmitted && score) {
    return (
      <MainLayout>
        <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Module
          </button>

          <Card
            className={`rounded-3xl border-0 shadow-lg ${
              score.passed
                ? "bg-emerald-50 shadow-emerald-100"
                : "bg-orange-50 shadow-orange-100"
            }`}
          >
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                {score.passed ? (
                  <CheckCircle2 className="h-16 w-16 mx-auto text-emerald-600" />
                ) : (
                  <AlertCircle className="h-16 w-16 mx-auto text-orange-600" />
                )}
                <h2 className="text-2xl font-semibold text-slate-900">
                  {score.passed ? "Quiz Passed!" : "Quiz Completed"}
                </h2>
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-slate-900">
                    {score.percentage}%
                  </p>
                  <p className="text-sm text-slate-600">
                    Score: {score.score} / {quiz.totalPoints} points
                  </p>
                  <p className="text-sm text-slate-600">
                    Passing Score: {quiz.passingScore}%
                  </p>
                </div>
                {score.passed && (
                  <Badge className="rounded-full bg-emerald-100 text-emerald-600 px-4 py-2">
                    ✓ You passed this quiz
                  </Badge>
                )}
                {!score.passed && attemptsRemaining > 0 && (
                  <div className="pt-4">
                    <p className="text-sm text-slate-600 mb-3">
                      You have {attemptsRemaining} attempt
                      {attemptsRemaining > 1 ? "s" : ""} remaining
                    </p>
                    <Button
                      onClick={() => {
                        setCurrentQuestionIndex(0);
                        setAnswers({});
                        setIsSubmitted(false);
                        setScore(null);
                      }}
                      className="gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Try Again
                    </Button>
                  </div>
                )}
                <div className="pt-4">
                  <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="gap-2 rounded-xl"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Module
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Module
        </button>

        <header className="rounded-3xl bg-linear-to-r from-[#4b3be0] via-[#7846ff] to-[#9c4bff] px-6 py-5 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight mb-2">
                {quiz.title}
              </h1>
              <p className="text-sm opacity-90">{quiz.description}</p>
            </div>
            {timeRemaining !== null && (
              <div className="flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2">
                <Clock className="h-5 w-5" />
                <span className="font-semibold">
                  {Math.floor(timeRemaining / 60)}:
                  {(timeRemaining % 60).toString().padStart(2, "0")}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span>
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </span>
            <span>•</span>
            <span>{quiz.totalPoints} points</span>
            <span>•</span>
            <span>Passing: {quiz.passingScore}%</span>
            {attemptsRemaining > 0 && (
              <>
                <span>•</span>
                <span>
                  {attemptsRemaining} attempt{attemptsRemaining > 1 ? "s" : ""}{" "}
                  remaining
                </span>
              </>
            )}
          </div>
        </header>

        <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  {currentQuestion.question}
                </h3>
                {currentQuestion.type === "multiple-choice" && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option, index) => (
                      <label
                        key={index}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                          answers[currentQuestion.id] === index
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-slate-200 hover:border-indigo-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={index}
                          checked={answers[currentQuestion.id] === index}
                          onChange={() =>
                            handleAnswerChange(currentQuestion.id, index)
                          }
                          className="h-4 w-4 text-indigo-600"
                        />
                        <span className="text-slate-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
                {currentQuestion.type === "true-false" && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option, index) => (
                      <label
                        key={index}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                          answers[currentQuestion.id] === index
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-slate-200 hover:border-indigo-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={index}
                          checked={answers[currentQuestion.id] === index}
                          onChange={() =>
                            handleAnswerChange(currentQuestion.id, index)
                          }
                          className="h-4 w-4 text-indigo-600"
                        />
                        <span className="text-slate-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
                {currentQuestion.type === "short-answer" && (
                  <textarea
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(currentQuestion.id, e.target.value)
                    }
                    placeholder="Type your answer here..."
                    className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none min-h-[120px]"
                  />
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="gap-2 rounded-xl"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex gap-2">
                  {quiz.questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`h-2 w-2 rounded-full ${
                        index === currentQuestionIndex
                          ? "bg-indigo-600"
                          : answers[quiz.questions[index].id]
                          ? "bg-emerald-500"
                          : "bg-slate-300"
                      }`}
                    />
                  ))}
                </div>
                {currentQuestionIndex < quiz.questions.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    className="gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Next
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Submit Quiz
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
