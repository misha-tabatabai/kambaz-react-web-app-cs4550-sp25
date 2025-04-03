import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const [module, setModule] = useState({
        id: 2, title: "Funky Monkey",
        description: "Teaches you how to be a Funky Monkey!",
        course: "CS1234"
    });
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-assignments" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment`}>
                Get Assignment
            </a><hr />
            <h4>Retrieving Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment/title`}>
                Get Title
            </a><hr />
            <h4>Modifying Properties</h4>
            <a id="wd-update-assignment-title"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <FormControl className="w-75" id="wd-assignment-title"
                defaultValue={assignment.title} onChange={(e) =>
                    setAssignment({ ...assignment, title: e.target.value })} />
            <hr />
            <a id="wd-update-assignment-score"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                Update Score
            </a>
            <FormControl className="w-75" id="wd-assignment-score"
                defaultValue={assignment.score} type="number" onChange={(e) =>
                    setAssignment({ ...assignment, score: Number(e.target.value) })} />
            <hr />
            <a id="wd-update-assignment-completed"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
                Update Completed
            </a>
            <input className="w-75" id="wd-assignment-score"
            type="checkbox" onChange={(e) =>
                    setAssignment({ ...assignment, completed: Boolean(e.target.value) })} 
                    checked={assignment.completed}/>
            <hr />




            <h3>Working With Objects | Modules</h3>
            <h4>Retrieving Objects | Modules</h4>
            <a id="wd-retrieve-modlue" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/module`}>
                Get Module
            </a><hr />
            <h4>Retrieving Properties | Modules</h4>
            <a id="wd-retrieve-module-title" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/module/title`}>
                Get Module Title
            </a><hr />

            <h4>Modifying Properties | Modules</h4>
            <a id="wd-update-module-title"
                className="btn btn-primary float-end"
                href={`${MODULE_API_URL}/title/${module.title}`}>
                Update Module Title
            </a>
            <FormControl className="w-75" id="wd-module-title"
                defaultValue={module.title} onChange={(e) =>
                    setModule({ ...module, title: e.target.value })} />
            <hr />
        </div>
    );
}
