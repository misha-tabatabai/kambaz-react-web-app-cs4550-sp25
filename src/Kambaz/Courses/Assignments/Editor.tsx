import { Col, FormControl, FormGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import * as db from "../../Database";
import { useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import EditorControlButtons from "./EditorControlButtons";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSave = () => {
    if (aid == 'new') {
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment(assignment));
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };
  
  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const defaultAssignment = {
    _id: "",
    title: "",
    description: "Add description here",
    points: "100",
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    course: cid,
    group: "",
    submissionType: "ONLINE",
    onlineEntry: false,
    websiteURL: false,
    mediaRecordings: false,
    studentAnnotation: false,
    fileUpload: false,
    gradeDisplay: "Percentage"
  };

  const assignment =
    aid === "new"
      ? defaultAssignment
      : db.assignments.find((a: any) => a._id === aid && a.course === cid) || defaultAssignment;

  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label> <br />

      <FormGroup className="mb-3" controlId="wd-assignment-box">
        <Col sm={6}>
          <FormControl
            placeholder="Assignment Name"
            defaultValue={assignment.title}
            style={{ width: "625px" }}
          />
        </Col>
      </FormGroup>

      <FormGroup className="mb-3">
        <Col sm={6}>
          <FormControl
            as="textarea"
            rows={12}
            defaultValue={defaultAssignment.description
            }
            style={{ width: "625px" }}
          />
        </Col>
      </FormGroup>

      <table>
        <tbody>
          <tr>
            <td align="right" valign="top" style={{ paddingRight: "10px" }}>
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <FormGroup className="mb-3" controlId="wd-assignment-box-2">
                <Col sm={12}>
                  <FormControl
                    placeholder="Points"
                    defaultValue="100"
                  //defaultValue={assignment.points || "100"}
                  />
                </Col>
              </FormGroup>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top" style={{ paddingRight: "10px" }}>
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <FormGroup className="mb-3">
                <select
                  id="wd-group"
                  className="form-select p-3 border rounded wd-assignemnt-box-2"
                  defaultValue="ASSIGNMENTS"
                //defaultValue={assignment.group || "ASSIGNMENTS"}
                >
                  <option value="ASSIGNMENTS">ASSIGNMENTS</option>
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
              <FormGroup className="mb-3">
                <select
                  id="wd-group"
                  className="form-select p-3 border rounded wd-assignemnt-box-2"
                  defaultValue="Percentage"
                //defaultValue={assignment.gradeDisplay || "Percentage"}
                >
                  <option value="Percentage">Percentage</option>
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
              <FormGroup className="mb-3">
                <div className="p-3 border rounded wd-assignemnt-box-3">
                  <div className="p-2 border rounded wd-submission-dropdown">
                    <select
                      id="wd-submission-type"
                      className="form-select p-2 border-0 w-100"
                      defaultValue="ONLINE"
                    //defaultValue={assignment.submissionType || "ONLINE"}
                    >
                      <option value="ONLINE">Online</option>
                      <option value="OPTION1">Option1</option>
                      <option value="OPTION2">Option2</option>
                      <option value="OPTION3">Option3</option>
                    </select>
                  </div>

                  <div className="mt-3">
                    <label className="mb-2"><b>Online Entry Options</b></label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="wd-text-entry"
                      //defaultChecked={assignment.onlineEntry || false}
                      />
                      <label className="form-check-label" htmlFor="wd-text-entry">
                        Text Entry
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="wd-website-url"
                      //defaultChecked={assignment.websiteURL || false}
                      />
                      <label className="form-check-label" htmlFor="wd-website-url">
                        Website URL
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="wd-media-recordings"
                      //defaultChecked={assignment.mediaRecordings || false}
                      />
                      <label className="form-check-label" htmlFor="wd-media-recordings">
                        Media Recordings
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="wd-student-annotation"
                      //defaultChecked={assignment.studentAnnotation || false}
                      />
                      <label className="form-check-label" htmlFor="wd-student-annotation">
                        Student Annotation
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="wd-file-upload"
                      //defaultChecked={assignment.fileUpload || false}
                      />
                      <label className="form-check-label" htmlFor="wd-file-upload">
                        File Uploads
                      </label>
                    </div>
                  </div>
                </div>
              </FormGroup>
            </td>
          </tr> <br />

          <tr>
            <td align="right" valign="top" style={{ paddingRight: "10px" }}>
              <label htmlFor="wd-assign">Assign</label>
            </td>
            <td>
              <FormGroup className="mb-3">
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
                    <input type="date" className="form-control border-0" id="wd-due-date"
                      defaultValue="2024-05-13"
                    //defaultValue={assignment.dueDate || "2024-05-13"}
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <div className="w-50">
                      <label htmlFor="wd-available-from" className="mb-1"><b>Available From</b></label>
                      <div className="input-group p-2 border rounded">
                        <input type="date" className="form-control border-0" id="wd-available-from"
                          defaultValue="2024-05-06"
                        //defaultValue={assignment.availableDate || "2024-05-06"}
                        />
                      </div>
                    </div>
                    <div className="w-50">
                      <label htmlFor="wd-available-until" className="mb-1"><b>Until</b></label>
                      <div className="input-group p-2 border rounded">
                        <input type="date" className="form-control border-0" id="wd-available-until"
                          defaultValue="2024-05-20"
                        //defaultValue={assignment.availableUntil || "2024-05-20"} 
                        />
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
              <EditorControlButtons onSave={handleSave} onCancel={handleCancel} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}