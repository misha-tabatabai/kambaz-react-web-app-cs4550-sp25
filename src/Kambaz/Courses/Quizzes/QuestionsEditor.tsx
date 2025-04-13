import { useState, useEffect } from "react";
import { Button, Row, Col, FormControl, FormGroup, FormCheck } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import quizQuestions from "../../Database/quizQuestions.json";

interface Question {
  _id: string;
  quizId: string;
  title: string;
  type: string;
  points: number;
  choices?: string[];
  correctAnswer?: string;
  possibleAnswers?: string[];
  isEditing: boolean;
}

export default function QuestionsEditor() {
  const { qid } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load questions for the current quiz
    const quizQuestionsList = (quizQuestions as Question[]).filter(
      (q) => q.quizId === qid
    );
    setQuestions(quizQuestionsList.map(q => ({ ...q, isEditing: false })));
  }, [qid]);

  const addNewQuestion = () => {
    const newQuestion: Question = {
      _id: Date.now().toString(),
      quizId: qid || "",
      title: "",
      type: "multiple-choice",
      points: 0,
      choices: ["", "", "", ""],
      correctAnswer: "0",
      possibleAnswers: [],
      isEditing: true
    };
    setQuestions([...questions, newQuestion]);
    setEditingQuestion(newQuestion);
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setQuestions(questions.map(q => 
      q._id === question._id ? { ...q, isEditing: true } : q
    ));
  };

  const handleSave = () => {
    if (editingQuestion) {
      setQuestions(questions.map(q => 
        q._id === editingQuestion._id ? { ...editingQuestion, isEditing: false } : q
      ));
      setEditingQuestion(null);
    }
  };

  const handleCancel = () => {
    if (editingQuestion) {
      setQuestions(questions.map(q => 
        q._id === editingQuestion._id ? { ...q, isEditing: false } : q
      ));
      setEditingQuestion(null);
    }
  };

  const handleChange = (field: string, value: any) => {
    if (editingQuestion) {
      setEditingQuestion({ ...editingQuestion, [field]: value });
    }
  };

  const addPossibleAnswer = () => {
    if (editingQuestion) {
      const newAnswers = [...(editingQuestion.possibleAnswers || []), ""];
      setEditingQuestion({ ...editingQuestion, possibleAnswers: newAnswers });
    }
  };

  const removePossibleAnswer = (index: number) => {
    if (editingQuestion) {
      const newAnswers = [...(editingQuestion.possibleAnswers || [])];
      newAnswers.splice(index, 1);
      setEditingQuestion({ ...editingQuestion, possibleAnswers: newAnswers });
    }
  };

  const updatePossibleAnswer = (index: number, value: string) => {
    if (editingQuestion) {
      const newAnswers = [...(editingQuestion.possibleAnswers || [])];
      newAnswers[index] = value;
      setEditingQuestion({ ...editingQuestion, possibleAnswers: newAnswers });
    }
  };

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Questions ({questions.length})</h3>
        <div>
          <span className="me-3">Total Points: {totalPoints}</span>
          <Button variant="outline-primary" className="me-2" onClick={() => navigate("preview")}>
            Quiz Preview
          </Button>
          <Button variant="primary" onClick={addNewQuestion}>
            + New Question
          </Button>
        </div>
      </div>

      {questions.map((question) => (
        <div key={question._id} className="mb-4 p-3 border rounded">
          {question.isEditing ? (
            <div>
              <FormGroup className="mb-3">
                <FormControl
                  as="textarea"
                  rows={3}
                  value={editingQuestion?.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Enter question text"
                />
              </FormGroup>

              <Row className="mb-3">
                <Col>
                  <FormGroup>
                    <label>Question Type</label>
                    <FormControl
                      as="select"
                      value={editingQuestion?.type || ""}
                      onChange={(e) => handleChange("type", e.target.value)}
                    >
                      <option value="multiple-choice">Multiple Choice</option>
                      <option value="true-false">True/False</option>
                      <option value="fill-blank">Fill in the Blank</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>Points</label>
                    <FormControl
                      type="number"
                      value={editingQuestion?.points}
                      onChange={(e) => handleChange("points", parseInt(e.target.value))}
                    />
                  </FormGroup>
                </Col>
              </Row>

              {editingQuestion?.type === "multiple-choice" && (
                <div>
                  {editingQuestion.choices?.map((choice, index) => (
                    <FormGroup key={index} className="mb-2">
                      <FormCheck
                        type="radio"
                        name="correctAnswer"
                        checked={editingQuestion.correctAnswer === index.toString()}
                        onChange={() => handleChange("correctAnswer", index.toString())}
                      />
                      <FormControl
                        value={choice}
                        onChange={(e) => {
                          const newChoices = [...(editingQuestion.choices || [])];
                          newChoices[index] = e.target.value;
                          handleChange("choices", newChoices);
                        }}
                        placeholder={`Choice ${index + 1}`}
                      />
                    </FormGroup>
                  ))}
                </div>
              )}

              {editingQuestion?.type === "true-false" && (
                <FormGroup>
                  <FormCheck
                    type="radio"
                    label="True"
                    name="correctAnswer"
                    checked={editingQuestion.correctAnswer === "true"}
                    onChange={() => handleChange("correctAnswer", "true")}
                  />
                  <FormCheck
                    type="radio"
                    label="False"
                    name="correctAnswer"
                    checked={editingQuestion.correctAnswer === "false"}
                    onChange={() => handleChange("correctAnswer", "false")}
                  />
                </FormGroup>
              )}

              {editingQuestion?.type === "fill-blank" && (
                <div>
                  <div className="mb-3">
                    <label>Possible Answers</label>
                    {editingQuestion.possibleAnswers?.map((answer, index) => (
                      <div key={index} className="d-flex align-items-center mb-2">
                        <FormControl
                          value={answer}
                          onChange={(e) => updatePossibleAnswer(index, e.target.value)}
                          placeholder="Enter possible answer"
                          className="me-2"
                        />
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removePossibleAnswer(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={addPossibleAnswer}
                      className="mt-2"
                    >
                      + Add Another Answer
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-3">
                <Button variant="secondary" onClick={handleCancel} className="me-2">
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <h5>{question.title}</h5>
                <Button variant="outline-primary" onClick={() => handleEdit(question)}>
                  Edit
                </Button>
              </div>
              <p className="text-muted">{question.points} pts</p>
              {question.type === "multiple-choice" && (
                <div>
                  {question.choices?.map((choice, index) => (
                    <div key={index} className="mb-2">
                      <FormCheck
                        type="radio"
                        label={choice}
                        checked={question.correctAnswer === index.toString()}
                        disabled
                      />
                    </div>
                  ))}
                </div>
              )}
              {question.type === "true-false" && (
                <div>
                  <FormCheck
                    type="radio"
                    label={question.correctAnswer === "true" ? "True" : "False"}
                    checked
                    disabled
                  />
                </div>
              )}
              {question.type === "fill-blank" && (
                <div>
                  <p className="mb-2">{question.title}</p>
                  <div>
                    <strong>Possible Answers:</strong>
                    <ul className="mt-2">
                      {question.possibleAnswers?.map((answer, index) => (
                        <li key={index}>{answer}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 