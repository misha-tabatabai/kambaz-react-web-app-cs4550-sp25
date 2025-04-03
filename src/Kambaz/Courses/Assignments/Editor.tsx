import { Col, FormControl, FormGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import EditorControlButtons from "./EditorControlButtons";
import { useState, useEffect } from "react";
import * as assignmentClient from "./client";
import * as coursesClient from "../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultAssignment = {
    _id: "",
    title: "",
    description: "Add description here",
    points: "100",
    dueDate: "2024-05-13",
    availableFrom: "2024-05-06",
    availableUntil: "2024-05-20",
    course: cid,
    group: "ASSIGNMENTS",
    submissionType: "ONLINE",
    onlineEntry: false,
    websiteURL: false,
    mediaRecordings: false,
    studentAnnotation: false,
    fileUpload: false,
    gradeDisplay: "Percentage"
  };

  const [assignment, setAssignment] = useState(defaultAssignment);

  useEffect(() => {
    const fetchAssignment = async () => {
      if (aid && aid !== "new") {
        try {
          const assignments = await coursesClient.findAssignmentForCourse(cid as string);
          const existingAssignment = assignments.find((a: any) => a._id === aid);
          if (existingAssignment) {
            setAssignment({
              ...defaultAssignment,
              ...existingAssignment,
              course: cid
            });
          }
        } catch (error) {
          console.error("Failed to fetch assignment:", error);
        }
      }
    };
    fetchAssignment();
  }, [aid, cid]);

  const handleSave = async () => {
    try {
      if (aid === 'new') {
        const newAssignment = await coursesClient.createAssignmentForCourse(cid as string, assignment);
        dispatch(addAssignment(newAssignment));
      } else {
        const updatedAssignment = await assignmentClient.updateAssignment(assignment);
        dispatch(updateAssignment(updatedAssignment));
      }
      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Failed to save assignment:", error);
    }
  };
  
  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleChange = (field: string, value: any) => {
    setAssignment(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label> <br />

      <FormGroup className="mb-3" controlId="wd-assignment-box">
        <Col sm={6}>
          <FormControl
            placeholder="Assignment Name"
            value={assignment.title}
            onChange={(e) => handleChange('title', e.target.value)}
            style={{ width: "625px" }}
          />
        </Col>
      </FormGroup>

      <FormGroup className="mb-3">
        <Col sm={6}>
          <FormControl
            as="textarea"
            rows={12}
            value={assignment.description}
            onChange={(e) => handleChange('description', e.target.value)}
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
                    value={assignment.points}
                    onChange={(e) => handleChange('points', e.target.value)}
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
                  value={assignment.group}
                  onChange={(e) => handleChange('group', e.target.value)}
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
                  value={assignment.gradeDisplay}
                  onChange={(e) => handleChange('gradeDisplay', e.target.value)}
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
                      value={assignment.submissionType}
                      onChange={(e) => handleChange('submissionType', e.target.value)}
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
                        checked={assignment.onlineEntry}
                        onChange={(e) => handleChange('onlineEntry', e.target.checked)}
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
                        checked={assignment.websiteURL}
                        onChange={(e) => handleChange('websiteURL', e.target.checked)}
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
                        checked={assignment.mediaRecordings}
                        onChange={(e) => handleChange('mediaRecordings', e.target.checked)}
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
                        checked={assignment.studentAnnotation}
                        onChange={(e) => handleChange('studentAnnotation', e.target.checked)}
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
                        checked={assignment.fileUpload}
                        onChange={(e) => handleChange('fileUpload', e.target.checked)}
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
                    <input 
                      type="date" 
                      className="form-control border-0" 
                      id="wd-due-date"
                      value={assignment.dueDate}
                      onChange={(e) => handleChange('dueDate', e.target.value)}
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <div className="w-50">
                      <label htmlFor="wd-available-from" className="mb-1"><b>Available From</b></label>
                      <div className="input-group p-2 border rounded">
                        <input 
                          type="date" 
                          className="form-control border-0" 
                          id="wd-available-from"
                          value={assignment.availableFrom}
                          onChange={(e) => handleChange('availableFrom', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-50">
                      <label htmlFor="wd-available-until" className="mb-1"><b>Until</b></label>
                      <div className="input-group p-2 border rounded">
                        <input 
                          type="date" 
                          className="form-control border-0" 
                          id="wd-available-until"
                          value={assignment.availableUntil}
                          onChange={(e) => handleChange('availableUntil', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </FormGroup>
            </td>
          </tr>
        </tbody>
      </table>

      <EditorControlButtons onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}