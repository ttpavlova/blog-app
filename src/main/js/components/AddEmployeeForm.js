import React from "react";
import { useState } from "react";

function AddEmployeeForm(props) {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        // alert("Hi");
        const newEmployee = { name, role };
        await fetch('/api/employees', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEmployee),
        });
    }

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     props.addEmployee(name, role);
    //     setName("");
    //     setRole("");
    // }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeRole(e) {
        setRole(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-employee-name-input">
                Add a new employee
            </label>
            <input
                type="text"
                id="new-employee-name-input"
                name="text"
                placeholder="name"
                autoComplete="off"
                value={name}
                onChange={handleChangeName}
            />
            <input
                type="text"
                id="new-employee-role-input"
                name="text"
                placeholder="role"
                value={role}
                autoComplete="off"
                onChange={handleChangeRole}
            />
            <button type="submit">
                Add
            </button>
        </form>
    );
}

export default AddEmployeeForm;