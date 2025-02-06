import "./index.css";

import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { IoMdArrowDropdown } from "react-icons/io";
import { SlNote } from "react-icons/sl";

export default function Assignments() {
    return (
        <div id="wd-assignments">

            <AssignmentsControls /><br /><br /><br /><br />
            <ListGroup className="rounded-0" id="wd-modules">
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        <IoMdArrowDropdown />
                        ASSIGNMENTS <AssignmentControlButtons />
                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ul className="wd-lessons list-group rounded-0">
                            <li className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center">
                                <BsGripVertical className="me-2 fs-3" />
                                <SlNote size="25" color="green" />
                                <div className="position-absolute top-50 start-50 translate-middle w-75">
                                    <a className="wd-assignment-link text-black link-underline link-underline-opacity-0" href="#/Kambaz/Courses/1234/Assignments/123"> <b>A1</b> </a>
                                    <p><text className="text-danger">Multiple Modules</text> | <b>Not Available until</b> May 6 at 12:00am | <br /> <b>Due</b> May 13 at 11:59pm | 100 pts</p>
                                </div>
                                <div className="ms-auto d-flex align-items-center">
                                    <LessonControlButtons /> <br /><br /><br />
                                </div>
                            </li>
                            <li className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center">
                                <BsGripVertical className="me-2 fs-3" />
                                <SlNote size="25" color="green" />
                                <div className="position-absolute top-50 start-50 translate-middle w-75">
                                    <a className="wd-assignment-link text-black link-underline link-underline-opacity-0" href="#/Kambaz/Courses/1234/Assignments/123"> <b>A2</b> </a>
                                    <p><text className="text-danger">Multiple Modules</text> | <b>Not Available until</b> May 13 at 12:00am | <br /> <b>Due</b> May 20 at 11:59pm | 100 pts</p>
                                </div>
                                <div className="ms-auto d-flex align-items-center">
                                    <LessonControlButtons /> <br /><br /><br />
                                </div>                            </li>
                            <li className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center">
                                <BsGripVertical className="me-2 fs-3" />
                                <SlNote size="25" color="green" />
                                <div className="position-absolute top-50 start-50 translate-middle w-75">
                                    <a className="wd-assignment-link text-black link-underline link-underline-opacity-0" href="#/Kambaz/Courses/1234/Assignments/123"> <b>A3</b> </a>
                                    <p><text className="text-danger">Multiple Modules</text> | <b>Not Available until</b> May 20 at 12:00am | <br /> <b>Due</b> May 27 at 11:59pm | 100 pts</p>
                                </div>
                                <div className="ms-auto d-flex align-items-center">
                                    <LessonControlButtons /> <br /><br /><br />
                                </div>                            </li>
                        </ul>
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}




// export default function Assignments() {
//     return (
//         <div id="wd-assignments">
//             <h3 id="wd-assignments-title">
//                 ASSIGNMENTS 40% of Total <button>+</button> </h3>
//             <ul id="wd-assignment-list">
//                 <li className="wd-assignment-list-item">
//                     <a href="#/Kambaz/Courses/1234/Assignments/123"
//                         className="wd-assignment-link" >
//                         A1 - ENV + HTML
//                     </a> </li>
//                 <p className="wd-assignment-details">Multiple Modules | <b>Not available until</b> May 6 at 12:00am |  <b>Due</b> May 13 at 11:59pm | 100 pts</p>
//                 <li className="wd-assignment-list-item">
//                     <a href="#/Kambaz/Courses/1234/Assignments/123"
//                         className="wd-assignment-link" >
//                         A2 - CSS + BOOTSTRAP
//                     </a> </li>
//                 <p className="wd-assignment-details">Multiple Modules | <b>Not available until</b> May 13 at 12:00am | <b>Due</b> May 20 at 11:59pm | 100 pts</p>
//                 <li className="wd-assignment-list-item">
//                     <a href="#/Kambaz/Courses/1234/Assignments/123"
//                         className="wd-assignment-link" >
//                         A3 - JAVASCRIPT + REACT
//                     </a> </li>
//                 <p className="wd-assignment-details">Multiple Modules | <b>Not available until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm | 100 pts</p>
//             </ul>
//         </div>
//     );
// }
