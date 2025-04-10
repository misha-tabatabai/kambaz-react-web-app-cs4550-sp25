import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function Users() {
    const [users, setUsers] = useState<any[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const { uid } = useParams();

    const createUser = async () => {
        const user = await client.createUser({
            firstName: "New",
            lastName: `User${users.length + 1}`,
            username: `newuser${Date.now()}`,
            password: "password123",
            email: `email${users.length + 1}@neu.edu`,
            section: "S101",
            role: "STUDENT",
        });
        setUsers([...users, user]);
    };

    const fetchUsers = async () => {
        try {
            const allUsers = await client.findAllUsers();
            console.log("Fetched all users:", allUsers);
            setUsers(allUsers);
            setFilteredUsers(allUsers);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const applyFilters = () => {
        console.log("Applying filters - Role:", role, "Name:", name);
        let result = [...users];

        if (role) {
            result = result.filter(user => user.role === role);
        }

        if (name) {
            const searchTerm = name.toLowerCase();
            result = result.filter(user =>
                (user.firstName && user.firstName.toLowerCase().includes(searchTerm)) ||
                (user.lastName && user.lastName.toLowerCase().includes(searchTerm)) ||
                (user.loginId && user.loginId.toLowerCase().includes(searchTerm))
            );
        }

        console.log("Filtered users:", result);
        setFilteredUsers(result);
    };

    const handleRoleChange = (newRole: string) => {
        setRole(newRole);
        applyFilters();
    };

    const handleNameChange = (newName: string) => {
        setName(newName);
        applyFilters();
    };

    useEffect(() => {
        fetchUsers();
    }, [uid]);

    useEffect(() => {
        applyFilters();
    }, [users, role, name]);

    return (
        <div>
            <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
                <FaPlus className="me-2" />
                Users
            </button>
            <h3>Users</h3>
            <div className="d-flex gap-2 mb-3">
                <FormControl
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Search by name or login ID"
                    className="w-25"
                />
                <select
                    value={role}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    className="form-select w-25"
                >
                    <option value="">All Roles</option>
                    <option value="STUDENT">Students</option>
                    <option value="TA">Assistants</option>
                    <option value="FACULTY">Faculty</option>
                    <option value="ADMIN">Administrators</option>
                </select>
            </div>
            <PeopleTable users={filteredUsers} />
        </div>
    );
}
