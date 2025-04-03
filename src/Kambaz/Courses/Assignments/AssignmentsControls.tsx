import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

export default function AssignmentsControls() {
    const navigate = useNavigate();
    const { cid } = useParams();

    const handleAddAssignment = () => {
        navigate(`/Kambaz/Courses/${cid}/Assignments/new`);
    };

    return (
        <div id="wd-modules-controls" className="text-nowrap">
            <input id="wd-search-assignment" className="form-control float-start w-50" type="search" placeholder="&#x1F50D; Search..." />

            <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment"
                onClick={handleAddAssignment}>
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Assignment
            </Button>
            <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-assignment-group">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Group
            </Button>
        </div>
    );
}