import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FormControl } from "react-bootstrap";

interface AssignmentsControlsProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export default function AssignmentsControls({ searchTerm, setSearchTerm }: AssignmentsControlsProps) {
    const navigate = useNavigate();
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";

    const handleAddAssignment = () => {
        navigate(`/Kambaz/Courses/${cid}/Assignments/new`);
    };

    return (
        <div id="wd-modules-controls" className="d-flex align-items-center justify-content-between">
            <FormControl
                type="text"
                placeholder="Search for assignments"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="me-2"
                style={{ width: "300px" }}
            />

            {isFaculty && (
                <div className="d-flex">
                    <Button variant="danger" size="lg" className="me-1" id="wd-add-assignment"
                        onClick={handleAddAssignment}>
                        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                        Assignment
                    </Button>
                    <Button variant="secondary" size="lg" className="me-1" id="wd-add-assignment-group">
                        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                        Group
                    </Button>
                </div>
            )}
        </div>
    );
}