import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";


export default function QuizzesControls() {
    const navigate = useNavigate();
    const { cid } = useParams();

    const handleAddQuiz = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes/new`);
    };

    return (
        <div id="wd-modules-controls" className="d-flex align-items-center justify-content-between">
            <div className="d-flex">
                <Button variant="danger" size="lg" className="me-1" id="wd-add-quiz"
                    onClick={handleAddQuiz}>
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Quiz
                </Button>
            </div>
        </div>
    );
} 