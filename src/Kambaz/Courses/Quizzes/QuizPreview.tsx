import { Button, Card, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function QuizPreview() {
  const navigate = useNavigate();
  // TODO: Get questions from state or props

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Quiz Preview</h2>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back to Editor
        </Button>
      </div>
      <hr />

      <Card className="mb-4">
        <Card.Body>
          <h4>Quiz Instructions</h4>
          <p>This is a preview of how the quiz will appear to students.</p>
        </Card.Body>
      </Card>

      {/* TODO: Map through questions and display them */}
      <Card className="mb-3">
        <Card.Body>
          <h5>Question 1</h5>
          <p>This is a sample question.</p>
          <div className="mb-3">
            <FormControl type="text" placeholder="Your answer" />
          </div>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-end">
        <Button variant="primary">Submit Quiz</Button>
      </div>
    </div>
  );
} 