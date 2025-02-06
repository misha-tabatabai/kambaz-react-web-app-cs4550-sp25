import { Row, Col, FormControl, FormGroup, FormLabel, InputGroup, FormSelect } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>

      <FormGroup as={Row} className="mb-2" controlId="wd-username">
        <Col sm={20}>
          <FormControl placeholder="username" defaultValue="alice" />
        </Col>
      </FormGroup>

      <FormGroup as={Row} className="mb-2" controlId="wd-password">
        <Col sm={20}>
          <FormControl placeholder="password" defaultValue="123" />
        </Col>
      </FormGroup>

      <FormGroup as={Row} className="mb-2" controlId="wd-firstname">
        <Col sm={20}>
          <FormControl placeholder="First Name" defaultValue="Alice" />
        </Col>
      </FormGroup>

      <FormGroup as={Row} className="mb-2" controlId="wd-lastname">
        <Col sm={20}>
          <FormControl placeholder="Last Name" defaultValue="Wonderland" />
        </Col>
      </FormGroup>

      <FormGroup as={Row} className="mb-2" controlId="wd-lastname">
        <Col sm={20}>
          <InputGroup>
            <FormControl
              type="date"
              defaultValue="mm/dd/yyyy"
              className="border rounded-start" />
          </InputGroup>
        </Col>
      </FormGroup>

      <FormGroup as={Row} className="mb-2" controlId="wd-email">
        <Col sm={20}>
          <FormControl placeholder="email" defaultValue="alice@wonderland.com" />
        </Col>
      </FormGroup>

      <FormGroup as={Row} className="mb-2" controlId="wd-role">
        <Col sm={20}>
          <InputGroup>
            <FormSelect className="border rounded">
              <option value="USER" selected>User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </FormSelect>
          </InputGroup>
        </Col>
      </FormGroup>

      <Link id="wd-signout-btn"
        to="/Kambaz/Account/Signin"
        className="btn btn-danger w-100 mb-2">
        Sign out </Link>
    </div>
  );
}

