import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Modules() {
    return (
        <div>
            <ModulesControls /><br /><br /><br /><br />
            <ListGroup className="rounded-0" id="wd-modules">
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" /> Week 1 <ModuleControlButtons />
                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" /> Introduction to the course <LessonControlButtons />
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" /> Learn what is Web Development <LessonControlButtons />
                        </ListGroup.Item>
                    </ListGroup>
                </ListGroup.Item>

                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" /> Week 2 <ModuleControlButtons />
                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" /> LESSON 1 <LessonControlButtons />
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" /> LESSON 2 <LessonControlButtons />
                        </ListGroup.Item>
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
    // return (
    //     <div>
    //         <div>
    //             <button>Collapse All</button>
    //             <button>View Progress</button>
    //             <select id="publish-all">
    //                 <option selected value="PUBLISH ALL">Publish All</option>
    //                 <option value="OPTION1">Option1</option>
    //                 <option value="OPTION2">Option2</option>
    //                 <option value="OPTION3">Option3</option>
    //             </select>
    //             <button>+ Module</button>
    //         </div>
    //         <ul id="wd-modules">
    //             <li className="wd-module">
    //                 <div className="wd-title">Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda</div>
    //                 <ul className="wd-lessons">
    //                     <li className="wd-lesson">
    //                         <span className="wd-title">LEARNING OBJECTIVES</span>
    //                         <ul className="wd-content">
    //                             <li className="wd-content-item">Introduction to the course</li>
    //                             <li className="wd-content-item">Learn what is Web Development</li>
    //                         </ul>
    //                     </li>
    //                     <li className="wd-lesson">
    //                         <span className="wd-title">READING</span>
    //                         <ul className="wd-content">
    //                             <li className="wd-content-item">Full Stack Developer - Chapter 1 - Introduction</li>
    //                             <li className="wd-content-item">Full Stack Developer - Chapter 2 - Creating User</li>
    //                         </ul>
    //                     </li>
    //                     <li className="wd-lesson">
    //                         <span className="wd-title">SLIDES</span>
    //                         <ul className="wd-content">
    //                             <li className="wd-content-item">Introduction to Web Development</li>
    //                             <li className="wd-content-item">Creating an HTTP server with Node.js</li>
    //                             <li className="wd-content-item">Creating a React Application</li>
    //                         </ul>
    //                     </li>
    //                 </ul>
    //             </li>
    //             <li className="wd-module">
    //                 <div className="wd-title">Week 1, Lecture 2 - Formatting User Interfaces with HTML</div>
    //                 <ul className="wd-lessons">
    //                     <li className="wd-lesson">
    //                         <span className="wd-title">LEARNING OBJECTIVES</span>
    //                         <ul className="wd-content">
    //                             <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
    //                             <li className="wd-content-item">Deploy the assignment to Netlify</li>
    //                         </ul>
    //                     </li>
    //                     <li className="wd-lesson">
    //                         <span className="wd-title">SLIDES</span>
    //                         <ul className="wd-content">
    //                             <li className="wd-content-item">Introduction to HTML and the DOM</li>
    //                             <li className="wd-content-item">Formatting Web content with Headings and</li>
    //                             <li className="wd-content-item">Formatting content with Lists and Tables</li>
    //                         </ul>
    //                     </li>
    //                 </ul>
    //             </li>
    //             <li className="wd-module">
    //                 <div className="wd-title">Week 2</div>
    //             </li>
    //             <li className="wd-module">
    //                 <div className="wd-title">Week 3</div>
    //             </li>
    //         </ul>
    //     </div>
    // );
}
