import "./index.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { useParams } from "react-router";
import QuizzesControls from "./QuizzesControls";
import QuizControlButtons from "./QuizControlButtons";
import { FaRocket } from "react-icons/fa";

export default function Quizzes() {
  const { cid } = useParams();

  return (
    <div id="wd-quizzes">
      <QuizzesControls /> 
      <br /><br /><br /><hr /><br />
      <ul className="rounded-0" id="wd-modules">
        <div className="wd-title p-3 ps-2 bg-secondary">
          <IoMdArrowDropdown />
          <span style={{ fontSize: "1.5rem" }}>QUIZZES</span>
        </div>
        <ul className="wd-lessons list-group rounded-0">
          <li className="wd-lesson list-group-item p-3 ps-1">
            <div className="d-flex align-items-center">
              <FaRocket size="25" color="green" className="me-2" />
              <div className="flex-grow-1">
                <a
                  className="wd-quiz-link text-black link-underline link-underline-opacity-0"
                  href={`#/Kambaz/Courses/${cid}/Quizzes/1`}
                >
                  <h4>Sample Quiz</h4>
                  <p>
                    <b>Available</b> {new Date().toLocaleDateString()} at 12:00am | 
                    <br /> 
                    <b>Due</b> {new Date().toLocaleDateString()} at 11:59pm | 
                    100 pts
                  </p>
                </a>
              </div>
              <QuizControlButtons />
            </div>
          </li>
        </ul>
      </ul>
    </div>
  );
} 