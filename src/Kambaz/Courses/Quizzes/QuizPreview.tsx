import { useState, useEffect } from "react";
import { Button, Card, FormControl, FormCheck, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import * as quizQuestionsClient from "./client";
import QuizResults from "./QuizResults";
import { useSelector } from "react-redux";

interface Question {
  _id: string;
  quizId: string;
  title: string;
  type: string;
  points: number;
  choices?: string[];
  correctAnswer?: string;
  possibleAnswers?: string[];
}

interface StudentQuiz {
  _id: string;
  studentId: string;
  quizId: string;
  answers: Array<{
    questionId: string;
    answer: string;
    isCorrect: boolean;
  }>;
  score: number;
  totalPoints: number;
  completed: boolean;
  startedAt: string;
  completedAt: string;
}

export default function QuizPreview() {
  const { qid } = useParams();
  const { cid } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedAttempt, setSelectedAttempt] = useState<StudentQuiz | null>(null);
  const [pastAttempts, setPastAttempts] = useState<StudentQuiz[]>([]);
  const [quiz, setQuiz] = useState<any>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    const fetchData = async () => {
      if (qid) {
        const [fetchedQuestions, fetchedQuiz, studentAttempts] = await Promise.all([
          quizQuestionsClient.findQuestionsForQuiz(qid),
          quizQuestionsClient.findQuizById(qid),
          !isFaculty ? quizQuestionsClient.findStudentQuizzesByStudentAndQuiz(currentUser._id, qid) : []
        ]);
        setQuestions(fetchedQuestions);
        setQuiz(fetchedQuiz);
        setPastAttempts(studentAttempts);
      }
    };
    fetchData();
  }, [qid, currentUser, isFaculty]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    let totalPoints = 0;
    let earnedPoints = 0;

    questions.forEach((question) => {
      totalPoints += question.points;
      const userAnswer = answers[question._id];
      
      if (question.type === "multiple-choice") {
        if (userAnswer === question.correctAnswer) {
          earnedPoints += question.points;
        }
      } else if (question.type === "true-false") {
        if (userAnswer === question.correctAnswer) {
          earnedPoints += question.points;
        }
      } else if (question.type === "fill-blank") {
        if (question.possibleAnswers?.includes(userAnswer?.toLowerCase() || "")) {
          earnedPoints += question.points;
        }
      }
    });

    return { totalPoints, earnedPoints };
  };

  const handleSubmit = async () => {
    if (!currentUser) return;

    if (!isFaculty) {
      // Check if student has exceeded attempts
      if (quiz.multipleAttempts && pastAttempts.length >= quiz.attempts) {
        alert(`You have reached the maximum number of attempts (${quiz.attempts}) for this quiz.`);
        return;
      }

      const { totalPoints, earnedPoints } = calculateScore();
      const answerArray = Object.entries(answers).map(([questionId, answer]) => {
        const question = questions.find(q => q._id === questionId);
        let isCorrect = false;

        if (question?.type === "multiple-choice" || question?.type === "true-false") {
          isCorrect = answer === question.correctAnswer;
        } else if (question?.type === "fill-blank") {
          isCorrect = question.possibleAnswers?.includes(answer.toLowerCase() || "") || false;
        }

        return {
          questionId,
          answer,
          isCorrect
        };
      });

      await quizQuestionsClient.createStudentQuiz({
        studentId: currentUser._id,
        quizId: qid,
        answers: answerArray,
        score: earnedPoints,
        totalPoints: totalPoints,
        completed: true,
        startedAt: new Date(),
        completedAt: new Date()
      });
    }

    setShowResults(true);
  };

  if (showResults) {
    return (
      <QuizResults
        questions={questions}
        answers={selectedAttempt ? selectedAttempt.answers.reduce((acc, curr) => ({
          ...acc,
          [curr.questionId]: curr.answer
        }), {}) : answers}
        onBack={() => {
          setShowResults(false);
          setSelectedAttempt(null);
        }}
        isNewSubmission={!selectedAttempt}
      />
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Quiz Preview</h2>
        <Button
          variant="outline-secondary"
          onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
        >
          Back to {isFaculty ? "Editor" : "Quizzes"}
        </Button>
      </div>
      <hr />

      {!isFaculty && pastAttempts.length > 0 && (
        <Card className="mb-4">
          <Card.Body>
            <h4>Previous Attempt</h4>
            {(() => {
              const mostRecentAttempt = pastAttempts.sort((a, b) => 
                new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
              )[0];
              return (
                <div 
                  className="mb-2 p-2 border rounded cursor-pointer"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedAttempt(mostRecentAttempt);
                    setShowResults(true);
                  }}
                >
                  <div>
                    <strong>Score:</strong> {mostRecentAttempt.score}/{mostRecentAttempt.totalPoints} points
                    ({mostRecentAttempt.totalPoints === 0 ? "0" : ((mostRecentAttempt.score / mostRecentAttempt.totalPoints) * 100).toFixed(1)}%)
                  </div>
                  <div className="text-muted small">
                    Taken on: {new Date(mostRecentAttempt.completedAt).toLocaleDateString()}
                  </div>
                </div>
              );
            })()}
            {quiz?.multipleAttempts && (
              <div className="mt-2">
                <strong>Remaining Attempts:</strong> {quiz.attempts - pastAttempts.length}
              </div>
            )}
          </Card.Body>
        </Card>
      )}

      {!isFaculty && quiz?.multipleAttempts && pastAttempts.length >= quiz.attempts && (
        <Alert variant="danger" className="mb-4">
          No more attempts left for this quiz.
        </Alert>
      )}

      <Card className="mb-4">
        <Card.Body>
          <h4>Quiz Instructions</h4>
          <div dangerouslySetInnerHTML={{ __html: quiz?.description || "No description provided." }} />
        </Card.Body>
      </Card>

      {questions.map((question, index) => (
        <Card key={question._id} className="mb-3">
          <Card.Body>
            <h5>Question {index + 1} ({question.points} points)</h5>
            <div dangerouslySetInnerHTML={{ __html: question.title }} />
            
            {question.type === "multiple-choice" && question.choices && (
              <div className="mb-3">
                {question.choices.map((choice, choiceIndex) => (
                  <FormCheck
                    key={choiceIndex}
                    type="radio"
                    name={`question-${question._id}`}
                    label={choice}
                    checked={answers[question._id] === choiceIndex.toString()}
                    onChange={() => handleAnswerChange(question._id, choiceIndex.toString())}
                  />
                ))}
              </div>
            )}

            {question.type === "true-false" && (
              <div className="mb-3">
                <FormCheck
                  type="radio"
                  name={`question-${question._id}`}
                  label="True"
                  checked={answers[question._id] === "true"}
                  onChange={() => handleAnswerChange(question._id, "true")}
                />
                <FormCheck
                  type="radio"
                  name={`question-${question._id}`}
                  label="False"
                  checked={answers[question._id] === "false"}
                  onChange={() => handleAnswerChange(question._id, "false")}
                />
              </div>
            )}

            {question.type === "fill-blank" && (
              <div className="mb-3">
                <FormControl
                  type="text"
                  placeholder="Your answer"
                  value={answers[question._id] || ""}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                />
              </div>
            )}
          </Card.Body>
        </Card>
      ))}

      <div className="mt-4">
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={!isFaculty && quiz?.multipleAttempts && pastAttempts.length >= quiz.attempts}
        >
          Submit Quiz
        </Button>
      </div>
    </div>
  );
} 