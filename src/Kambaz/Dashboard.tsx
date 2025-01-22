import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <img src="/images/classimage_1.png" width={200} />
                    <div>
                        <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link">
                            <h5> CS1234 React JS </h5>
                        </Link>
                        <p className="wd-dashboard-course-title">Full Stack software developer  </p>
                        <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link">
                            <button> Go </button>
                        </Link>
                    </div>
                </div>
                <div className="wd-dashboard-course">
                    <img src="/images/classimage_2.png" width={200} />
                    <div>
                        <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link">
                            <h5>CS3200 Intro to Databases</h5>
                        </Link>
                        <p className="wd-dashboard-course-title">Introduction to Databases</p>
                        <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link">
                            <button>Go</button>
                        </Link>
                    </div>
                </div>
                <div className="wd-dashboard-course">
                    <img src="/images/classimage_3.png" width={200} />
                    <div>
                        <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link">
                            <h5>ENGW3314 Adv Writing</h5>
                        </Link>
                        <p className="wd-dashboard-course-title">Advanced Writing</p>
                        <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link">
                            <button>Go</button>
                        </Link>
                    </div>
                </div>
                <div className="wd-dashboard-course">
                    <img src="/images/classimage_4.png" width={200} />
                    <div>
                        <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link">
                            <h5>ORGB3201 Org B</h5>
                        </Link>
                        <p className="wd-dashboard-course-title">Organizational Behavior</p>
                        <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link">
                            <button>Go</button>
                        </Link>
                    </div>
                </div>
                <div className="wd-dashboard-course">
                    <img src="/images/classimage_5.png" width={200} />
                    <div>
                        <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link">
                            <h5>CS2500 Fundies</h5>
                        </Link>
                        <p className="wd-dashboard-course-title">Fundamentals of Computer Science</p>
                        <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link">
                            <button>Go</button>
                        </Link>
                    </div>
                </div>
                <div className="wd-dashboard-course">
                    <img src="/images/classimage_6.png" width={200} />
                    <div>
                        <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link">
                            <h5>MGSC2301 Business Stats</h5>
                        </Link>
                        <p className="wd-dashboard-course-title">Business Statistics</p>
                        <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link">
                            <button>Go</button>
                        </Link>
                    </div>
                </div>
                <div className="wd-dashboard-course">
                    <img src="/images/classimage_7.png" width={200} />
                    <div>
                        <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link">
                            <h5>CS4550 Web Dev</h5>
                        </Link>
                        <p className="wd-dashboard-course-title">Website Development</p>
                        <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link">
                            <button>Go</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
