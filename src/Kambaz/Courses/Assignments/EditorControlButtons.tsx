import { Button } from "react-bootstrap";

export default function EditorControlButtons() {

    return (
        <div id="wd-modules-controls" className="text-nowrap">

            <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment">
                Save
            </Button>
            <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-assignment-group">
                Cancel
            </Button>
        </div>);

}