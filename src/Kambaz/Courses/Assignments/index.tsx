import "./index.css";
import { BsGripVertical } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { IoMdArrowDropdown } from "react-icons/io";
import { useParams } from "react-router";
import AssignmentControlButtons2 from "./AssignmentControlButtons2";
import { setAssignments, deleteAssignment } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import * as assignmentClient from "./client";
import * as coursesClient from "../client";
import { useEffect, useState } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const isFaculty = currentUser?.role === "FACULTY";
  const [searchTerm, setSearchTerm] = useState("");

  const removeAssignment = async (assignmentId: string) => {
    try {
      await assignmentClient.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    } catch (error) {
      console.error("Failed to delete assignment:", error);
    }
  };

  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const filteredAssignments = assignments && assignments
    .filter((assignment: any) => assignment.course === cid)
    .filter((assignment: any) => 
      (assignment.title || assignment.name)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  return (
    <div id="wd-assignments">
      <AssignmentsControls 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <br /><hr /><br />
      <ul className="rounded-0" id="wd-modules">
        <div className="wd-title p-3 ps-2 bg-secondary">
          <BsGripVertical className="me-2 fs-3" />
          <IoMdArrowDropdown />
          <span style={{ fontSize: "1.5rem" }}>ASSIGNMENTS</span> <AssignmentControlButtons />
        </div>
        <ul className="wd-lessons list-group rounded-0">
          {filteredAssignments && filteredAssignments.length > 0 ? (
            filteredAssignments.map((assignment: any) => (
              <li key={assignment._id} className="wd-lesson list-group-item p-3 ps-1">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <SlNote size="25" color="green" className="me-2" />
                  <div className="flex-grow-1">
                    {isFaculty ? (
                      <a
                        className="wd-assignment-link text-black link-underline link-underline-opacity-0"
                        href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                      >
                        <h4>{assignment.title || assignment.name}</h4>
                        <p>
                          <text className="text-danger">{assignment.group}</text> | 
                          <b>Not Available until</b> {new Date(assignment.availableFrom).toLocaleDateString()} at 12:00am | 
                          <br /> 
                          <b>Due</b> {new Date(assignment.dueDate).toLocaleDateString()} at 11:59pm | 
                          {assignment.points} pts
                        </p>
                      </a>
                    ) : (
                      <div>
                        <h4>{assignment.title || assignment.name}</h4>
                        <p>
                          <text className="text-danger">{assignment.group}</text> | 
                          <b>Not Available until</b> {new Date(assignment.availableFrom).toLocaleDateString()} at 12:00am | 
                          <br /> 
                          <b>Due</b> {new Date(assignment.dueDate).toLocaleDateString()} at 11:59pm | 
                          {assignment.points} pts
                        </p>
                      </div>
                    )}
                  </div>
                  <AssignmentControlButtons2
                    assignmentId={assignment._id}
                    deleteAssignment={(assignmentId) => removeAssignment(assignmentId)}
                  />
                </div>
              </li>
            ))
          ) : (
            <li className="wd-lesson list-group-item p-3 ps-1">
              {searchTerm ? "No assignments found matching your search." : "No assignments available for this course."}
            </li>
          )}
        </ul>
      </ul>
    </div>
  );
}





