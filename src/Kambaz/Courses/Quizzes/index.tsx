import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import QuizzesControls from "./QuizzesControls";
import QuizControlButtons from "./QuizControlButtons";
import quizzesData from "../../Database/quizzes.json";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRocket } from "react-icons/fa";

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
}

export default function Quizzes() {
  const { cid } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredQuizzes = (quizzesData as unknown as Quiz[]).filter((quiz: Quiz) => 
    quiz.course === cid && 
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="wd-quizzes">
      <QuizzesControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
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