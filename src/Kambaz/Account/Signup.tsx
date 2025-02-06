import { FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Signup() {
    return (
        <div id="wd-signup-screen">
            <h1>Signup</h1>
            <FormControl id="wd-username"
                placeholder="username"
                className="mb-2" />

            <FormControl id="wd-password"
                placeholder="password" type="password"
                className="mb-2" />

            <FormControl id="wd-password-verify"
                placeholder="verify password" type="verify password"
                className="mb-2" />

            <Link id="wd-signin-btn"
                to="/Kambaz/Account/Profile"
                className="btn btn-primary w-100 mb-2">
                Signup </Link>
            <Link id="wd-signup-link" to="/Kambaz/Account/Signin">Signin</Link>
        </div>
    );
}
