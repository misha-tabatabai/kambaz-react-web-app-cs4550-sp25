import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { ListGroup, Button } from "react-bootstrap";

export default function TodoItem({ todo }: any) {
    const dispatch = useDispatch();
    return (
        <ListGroup.Item>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                <div>{todo.title}</div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                        variant="primary"
                        onClick={() => dispatch(setTodo(todo))}
                        id="wd-set-todo-click">
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => dispatch(deleteTodo(todo.id))}
                        id="wd-delete-todo-click">
                        Delete
                    </Button>
                </div>
            </div>
        </ListGroup.Item>
    );
}