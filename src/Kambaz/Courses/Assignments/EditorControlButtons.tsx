import { Button } from "react-bootstrap";

export default function EditorControlButtons({
  onSave,
  onCancel,
}: {
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        id="wd-add-assignment"
        onClick={onSave}
      >
        Save
      </Button>
      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-add-assignment-group"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  );
}
