import { Link, useParams, useLocation } from "react-router-dom";
export default function CourseNavigation() {
    const { cid } = useParams();
    const location = useLocation();
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => {
                const path = `/Kambaz/Courses/${cid}/${link}`;
                const isActive = location.pathname === path;
                return (
                    <Link
                        key={link}
                        to={path}
                        id={`wd-course-${link.toLowerCase()}-link`}
                        className={`list-group-item border-0 ${isActive ? "active" : "text-danger"}`}
                    >
                        {link}
                    </Link>
                );
            })}
        </div>
    );
}


// import { Link, useLocation, useParams } from "react-router-dom";
// export default function CoursesNavigation() {
//     const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
//     const { pathname } = useLocation();
//     const { cid } = useParams();

//     return (
//         <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0 d-none d-lg-block">
//             {links.map(link => (
//                 <Link key={link} to={`/Kanbas/Courses/${cid}/${link}`} id={`wd-course-${link.toLowerCase()}-link`}
//                     className={`list-group-item ${pathname.includes(link) ? "active" : "text-danger"} border border-0`}>
//                     {link}
//                 </Link>
//             ))}
//         </div>

//     );
// }