import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as enrollmentClient from "./client";
import { removeEnrolledCourse, addEnrolledCourse, setEnrolledCourses } from "./reducer";
import * as userClient from "../Account/client";

export default function Enrollments(
    { courses, enrolledCourses, updateEnrollment }: {
        courses: any[];
        enrolledCourses: any[];
        updateEnrollment: (courseId: string, isEnrolling: boolean) => void;
    }) {

    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isStudent = currentUser?.role === "STUDENT";

    const handleUnenroll = async (courseId: string) => {
        if (!currentUser) return;
        try {
            await enrollmentClient.unenrollUserFromCourse(currentUser._id, courseId);
            const updatedCourses = await userClient.findMyCourses();
            dispatch(setEnrolledCourses(updatedCourses));
            updateEnrollment(courseId, false);
            dispatch(removeEnrolledCourse(courseId));
        } catch (error) {
            console.error("Error unenrolling from course:", error);
        }
    };

    const handleEnroll = async (courseId: string) => {
        if (!currentUser) return;
        try {
            await enrollmentClient.enrollUserInCourse(currentUser._id, courseId);
            const updatedCourses = await userClient.findMyCourses();
            dispatch(setEnrolledCourses(updatedCourses));
            updateEnrollment(courseId, true);
            dispatch(addEnrolledCourse(courses.find(c => c._id === courseId)));
        } catch (error) {
            console.error("Error enrolling in course:", error);
        }
    };

    const isEnrolled = (courseId: string) => {
        return enrolledCourses.some(course => course._id === courseId);
    };

    return (
        <div id="wd-enrollments">
            <h1 id="wd-enrollments-title">Enrollments</h1> <hr />

            <h2 id="wd-enrollments-courses">
                Available Courses ({courses.length})
            </h2> <hr />
            <div id="wd-enrollments-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses
                        .map((course) => (
                            <Col className="wd-enrollments-course" style={{ width: "270px" }}>
                                <Card>
                                    <Link to={`/Kambaz/Courses/${course._id}/Home`}
                                        className="wd-enrollments-course-link text-decoration-none text-dark">
                                        <Card.Img variant="top" src="/images/classimage_1.png" width="100%" height={160} />
                                        <Card.Body>
                                            <Card.Title className="wd-enrollments-course-title text-nowrap overflow-hidden">{course.name}</Card.Title><hr />
                                            <Card.Text className="wd-enrollments-course-description overflow-hidden" style={{ height: "100px" }}>{course.description}</Card.Text>
                                            <Button variant="primary"> Go </Button>

                                            {isStudent && (
                                                isEnrolled(course._id) ? (
                                                    <button
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            handleUnenroll(course._id);
                                                        }}
                                                        className="btn btn-danger float-end"
                                                        id="wd-unenroll-course-click"
                                                    >
                                                        Unenroll
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            handleEnroll(course._id);
                                                        }}
                                                        className="btn btn-success float-end"
                                                        id="wd-enroll-course-click"
                                                    >
                                                        Enroll
                                                    </button>
                                                )
                                            )}
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </div>
        </div>
    );
}
