import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, FormControl, Row, Col } from "react-bootstrap";
import QuizzesControls from "./QuizzesControls";
import QuizControlButtons from "./QuizControlButtons";
import quizzesData from "../../Database/quizzes.json";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRocket } from "react-icons/fa";

export default function Quizzes() {
  const { cid } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const quizzes = quizzesData;

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="wd-quizzes">
      <QuizzesControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <br /><br /><br /><hr /><br />
      <ul className="rounded-0" id="wd-modules">
        <div className="wd-title p-3 ps-2 bg-secondary">
          <IoMdArrowDropdown />
          <span style={{ fontSize: "1.5rem" }}>QUIZZES</span>
        </div>
        <ul className="wd-lessons list-group rounded-0">
          {filteredQuizzes.map((quiz) => (
            <li key={quiz._id} className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <FaRocket size="25" color="green" className="me-2" />
                <div className="flex-grow-1">
                  <Link
                    className="wd-quiz-link text-black link-underline link-underline-opacity-0"
                    to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
                  >
                    <h4>{quiz.title}</h4>
                    <p>
                      <b>Available</b> {new Date(quiz.availableFrom).toLocaleDateString()} at 12:00am | 
                      <br /> 
                      <b>Due</b> {new Date(quiz.dueDate).toLocaleDateString()} at 11:59pm | 
                      {quiz.points} pts
                    </p>
                  </Link>
                </div>
                <QuizControlButtons quizId={quiz._id} />
              </div>
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
} 