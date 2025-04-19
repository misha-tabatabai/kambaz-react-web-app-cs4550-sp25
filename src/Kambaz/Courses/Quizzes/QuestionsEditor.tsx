import { useState, useEffect } from "react";
import { Button, Row, Col, FormControl, FormGroup, FormCheck } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import * as quizQuestionsClient from "./client";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
    const fetchQuestions = async () => {
      if (qid) {
        try {
          const quizQuestions = await quizQuestionsClient.findQuestionsForQuiz(qid);
          setQuestions(quizQuestions.map((q: Question) => ({ ...q, isEditing: false })));
        } catch (error) {
          console.error("Failed to fetch questions:", error);
        }
      }
    };
    fetchQuestions();
  }, [qid]);

  const addNewQuestion = async () => {
    // Create a clean question object with only the base fields
    const baseQuestion = {
      _id: Date.now().toString(),
      quizId: qid || "",
      title: "",
      type: "multiple-choice",
      points: 0
    };

    // Add type-specific fields
    let questionToSave;
    if (baseQuestion.type === "multiple-choice") {
      questionToSave = {
        ...baseQuestion,
        choices: ["", "", "", ""],
        correctAnswer: "0"
      };
    } else if (baseQuestion.type === "true-false") {
      questionToSave = {
        ...baseQuestion,
        correctAnswer: "true"
      };
    } else if (baseQuestion.type === "fill-blank") {
      questionToSave = {
        ...baseQuestion,
        possibleAnswers: [""]
      };
    }

    try {
      const savedQuestion = await quizQuestionsClient.createQuizQuestion(qid || "", questionToSave);
      setQuestions([...questions, { ...savedQuestion, isEditing: true }]);
      setEditingQuestion({ ...savedQuestion, isEditing: true });
    } catch (error) {
      console.error("Failed to create question:", error);
    }
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setQuestions(questions.map(q => 
      q._id === question._id ? { ...q, isEditing: true } : q
    ));
  };

  const handleSave = async () => {
    if (editingQuestion && qid) {
      try {
        // Create a clean question object with only the base fields
        const baseQuestion = {
          _id: editingQuestion._id,
          quizId: editingQuestion.quizId,
          title: editingQuestion.title,
          type: editingQuestion.type,
          points: editingQuestion.points
        };

        // Add type-specific fields
        let questionToSave;
        if (editingQuestion.type === "multiple-choice") {
          questionToSave = {
            ...baseQuestion,
            choices: editingQuestion.choices,
            correctAnswer: editingQuestion.correctAnswer
          };
        } else if (editingQuestion.type === "true-false") {
          questionToSave = {
            ...baseQuestion,
            correctAnswer: editingQuestion.correctAnswer
          };
        } else if (editingQuestion.type === "fill-blank") {
          questionToSave = {
            ...baseQuestion,
            possibleAnswers: editingQuestion.possibleAnswers
          };
        }

        const updatedQuestion = await quizQuestionsClient.updateQuizQuestion(editingQuestion._id, questionToSave);
        setQuestions(questions.map(q => 
          q._id === editingQuestion._id ? { ...updatedQuestion, isEditing: false } : q
        ));
        setEditingQuestion(null);
      } catch (error) {
        console.error("Failed to update question:", error);
      }
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

  const handleDelete = async (questionId: string) => {
    if (qid) {
      try {
        await quizQuestionsClient.deleteQuizQuestion(questionId);
        setQuestions(questions.filter(q => q._id !== questionId));
      } catch (error) {
        console.error("Failed to delete question:", error);
      }
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
                <label>Question Text</label>
                <ReactQuill
                  value={editingQuestion?.title || ""}
                  onChange={(content) => handleChange("title", content)}
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      [{ 'indent': '-1'}, { 'indent': '+1' }],
                      ['link', 'image'],
                      ['clean']
                    ],
                  }}
                  style={{ height: '200px', marginBottom: '50px' }}
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
                  {editingQuestion.possibleAnswers?.map((answer, index) => (
                    <FormGroup key={index} className="mb-2">
                      <div className="d-flex">
                        <FormControl
                          value={answer}
                          onChange={(e) => updatePossibleAnswer(index, e.target.value)}
                          placeholder={`Possible Answer ${index + 1}`}
                        />
                        <Button
                          variant="outline-danger"
                          className="ms-2"
                          onClick={() => removePossibleAnswer(index)}
                        >
                          X
                        </Button>
                      </div>
                    </FormGroup>
                  ))}
                  <Button variant="outline-secondary" className="mb-2" onClick={addPossibleAnswer}>
                    + Add Possible Answer
                  </Button>
                </div>
              )}

              <div className="mt-3">
                <Button variant="primary" className="me-2" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <div dangerouslySetInnerHTML={{ __html: question.title }} />
                <div>
                  <Button variant="outline-primary" className="me-2" onClick={() => handleEdit(question)}>
                    Edit
                  </Button>
                  <Button variant="outline-danger" onClick={() => handleDelete(question._id)}>
                    Delete
                  </Button>
                </div>
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