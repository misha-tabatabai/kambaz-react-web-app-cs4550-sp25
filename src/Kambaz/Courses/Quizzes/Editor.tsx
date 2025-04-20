import { Col, FormControl, FormGroup, Nav, FormCheck, Row, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import QuestionsEditor from "./QuestionsEditor";
import * as quizzesClient from "./client";
import * as coursesClient from "../client";
import { useDispatch } from "react-redux";
import { addQuiz, updateQuiz } from "./reducer";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("details");

  const defaultQuiz = {
    _id: "",
    title: "",
    description: "",
    points: "100",
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    course: cid,
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    attempts: 1,
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    published: false
  };

  const [quiz, setQuiz] = useState(defaultQuiz);

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      if (qid && qid !== "new") {
        try {
          const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
          const existingQuiz = quizzes.find((q: any) => q._id === qid);
          if (existingQuiz) {
            setQuiz({
              ...defaultQuiz,
              ...existingQuiz,
              course: cid,
              dueDate: formatDateForInput(existingQuiz.dueDate),
              availableFrom: formatDateForInput(existingQuiz.availableFrom),
              availableUntil: formatDateForInput(existingQuiz.availableUntil)
            });
          }
        } catch (error) {
          console.error("Failed to fetch quiz:", error);
        }
      }
    };
    fetchQuiz();
  }, [qid, cid]);

  const handleSave = async (publish: boolean = false) => {
    try {
      if (!cid) return;
      
      if (qid === "new") {
        const newQuiz = await coursesClient.createQuizForCourse(cid, {
          ...quiz,
          published: publish
        });
        dispatch(addQuiz(newQuiz));
      } else {
        const updatedQuiz = await quizzesClient.updateQuiz({
          ...quiz,
          published: publish
        });
        dispatch(updateQuiz(updatedQuiz));
      }
      navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Failed to save quiz:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  const handleChange = (field: string, value: any) => {
    setQuiz(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div id="wd-quiz-editor">
      <Nav variant="tabs" defaultActiveKey="details" className="mb-3">
        <Nav.Item>
          <Nav.Link 
            eventKey="details" 
            onClick={() => setActiveTab("details")}
            className={activeTab === "details" ? "active" : ""}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            eventKey="questions" 
            onClick={() => setActiveTab("questions")}
            className={activeTab === "questions" ? "active" : ""}
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === "details" && (
        <div>
          <FormGroup>
            <label>Quiz Title</label>
            <FormControl
              value={quiz.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter Quiz Title"
            />
          </FormGroup>
          <br />
          <FormGroup>
            <label>Quiz Instructions</label>
            <ReactQuill
              value={quiz.description}
              onChange={(content) => handleChange("description", content)}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  [{ 'color': [] }, { 'background': [] }],
                  ['link', 'image'],
                  ['clean']
                ]
              }}
              style={{ height: '200px', marginBottom: '50px' }}
            />
          </FormGroup>
          <br />
          <Row>
            <Col>
              <FormGroup>
                <label>Quiz Type</label>
                <FormControl
                  as="select"
                  value={quiz.quizType}
                  onChange={(e) => handleChange("quizType", e.target.value)}
                >
                  <option value="Graded Quiz">Graded Quiz</option>
                  <option value="Practice Quiz">Practice Quiz</option>
                  <option value="Graded Survey">Graded Survey</option>
                  <option value="Ungraded Survey">Ungraded Survey</option>
                </FormControl>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <label>Points</label>
                <FormControl
                  type="number"
                  value={quiz.points}
                  onChange={(e) => handleChange("points", e.target.value)}
                  disabled={true}
                />
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <FormGroup>
                <label>Assignment Group</label>
                <FormControl
                  as="select"
                  value={quiz.assignmentGroup}
                  onChange={(e) => handleChange("assignmentGroup", e.target.value)}
                >
                  <option value="Quizzes">Quizzes</option>
                  <option value="Exams">Exams</option>
                  <option value="Assignments">Assignments</option>
                  <option value="Project">Project</option>
                </FormControl>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <label>Time Limit (minutes)</label>
                <FormControl
                  type="number"
                  value={quiz.timeLimit}
                  onChange={(e) => handleChange("timeLimit", parseInt(e.target.value))}
                />
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <FormGroup>
                <label>Due Date</label>
                <FormControl
                  type="date"
                  value={formatDateForInput(quiz.dueDate)}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <label>Available From</label>
                <FormControl
                  type="date"
                  value={formatDateForInput(quiz.availableFrom)}
                  onChange={(e) => handleChange("availableFrom", e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <label>Available Until</label>
                <FormControl
                  type="date"
                  value={formatDateForInput(quiz.availableUntil)}
                  onChange={(e) => handleChange("availableUntil", e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <br />
          <FormCheck
            type="checkbox"
            label="Shuffle Answers"
            checked={quiz.shuffleAnswers}
            onChange={(e) => handleChange("shuffleAnswers", e.target.checked)}
          />
          <FormCheck
            type="checkbox"
            label="Multiple Attempts"
            checked={quiz.multipleAttempts}
            onChange={(e) => {
              handleChange("multipleAttempts", e.target.checked);
              if (!e.target.checked) {
                handleChange("attempts", 1);
              }
            }}
          />
          {quiz.multipleAttempts && (
            <FormGroup className="ms-4">
              <label>Number of Attempts</label>
              <FormControl
                type="number"
                value={quiz.attempts || 1}
                onChange={(e) => handleChange("attempts", Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
            </FormGroup>
          )}
          <FormCheck
            type="checkbox"
            label="Show Correct Answers"
            checked={quiz.showCorrectAnswers}
            onChange={(e) => handleChange("showCorrectAnswers", e.target.checked)}
          />
          <FormCheck
            type="checkbox"
            label="One Question at a Time"
            checked={quiz.oneQuestionAtATime}
            onChange={(e) => handleChange("oneQuestionAtATime", e.target.checked)}
          />
          <FormCheck
            type="checkbox"
            label="Webcam Required"
            checked={quiz.webcamRequired}
            onChange={(e) => handleChange("webcamRequired", e.target.checked)}
          />
          <FormCheck
            type="checkbox"
            label="Lock Questions After Answering"
            checked={quiz.lockQuestionsAfterAnswering}
            onChange={(e) => handleChange("lockQuestionsAfterAnswering", e.target.checked)}
          />
          <br />
          <FormGroup>
            <label>Access Code</label>
            <FormControl
              type="text"
              value={quiz.accessCode}
              onChange={(e) => handleChange("accessCode", e.target.value)}
              placeholder="Optional"
            />
          </FormGroup>
          <div className="mt-3">
            <Button variant="primary" onClick={() => handleSave(false)}>
              Save
            </Button>
            <Button variant="success" className="ms-2" onClick={() => handleSave(true)}>
              Save & Publish
            </Button>
            <Button variant="secondary" className="ms-2" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {activeTab === "questions" && (
        <QuestionsEditor />
      )}
    </div>
  );
} 