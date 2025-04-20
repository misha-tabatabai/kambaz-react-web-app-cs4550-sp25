import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import QuizzesControls from "./QuizzesControls";
import QuizControlButtons from "./QuizControlButtons";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRocket } from "react-icons/fa";
import { setQuizzes } from "./reducer";
import * as coursesClient from "../client";
import * as quizQuestionsClient from "./client";
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
  const [studentAttempts, setStudentAttempts] = useState<Record<string, any>>({});
  
  const fetchQuizzes = async () => {
    if (!cid) return;
    const quizzes = await coursesClient.findQuizzesForCourse(cid);
    dispatch(setQuizzes(quizzes));

    // If student, fetch their attempts for all quizzes
    if (!isFaculty && currentUser) {
      const attempts = await Promise.all(
        quizzes.map((quiz: Quiz) => 
          quizQuestionsClient.findStudentQuizzesByStudentAndQuiz(currentUser._id, quiz._id)
        )
      );
      const attemptsMap = quizzes.reduce((acc: any, quiz: Quiz, index: number) => {
        acc[quiz._id] = attempts[index];
        return acc;
      }, {});
      setStudentAttempts(attemptsMap);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const getLastAttemptScore = (quizId: string) => {
    const attempts = studentAttempts[quizId] || [];
    if (attempts.length === 0) return null;
    const lastAttempt = attempts.sort((a: any, b: any) => 
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    )[0];
    return `${lastAttempt.score}/${lastAttempt.totalPoints}`;
  };

  const getNumberOfQuestions = async (quizId: string) => {
    const questions = await quizQuestionsClient.findQuestionsForQuiz(quizId);
    return questions.length;
  };

  const [questionCounts, setQuestionCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchQuestionCounts = async () => {
      const counts: Record<string, number> = {};
      for (const quiz of quizzes) {
        counts[quiz._id] = await getNumberOfQuestions(quiz._id);
      }
      setQuestionCounts(counts);
    };
    if (quizzes.length > 0) {
      fetchQuestionCounts();
    }
  }, [quizzes]);

  const filteredQuizzes = quizzes && quizzes
    .filter((quiz: Quiz) => quiz.course === cid)
    .filter((quiz: Quiz) => 
      (quiz.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((quiz: Quiz) => isFaculty || quiz.published);

  const getAvailabilityStatus = (quiz: Quiz) => {
    const now = new Date();
    const availableFrom = new Date(quiz.availableFrom);
    const availableUntil = new Date(quiz.availableUntil);

    if (now > availableUntil) {
      return "Closed";
    } else if (now >= availableFrom && now <= availableUntil) {
      return "Available";
    } else {
      return `Not available until ${availableFrom.toLocaleDateString()}`;
    }
  };

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
                      <b>Availability</b> {getAvailabilityStatus(quiz)} | 
                      <br /> 
                      <b>Due</b> {new Date(quiz.dueDate).toLocaleDateString()} at 11:59pm | 
                      {quiz.points} pts | {questionCounts[quiz._id] || 0} Questions
                      {!isFaculty && studentAttempts[quiz._id]?.length > 0 && (
                        <> | <b>Score</b> {getLastAttemptScore(quiz._id)}</>
                      )}
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