import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function AssignmentControlButtons2(
    { assignmentId, deleteAssignment }: {
        assignmentId: string;
        deleteAssignment: (assignmentId: string) => void;
    }
) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";

    return (
        <div className="float-end">
            {isFaculty && (
                <>
                    <FaTrash
                        onClick={() => deleteAssignment(assignmentId)} 
                        className="text-danger me-2 mb-1"
                        />
                </>
            )}
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}