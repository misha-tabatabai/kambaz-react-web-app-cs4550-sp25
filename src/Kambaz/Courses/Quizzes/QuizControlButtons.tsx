import { FaCheckCircle, FaTimesCircle, FaCircle } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteQuiz } from "./reducer";
import * as quizzesClient from "./client";

interface QuizControlButtonsProps {
    quizId: string;
    published: boolean;
}

export default function QuizControlButtons({ quizId, published }: QuizControlButtonsProps) {
    const navigate = useNavigate();
    const { cid } = useParams();
    const dispatch = useDispatch();

    const handleEdit = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}`);
    };

    const handleDelete = async () => {
        try {
            await quizzesClient.deleteQuiz(quizId);
            dispatch(deleteQuiz(quizId));
        } catch (error) {
            console.error("Failed to delete quiz:", error);
        }
    };

    const handlePublish = async () => {
        try {
            const quiz = await quizzesClient.findQuizById(quizId);
            await quizzesClient.updateQuiz({ ...quiz, published: true });
        } catch (error) {
            console.error("Failed to publish quiz:", error);
        }
    };

    const handleUnpublish = async () => {
        try {
            const quiz = await quizzesClient.findQuizById(quizId);
            await quizzesClient.updateQuiz({ ...quiz, published: false });
        } catch (error) {
            console.error("Failed to unpublish quiz:", error);
        }
    };

    return (
        <div className="float-end d-flex align-items-center">
            <span className="me-2 position-relative">
                {published ? (
                    <FaCheckCircle style={{ top: "2px" }} className="text-success me-1 position-absolute fs-5" />
                ) : (
                    <FaTimesCircle style={{ top: "2px" }} className="text-danger me-1 position-absolute fs-5" />
                )}
                <FaCircle className="text-white me-1 fs-6" />
            </span>
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                    ⋮
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
                    {published ? (
                        <Dropdown.Item onClick={handleUnpublish}>Unpublish</Dropdown.Item>
                    ) : (
                        <Dropdown.Item onClick={handlePublish}>Publish</Dropdown.Item>
                    )}
                    <Dropdown.Item>Copy</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Sort by Name</Dropdown.Item>
                    <Dropdown.Item>Sort by Due Date</Dropdown.Item>
                    <Dropdown.Item>Sort by Available Date</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
} 