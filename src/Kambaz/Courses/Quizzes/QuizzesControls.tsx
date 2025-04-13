import { Button, FormControl } from "react-bootstrap";
import { FaPlus, FaEllipsisV } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

interface QuizzesControlsProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export default function QuizzesControls({ searchTerm, setSearchTerm }: QuizzesControlsProps) {
    const navigate = useNavigate();
    const { cid } = useParams();

    const handleAddQuiz = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes/new`);
    };

    return (
        <div id="wd-modules-controls" className="text-nowrap">
            <FormControl
                type="text"
                placeholder="Search for Quiz"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="me-2"
                style={{ width: "300px" }}
            />

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