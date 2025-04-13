import { Col, FormControl, FormGroup, Nav, Tab, FormCheck, Row, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import * as coursesClient from "../client";
import QuestionsEditor from "./QuestionsEditor";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("details");
  const [hasTimeLimit, setHasTimeLimit] = useState(true);
  const [hasMultipleAttempts, setHasMultipleAttempts] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(true);
  const [webcamRequired, setWebcamRequired] = useState(false);
  const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(false);

  const defaultQuiz = {
    _id: "",
    title: "",
    description: "Add description here",
    points: "100",
    dueDate: "2024-05-13",
    availableFrom: "2024-05-06",
    availableUntil: "2024-05-20",
    course: cid,
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false
  };

  const [quiz, setQuiz] = useState(defaultQuiz);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       if (qid && qid !== "new") {
//         try {
//         //   const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
//           const existingQuiz = quizzes.find((q: any) => q._id === qid);
//           if (existingQuiz) {
//             setQuiz({
//               ...defaultQuiz,
//               ...existingQuiz,
//               course: cid
//             });
//           }
//         } catch (error) {
//           console.error("Failed to fetch quiz:", error);
//         }
//       }
//     };
//     fetchQuiz();
//   }, [qid, cid]);

  const handleSave = async () => {
    try {
      if (qid === "new") {
        // TODO: Implement create quiz
        console.log("Creating quiz:", quiz);
      } else {
        // TODO: Implement update quiz
        console.log("Updating quiz:", quiz);
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
    setQuiz({ ...quiz, [field]: value });
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
            <FormControl
              as="textarea"
              value={quiz.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
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
                  <option>Graded Quiz</option>
                  <option>Practice Quiz</option>
                  <option>Graded Survey</option>
                  <option>Ungraded Survey</option>
                </FormControl>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <label>Assignment Group</label>
                <FormControl
                  as="select"
                  value={quiz.assignmentGroup}
                  onChange={(e) => handleChange("assignmentGroup", e.target.value)}
                >
                  <option>Quizzes</option>
                  <option>Exams</option>
                  <option>Assignments</option>
                  <option>Project</option>
                </FormControl>
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <FormGroup>
                <label>Points</label>
                <FormControl
                  type="number"
                  value={quiz.points}
                  onChange={(e) => handleChange("points", e.target.value)}
                  disabled
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <label>Access Code</label>
                <FormControl
                  value={quiz.accessCode}
                  onChange={(e) => handleChange("accessCode", e.target.value)}
                  placeholder="Enter access code (optional)"
                />
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <FormCheck
                type="checkbox"
                label="Shuffle Answers"
                checked={quiz.shuffleAnswers}
                onChange={(e) => handleChange("shuffleAnswers", e.target.checked)}
              />
            </Col>
            <Col>
              <FormCheck
                type="checkbox"
                label="Time Limit"
                checked={hasTimeLimit}
                onChange={(e) => setHasTimeLimit(e.target.checked)}
              />
              {hasTimeLimit && (
                <FormControl
                  type="number"
                  value={quiz.timeLimit}
                  onChange={(e) => handleChange("timeLimit", e.target.value)}
                  className="mt-2"
                  placeholder="Minutes"
                />
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <FormCheck
                type="checkbox"
                label="Multiple Attempts"
                checked={hasMultipleAttempts}
                onChange={(e) => setHasMultipleAttempts(e.target.checked)}
              />
            </Col>
            <Col>
              <FormCheck
                type="checkbox"
                label="Show Correct Answers"
                checked={showCorrectAnswers}
                onChange={(e) => setShowCorrectAnswers(e.target.checked)}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <FormCheck
                type="checkbox"
                label="One Question at a Time"
                checked={oneQuestionAtATime}
                onChange={(e) => setOneQuestionAtATime(e.target.checked)}
              />
            </Col>
            <Col>
              <FormCheck
                type="checkbox"
                label="Webcam Required"
                checked={webcamRequired}
                onChange={(e) => setWebcamRequired(e.target.checked)}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <FormCheck
                type="checkbox"
                label="Lock Questions After Answering"
                checked={lockQuestionsAfterAnswering}
                onChange={(e) => setLockQuestionsAfterAnswering(e.target.checked)}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <FormGroup>
                <label>Available From</label>
                <FormControl
                  type="datetime-local"
                  value={quiz.availableFrom}
                  onChange={(e) => handleChange("availableFrom", e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <label>Due Date</label>
                <FormControl
                  type="datetime-local"
                  value={quiz.dueDate}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <label>Until</label>
                <FormControl
                  type="datetime-local"
                  value={quiz.availableUntil}
                  onChange={(e) => handleChange("availableUntil", e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <div className="mt-4 d-flex justify-content-end">
            <Button variant="secondary" onClick={handleCancel} className="me-2">
              Cancel
            </Button>
            <Button variant="danger" onClick={handleSave}>
              Save
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