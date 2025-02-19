import "./index.css";
import { BsGripVertical } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { IoMdArrowDropdown } from "react-icons/io";
import { useParams } from "react-router";
import * as db from "../../Database";
import LessonControlButtons from "../Modules/LessonControlButtons";

export default function Assignments() {
  const { cid } = useParams();
  console.log("Assignments: cid =", cid);

  const assignments = db.assignments;
  console.log("Assignments: all assignments =", assignments);

  const filteredAssignments =
    assignments && assignments.filter((assignment: any) => assignment.course === cid);
  console.log("Assignments: filteredAssignments =", filteredAssignments);

  return (
    <div id="wd-assignments">
      <AssignmentsControls /><br /><br /><br /><br />
      <ul className="rounded-0" id="wd-modules">
      <div className="wd-title p-3 ps-2 bg-secondary">
  <BsGripVertical className="me-2 fs-3" />
  <IoMdArrowDropdown />
  <span style={{ fontSize: "1.5rem" }}>ASSIGNMENTS</span> <AssignmentControlButtons />
</div>
          <ul className="wd-lessons list-group rounded-0">
            {filteredAssignments && filteredAssignments.length > 0 ? (
              filteredAssignments.map((assignment: any) => (
                <li key={assignment._id} className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <SlNote size="25" color="green" />
                  <div className="position-absolute top-50 start-50 translate-middle w-75">
                    <a
                      className="wd-assignment-link text-black link-underline link-underline-opacity-0"
                      href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                    >
                      <h4>{assignment.title}</h4>
                      <p><text className="text-danger">Multiple Modules</text> | <b>Not Available until</b> May 6 at 12:00am | <br /> <b>Due</b> May 13 at 11:59pm | 100 pts</p>
                    </a>
                  </div>
                  <div className="ms-auto d-flex align-items-center">
                    <LessonControlButtons /> <br /><br /><br />
                  </div>
                </li>
              ))
            ) : (
              <li className="wd-lesson list-group-item p-3 ps-1">
                No assignments available for this course.
              </li>
            )}
          </ul>
      </ul>
    </div>
  );
}