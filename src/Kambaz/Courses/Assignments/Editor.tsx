export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name"><h3>Assignment Name</h3></label>
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description">
                The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page.
            </textarea>
            <br />
            <br />
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100} />
                    </td>
                </tr> <br />

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group">
                            <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="OPTION1">Option1</option>
                            <option value="OPTION2">Option2</option>
                            <option value="OPTION3">Option3</option>
                        </select>
                    </td>
                </tr> <br />

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade as</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option selected value="Percentage">Percentage</option>
                            <option value="OPTION1">Option1</option>
                            <option value="OPTION2">Option2</option>
                            <option value="OPTION3">Option3</option>
                        </select>
                    </td>
                </tr> <br />

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <select id="wd-submission-type">
                            <option selected value="ONLINE">Online</option>
                            <option value="OPTION1">Option1</option>
                            <option value="OPTION2">Option2</option>
                            <option value="OPTION3">Option3</option>
                        </select>
                    </td>
                </tr> <br />

                <tr>
                    <td></td>
                    <td align="left" valign="top">
                        <label>Online Entry Options</label><br />
                        <input type="checkbox" name="check-text-entry" id="wd-text-entry" />
                        <label htmlFor="wd-chkbox-text-entry">Text Entry</label><br />

                        <input type="checkbox" name="check-website-url" id="wd-website-url" />
                        <label htmlFor="wd-chkbox-website-url">Website URL</label><br />

                        <input type="checkbox" name="check-media-recordings" id="wd-media-recordings" />
                        <label htmlFor="wd-chkbox-media-recordings">Media Recordings</label><br />

                        <input type="checkbox" name="check-student-annotation" id="wd-student-annotation" />
                        <label htmlFor="wd-chkbox-student-annotation">Student Annotation</label><br />

                        <input type="checkbox" name="check-file-upload" id="wd-file-upload" />
                        <label htmlFor="wd-chkbox-file-upload">File Uploads</label>
                    </td>
                </tr> <br />

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-assign-to">Assign</label>
                    </td>
                    <td align="left">
                        Assign to<br />
                        <input type="text" placeholder="Everyone"
                            value="Everyone"
                            title="wd-assign-to"
                            id="wd-assign-to" />
                    </td>
                </tr> <br />

                <tr>
                    <td></td>
                    <td>
                        <label htmlFor="wd-due-date">Due</label><br />
                        <input type="date"
                            value="2024-05-13"
                            id="wd-due-date" /><br />
                    </td>
                </tr> <br />

                <tr>
                    <td></td>
                    <td>
                        <table>
                            <tr>
                                <td align="left" valign="top">
                                    <label htmlFor="wd-available-from">Available from</label>
                                </td>
                                <td align="left" valign="top">
                                    <label htmlFor="wd-available-until">Until</label>
                                </td>
                            </tr>

                            <tr>
                                <td align="left" valign="top">
                                    <input type="date"
                                        value="2024-05-20"
                                        id="wd-available-until" />
                                </td>
                                <td align="left" valign="top">
                                    <input type="date"
                                        value="2024-05-06"
                                        id="wd-available-from" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td colSpan={2}>
                        <hr />
                    </td>
                </tr>

                <tr>
                    <td colSpan={2} align="right" valign="top">
                        <button>Cancel</button>
                        <button>Save</button>
                    </td>
                </tr>
            </table>
        </div>
    );
}

