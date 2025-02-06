import { Col, FormControl, FormGroup } from "react-bootstrap";
import EditorControlButtons from "./EditorControlButtons";

export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label> <br />

            <FormGroup className="mb-2" controlId="wd-assignment-box">
                <Col sm={6}>
                    <FormControl placeholder="Assignment Name" defaultValue="A1" />
                </Col>
            </FormGroup>

            {/* THIS COMMENTED OUT SECTION IS THE CODE TO FORMAT IT EXACTLY LIKE THE IMAGE
               HOWEVER IT IS NOT EDITABLE | I WAS NOT SURE WHAT WAS BETTER TO IMPLEMENT SO
               IF IT IS BETTER TO HAVE IT LOOK EXACTLYLIKE THE IMAGE (RED TEXT AND BULLETS)
               THEN I CAN USE THIS INSTEAD.
               
           <FormGroup className="mb-3">
                <div className="p-3 border rounded wd-assignemnt-box">
                    <p>
                        The assignment is <span className="text-danger">available online</span>
                    </p>
                    <p>Submit a link to the landing page of your Web application running on Netlify.</p>
                    <p>The landing page should include the following:</p>
                    <ul>
                        <li>Your full name and section</li>
                        <li>Links to each of the lab assignments</li>
                        <li>Link to the Kanbas application</li>
                        <li>Links to all relevant source code repositories</li>
                    </ul>
                    <p>The Kanbas application should include a link to navigate back to the landing page.</p>
                </div>
            </FormGroup>  */}

            <FormGroup className="mb-3">
                <Col sm={6}>
                    <FormControl
                        as="textarea"
                        rows={12}
                        defaultValue={`The assignment is [available online]\n\nSubmit a link to the landing page of your Web application running on Netlify.\n\nThe landing page should include the following:\n\n- Your full name and section\n- Links to each of the lab assignments\n- Link to the Kanbas application\n- Links to all relevant source code repositories\n\nThe Kanbas application should include a link to navigate back to the landing page.`} />
                </Col>
            </FormGroup>

            <table>
                <tr>
                    <td align="right" valign="top" style={{ paddingRight: "10px" }}>
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <FormGroup className="mb-2" controlId="wd-assignment-box-2">
                            <Col sm={12}>
                                <FormControl placeholder="Points" defaultValue="100" />
                            </Col>
                        </FormGroup>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top" style={{ paddingRight: "10px" }}>
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <FormGroup className="mb-2">
                            <select
                                id="wd-group"
                                className="form-select p-3 border rounded wd-assignemnt-box-2">
                                <option value="ASSIGNMENTS" selected> ASSIGNMENTS</option>
                                <option value="OPTION1">Option1</option>
                                <option value="OPTION2">Option2</option>
                                <option value="OPTION3">Option3</option>
                            </select>
                        </FormGroup>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top" style={{ paddingRight: "10px" }}>
                        <label htmlFor="wd-group">Display Grade as</label>
                    </td>
                    <td>
                        <FormGroup className="mb-2">
                            <select
                                id="wd-group"
                                className="form-select p-3 border rounded wd-assignemnt-box-2">
                                <option value="ASSIGNMENTS" selected>Percentage</option>
                                <option value="OPTION1">Option1</option>
                                <option value="OPTION2">Option2</option>
                                <option value="OPTION3">Option3</option>
                            </select>
                        </FormGroup>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top" style={{ paddingRight: "10px" }}>
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <FormGroup className="mb-2">
                            <div className="p-3 border rounded wd-assignment-box-2">
                                <div className="p-2 border rounded wd-submission-dropdown">
                                    <select
                                        id="wd-submission-type"
                                        className="form-select p-2 border-0 w-100">
                                        <option value="ONLINE" selected>Online</option>
                                        <option value="OPTION1">Option1</option>
                                        <option value="OPTION2">Option2</option>
                                        <option value="OPTION3">Option3</option>
                                    </select>
                                </div>

                                <div className="mt-3">
                                    <label className="mb-2"><b>Online Entry Options</b></label>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="wd-text-entry" />
                                        <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="wd-website-url" />
                                        <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="wd-media-recordings" />
                                        <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="wd-student-annotation" />
                                        <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="wd-file-upload" />
                                        <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
                                    </div>
                                </div>
                            </div>
                        </FormGroup>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top" style={{ paddingRight: "10px" }}>
                        <label htmlFor="wd-assign">Assign</label>
                    </td>
                    <td>
                        <FormGroup className="mb-2">
                            <div className="p-3 border rounded wd-assignment-box-2">

                                <label htmlFor="wd-assign-to" className="mb-1"><b>Assign To</b></label>
                                <div className="p-2 border rounded mb-3">
                                    <div className="d-flex align-items-center">
                                        <span className="badge bg-secondary me-2 p-2 text-dark">
                                            Everyone
                                            <button type="button" className="btn-close ms-2" aria-label="Remove"></button>
                                        </span>
                                    </div>
                                </div>

                                <label htmlFor="wd-due-date" className="mb-1"><b>Due</b></label>
                                <div className="input-group p-2 border rounded mb-3">
                                    <input type="date" className="form-control border-0" id="wd-due-date" defaultValue="2024-05-13" />
                                </div>

                                <div className="d-flex gap-2">
                                    <div className="w-50">
                                        <label htmlFor="wd-available-from" className="mb-1"><b>Available From</b></label>
                                        <div className="input-group p-2 border rounded">
                                            <input type="date" className="form-control border-0" id="wd-available-from" defaultValue="2024-05-06" />
                                        </div>
                                    </div>
                                    <div className="w-50">
                                        <label htmlFor="wd-available-until" className="mb-1"><b>Until</b></label>
                                        <div className="input-group p-2 border rounded">
                                            <input type="date" className="form-control border-0" id="wd-available-until" defaultValue="2024-05-20" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </FormGroup>
                    </td>
                </tr>

                <tr>
                    <td colSpan={2}>
                        <hr />
                    </td>
                </tr>

                <tr>
                    <td colSpan={2} align="right" valign="top">
                        <EditorControlButtons />
                    </td>
                </tr>
            </table>
        </div>
    );
}

