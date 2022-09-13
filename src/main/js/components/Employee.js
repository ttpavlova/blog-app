import React from "react";

function Employee(props) {

    return (
        <div>
            <p>{props.id}</p>
            <p>{props.name}</p>
            <p>{props.role}</p>
        </div>
    );
}

export default Employee;