import { useState } from "react";

export default function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);

    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };

    const deleteElement = (index: number) => {
        setArray(array.filter((_, i) => i !== index));
    };

    return (
        <div id="wd-array-state-variables">
            <h2>Array State Variable</h2>
            <button onClick={addElement} className="btn btn-success">
                Add Element
            </button> <br /> <br />
            <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                {array.map((item, index) => (
                    <li
                        key={index}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            display: "flex",
                            alignItems: "center",
                            maxWidth: "400px",
                            justifyContent: "space-between"
                        }}>
                        <span>{item}</span>
                        <button
                            onClick={() => deleteElement(index)}
                            className="btn btn-danger">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <hr />
        </div>
    );
}