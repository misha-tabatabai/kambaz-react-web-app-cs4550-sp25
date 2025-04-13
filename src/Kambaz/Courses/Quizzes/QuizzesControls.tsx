import { Button } from "react-bootstrap";
import { FaPlus, FaEllipsisV } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

export default function QuizzesControls() {
    const navigate = useNavigate();
    const { cid } = useParams();

    const handleAddQuiz = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes/new`);
    };

    return (
        <div id="wd-modules-controls" className="text-nowrap">
            <input id="wd-search-quiz" className="form-control float-start w-50" type="search" placeholder="Search for Quizzes" />

            <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-quiz-options">
                <FaEllipsisV className="position-relative" style={{ bottom: "1px" }} />
            </Button>
            <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-quiz"
                onClick={handleAddQuiz}>
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Quiz
            </Button>
        </div>
    );
} 