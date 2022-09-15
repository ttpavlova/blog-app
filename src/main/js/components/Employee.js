import React from "react";
import { useState } from "react";

function Employee(props) {

    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState(props.name);
    const [newRole, setNewRole] = useState(props.role);

    function handleChangeName(e) {
        setNewName(e.target.value);
    }

    function handleChangeRole(e) {
        setNewRole(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.editEmployee(props.id, newName, newRole);
        // setNewName("");
        // setNewRole("");
        setEditing(false);
    }

    const editingTemplate = (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                id="new-name"
                value={newName}
                placeholder={props.name}
                onChange={handleChangeName}
            >
            </input>
            <input
                type="text"
                id="new-role"
                value={newRole}
                placeholder={props.role}
                onChange={handleChangeRole}
            >
            </input>
            <div className="btn-group">
                <button type="button" className="btn" onClick={() => setEditing(false)}>Cancel</button>
                <button type="submit" className="btn">Save</button>
            </div>
        </form>
    );

    const viewTemplate = (
        <div>
            <p>{props.id}</p>
            <p>{props.name}</p>
            <p>{props.role}</p>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn"
                    onClick={() => setEditing(true)}
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="btn"
                    onClick={() => props.deleteEmployee(props.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );

    return (
        <li className="employee">{isEditing ? editingTemplate : viewTemplate}</li>
    );
}

export default Employee;