import { useState, useEffect } from "react";
import { Button, Card, FormControl, FormCheck } from "react-bootstrap";
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

export default function QuizPreview() {
  const { qid } = useParams();
  const { cid } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    const fetchQuestions = async () => {
      if (qid) {
        try {
          const quizQuestions = await quizQuestionsClient.findQuestionsForQuiz(qid);
          setQuestions(quizQuestions);
        } catch (error) {
          console.error("Failed to fetch questions:", error);
        }
      }
    };
    fetchQuestions();
  }, [qid]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  if (showResults) {
    return <QuizResults questions={questions} answers={answers} />;
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

      <Card className="mb-4">
        <Card.Body>
          <h4>Quiz Instructions</h4>
          <p>This is a preview of how the quiz will appear to students.</p>
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
        <Button variant="primary" onClick={handleSubmit}>
          Submit Quiz
        </Button>
      </div>
    </div>
  );
} 