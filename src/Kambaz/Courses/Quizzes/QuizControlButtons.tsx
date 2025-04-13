import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";

export default function QuizControlButtons() {
    return (
        <div className="float-end d-flex align-items-center">
            <span className="me-2 position-relative">
                <FaCheckCircle style={{ top: "2px" }} className="text-success me-1 position-absolute fs-5" />
                <FaCircle className="text-white me-1 fs-6" />
            </span>
            <Dropdown>
                <Dropdown.Toggle variant="link" id="quiz-context-menu" className="text-dark p-0">
                    <IoEllipsisVertical className="fs-4" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>Edit</Dropdown.Item>
                    <Dropdown.Item>Delete</Dropdown.Item>
                    <Dropdown.Item>Publish</Dropdown.Item>
                    <Dropdown.Item>Copy</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.ItemText>Sort By</Dropdown.ItemText>
                    <Dropdown.Item>Name</Dropdown.Item>
                    <Dropdown.Item>Due Date</Dropdown.Item>
                    <Dropdown.Item>Available Date</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
} 