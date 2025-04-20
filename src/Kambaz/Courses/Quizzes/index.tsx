import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import QuizzesControls from "./QuizzesControls";
import QuizControlButtons from "./QuizControlButtons";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRocket } from "react-icons/fa";
import { setQuizzes } from "./reducer";
import * as coursesClient from "../client";
import { FormControl } from "react-bootstrap";

interface Quiz {
  _id: string;
  title: string;
  description: string;
  points: number;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  course: string;
  quizType: string;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  showCorrectAnswers: boolean;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  published: boolean;
  attempts: number;
}

export default function Quizzes() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  
  const fetchQuizzes = async () => {
    if (!cid) return;
    const quizzes = await coursesClient.findQuizzesForCourse(cid);
    dispatch(setQuizzes(quizzes));
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const filteredQuizzes = quizzes && quizzes
    .filter((quiz: Quiz) => quiz.course === cid)
    .filter((quiz: Quiz) => 
      (quiz.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((quiz: Quiz) => isFaculty || quiz.published);

  return (
    <div id="wd-quizzes">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <FormControl
          type="text"
          placeholder="Search for Quiz"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="me-2"
          style={{ width: "300px" }}
        />
        {isFaculty && <QuizzesControls />}
      </div>
      <br /><hr /><br />
      <ul className="rounded-0" id="wd-modules">
        <div className="wd-title p-3 ps-2 bg-secondary">
          <IoMdArrowDropdown />
          <span style={{ fontSize: "1.5rem" }}>QUIZZES</span>
        </div>
        <ul className="wd-lessons list-group rounded-0">
          {filteredQuizzes.map((quiz: Quiz) => (
            <li key={quiz._id} className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <FaRocket size="25" color="green" className="me-2" />
                <div className="flex-grow-1">
                  <Link
                    className="wd-quiz-link text-black link-underline link-underline-opacity-0"
                    to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}${isFaculty ? '' : '/preview'}`}
                  >
                    <h4>{quiz.title}</h4>
                    <p>
                      <b>Available</b> {new Date(quiz.availableFrom).toLocaleDateString()} at 12:00am | 
                      <br /> 
                      <b>Due</b> {new Date(quiz.dueDate).toLocaleDateString()} at 11:59pm | 
                      {quiz.points} pts | {quiz.multipleAttempts ? `${quiz.attempts} Attempts` : "1 Attempt"}
                    </p>
                  </Link>
                </div>
                <QuizControlButtons quizId={quiz._id} published={quiz.published} />
              </div>
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
} 