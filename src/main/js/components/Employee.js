import React from "react";

function Employee(props) {

    return (
        <div>
            <p>{props.id}</p>
            <p>{props.name}</p>
            <p>{props.role}</p>
            <div className="btn-group">
                <button type="button" className="btn">Edit</button>
                <button type="button" className="btn">Delete</button>
            </div>
        </div>
    );
}

export default Employee;