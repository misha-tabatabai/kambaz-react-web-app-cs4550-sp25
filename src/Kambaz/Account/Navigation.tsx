import { Link, useLocation } from "react-router-dom";

export default function AccountNavigation() {
  const { pathname } = useLocation();

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link 
        to="/Kambaz/Account/Signin" 
        className={`list-group-item border border-0 ${pathname === "/Kambaz/Account/Signin" ? "active" : "text-danger"}`}
      > 
        Signin  
      </Link>
      <Link 
        to="/Kambaz/Account/Signup" 
        className={`list-group-item border border-0 ${pathname === "/Kambaz/Account/Signup" ? "active" : "text-danger"}`}
      > 
        Signup  
      </Link>
      <Link 
        to="/Kambaz/Account/Profile" 
        className={`list-group-item border border-0 ${pathname === "/Kambaz/Account/Profile" ? "active" : "text-danger"}`}
      > 
        Profile 
      </Link>
    </div>
  );
}

