import { Button, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

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
  isNewSubmission?: boolean;
}

export default function QuizResults({ questions, answers, onBack, isNewSubmission = false }: QuizResultsProps) {
  const { cid } = useParams();
  const navigate = useNavigate();

  const calculateScore = () => {
    let totalPoints = 0;
    let earnedPoints = 0;

    questions.forEach((question) => {
      totalPoints += question.points;
      const userAnswer = answers[question._id];
      
      if (question.type === "multiple-choice" || question.type === "true-false") {
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

  const { totalPoints, earnedPoints } = calculateScore();
  const percentage = totalPoints === 0 ? 0 : (earnedPoints / totalPoints) * 100;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Quiz Results</h2>
        <Button
          variant="outline-secondary"
          onClick={() => {
            if (isNewSubmission) {
              navigate(`/Kambaz/Courses/${cid}/Quizzes`);
            } else {
              onBack();
            }
          }}
        >
          {isNewSubmission ? "Back to Quizzes" : "Back to Quiz"}
        </Button>
      </div>

      <Card className="mb-4">
        <Card.Body className="text-center">
          <h3>Your Score: {earnedPoints} / {totalPoints}</h3>
          <h4 className="text-muted">{Math.round(percentage)}%</h4>
        </Card.Body>
      </Card>

      {questions.map((question, index) => (
        <Card key={question._id} className="mb-3">
          <Card.Body>
            <h5>Question {index + 1} ({question.points} points)</h5>
            <div dangerouslySetInnerHTML={{ __html: question.title }} />
            
            {question.type === "multiple-choice" && question.choices && (
              <div className="mt-3">
                {!answers[question._id] && (
                  <div className="mb-2 p-2 rounded bg-danger bg-opacity-10 border border-danger">
                    <div className="d-flex align-items-center">
                      <span className="me-2 text-danger">✗</span>
                      <span>Your Answer: No answer provided</span>
                    </div>
                  </div>
                )}
                {question.choices.map((choice, choiceIndex) => {
                  const isUserAnswer = answers[question._id] === choiceIndex.toString();
                  const isCorrectAnswer = question.correctAnswer === choiceIndex.toString();
                  const isCorrect = isUserAnswer && isCorrectAnswer;
                  const isIncorrect = isUserAnswer && !isCorrectAnswer;
                  return (
                    <div
                      key={choiceIndex}
                      className={`mb-2 p-2 rounded ${isCorrect ? 'bg-success bg-opacity-10 border border-success' : isIncorrect ? 'bg-danger bg-opacity-10 border border-danger' : ''}`}
                    >
                      <div className="d-flex align-items-center">
                        <span className={`me-2 ${isCorrect ? 'text-success' : isIncorrect ? 'text-danger' : ''}`}>
                          {isCorrect ? '✓' : isIncorrect ? '✗' : '○'}
                        </span>
                        <span className={isCorrect ? 'text-success' : isIncorrect ? 'text-danger' : ''}>
                          {choice}
                        </span>
                        {isCorrectAnswer && !isUserAnswer && (
                          <span className="ms-2 text-success">✓ Correct Answer</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {question.type === "true-false" && (
              <div className="mt-3">
                {!answers[question._id] && (
                  <div className="mb-2 p-2 rounded bg-danger bg-opacity-10 border border-danger">
                    <div className="d-flex align-items-center">
                      <span className="me-2 text-danger">✗</span>
                      <span className="text-danger">Your Answer: No answer provided</span>
                    </div>
                  </div>
                )}
                <div className={`mb-2 p-2 rounded ${answers[question._id] === "true" ? (question.correctAnswer === "true" ? 'bg-success bg-opacity-10 border border-success' : 'bg-danger bg-opacity-10 border border-danger') : ''}`}>
                  <div className="d-flex align-items-center">
                    <span className={`me-2 ${answers[question._id] === "true" ? (question.correctAnswer === "true" ? 'text-success' : 'text-danger') : ''}`}>
                      {answers[question._id] === "true" ? (question.correctAnswer === "true" ? '✓' : '✗') : '○'}
                    </span>
                    <span className={answers[question._id] === "true" ? (question.correctAnswer === "true" ? 'text-success' : 'text-danger') : ''}>
                      True
                    </span>
                    {question.correctAnswer === "true" && answers[question._id] !== "true" && (
                      <span className="ms-2 text-success">✓ Correct Answer</span>
                    )}
                  </div>
                </div>
                <div className={`mb-2 p-2 rounded ${answers[question._id] === "false" ? (question.correctAnswer === "false" ? 'bg-success bg-opacity-10 border border-success' : 'bg-danger bg-opacity-10 border border-danger') : ''}`}>
                  <div className="d-flex align-items-center">
                    <span className={`me-2 ${answers[question._id] === "false" ? (question.correctAnswer === "false" ? 'text-success' : 'text-danger') : ''}`}>
                      {answers[question._id] === "false" ? (question.correctAnswer === "false" ? '✓' : '✗') : '○'}
                    </span>
                    <span className={answers[question._id] === "false" ? (question.correctAnswer === "false" ? 'text-success' : 'text-danger') : ''}>
                      False
                    </span>
                    {question.correctAnswer === "false" && answers[question._id] !== "false" && (
                      <span className="ms-2 text-success">✓ Correct Answer</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {question.type === "fill-blank" && (
              <div className="mt-3">
                <div className={`mb-2 p-2 rounded ${question.possibleAnswers?.includes(answers[question._id] || '') ? 'bg-success bg-opacity-10 border border-success' : 'bg-danger bg-opacity-10 border border-danger'}`}>
                  <div className="d-flex align-items-center">
                    <span className={`me-2 ${question.possibleAnswers?.includes(answers[question._id] || '') ? 'text-success' : 'text-danger'}`}>
                      {question.possibleAnswers?.includes(answers[question._id] || '') ? '✓' : '✗'}
                    </span>
                    <span>
                      <strong>Your Answer:</strong> {answers[question._id] || "No answer provided"}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <strong>Correct Answers:</strong>
                  <ul className="mt-2 list-unstyled">
                    {question.possibleAnswers?.map((answer, index) => (
                      <li 
                        key={index} 
                        className={`p-2 rounded ${answer === answers[question._id] ? 'bg-success bg-opacity-10 border border-success' : ''}`}
                      >
                        {answer}
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