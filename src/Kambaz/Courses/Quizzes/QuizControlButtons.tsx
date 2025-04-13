import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";

interface QuizControlButtonsProps {
    quizId: string;
}

export default function QuizControlButtons({ }: QuizControlButtonsProps) {
    return (
        <div className="float-end d-flex align-items-center">
            <span className="me-2 position-relative">
                <FaCheckCircle style={{ top: "2px" }} className="text-success me-1 position-absolute fs-5" />
                <FaCircle className="text-white me-1 fs-6" />
            </span>
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                    ⋮
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>Edit</Dropdown.Item>
                    <Dropdown.Item>Delete</Dropdown.Item>
                    <Dropdown.Item>Publish</Dropdown.Item>
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