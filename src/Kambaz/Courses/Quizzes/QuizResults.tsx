import { useState, useEffect } from "react";
import { Button, Card, FormCheck } from "react-bootstrap";

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

interface QuizResultsProps {
  questions: Question[];
  answers: Record<string, string>;
  onBack: () => void;
}

export default function QuizResults({ questions, answers, onBack }: QuizResultsProps) {
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    let correctCount = 0;
    let totalPoints = 0;

    questions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = answers[question._id];
      
      if (question.type === "multiple-choice") {
        if (userAnswer === question.correctAnswer) {
          correctCount += question.points;
        }
      } else if (question.type === "true-false") {
        if (userAnswer === question.correctAnswer) {
          correctCount += question.points;
        }
      } else if (question.type === "fill-blank") {
        if (question.possibleAnswers?.includes(userAnswer)) {
          correctCount += question.points;
        }
      }
    });

    setScore(correctCount);
    setTotalPoints(totalPoints);
  }, [questions, answers]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quiz Results</h2>
        <Button variant="secondary" onClick={onBack}>
          Back to Quiz
        </Button>
      </div>

      <Card className="mb-4">
        <Card.Body className="text-center">
          <h3>Your Score: {score} / {totalPoints}</h3>
          <h4 className="text-muted">{Math.round((score / totalPoints) * 100)}%</h4>
        </Card.Body>
      </Card>

      {questions.map((question, index) => (
        <Card key={question._id} className="mb-3">
          <Card.Body>
            <h5>Question {index + 1} ({question.points} points)</h5>
            <div dangerouslySetInnerHTML={{ __html: question.title }} />
            
            {question.type === "multiple-choice" && question.choices && (
              <div className="mt-3">
                {question.choices.map((choice, choiceIndex) => {
                  const isUserAnswer = answers[question._id] === choiceIndex.toString();
                  const isCorrectAnswer = question.correctAnswer === choiceIndex.toString();
                  return (
                    <div key={choiceIndex} className={`mb-2 ${isUserAnswer ? (isCorrectAnswer ? 'text-success' : 'text-danger') : ''}`}>
                      <FormCheck
                        type="radio"
                        label={choice}
                        checked={isUserAnswer}
                        disabled
                      />
                      {isCorrectAnswer && <span className="ms-2">✓ Correct Answer</span>}
                    </div>
                  );
                })}
              </div>
            )}

            {question.type === "true-false" && (
              <div className="mt-3">
                <div className={`mb-2 ${answers[question._id] === "true" ? (question.correctAnswer === "true" ? 'text-success' : 'text-danger') : ''}`}>
                  <FormCheck
                    type="radio"
                    label="True"
                    checked={answers[question._id] === "true"}
                    disabled
                  />
                  {question.correctAnswer === "true" && <span className="ms-2">✓ Correct Answer</span>}
                </div>
                <div className={`mb-2 ${answers[question._id] === "false" ? (question.correctAnswer === "false" ? 'text-success' : 'text-danger') : ''}`}>
                  <FormCheck
                    type="radio"
                    label="False"
                    checked={answers[question._id] === "false"}
                    disabled
                  />
                  {question.correctAnswer === "false" && <span className="ms-2">✓ Correct Answer</span>}
                </div>
              </div>
            )}

            {question.type === "fill-blank" && (
              <div className="mt-3">
                <div className="mb-2">
                  <strong>Your Answer:</strong> {answers[question._id] || "No answer provided"}
                </div>
                <div>
                  <strong>Correct Answers:</strong>
                  <ul className="mt-2">
                    {question.possibleAnswers?.map((answer, index) => (
                      <li key={index} className={answer === answers[question._id] ? 'text-success' : ''}>
                        {answer}
                        {answer === answers[question._id] && <span className="ms-2">✓ Your Answer</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
} 