import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

function Post(props) {

    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState(props.name);
    const [newText, setNewText] = useState(props.text);

    function handleChangeName(e) {
        setNewName(e.target.value);
    }

    function handleChangeRole(e) {
        setNewText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.editPost(props.id, newName, newText);
        // setNewName("");
        // setNewText("");
        setEditing(false);
    }

    function isAdmin() {
        if (props.currentUsername === "admin") {
            return true;
        }
    }

    // check if the authorized user has access to edit and delete functions
    function hasAccess() {
        if ((props.currentUsername === props.username) || isAdmin()) {
            return true;
        }

        return false;
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
                id="new-text"
                value={newText}
                placeholder={props.text}
                onChange={handleChangeRole}
            >
            </input>
            <div className="btn-group">
                <Button type="button" variant="outline-primary" className="btn" onClick={() => setEditing(false)}>Cancel</Button>
                <Button type="submit" variant="primary" className="btn">Save</Button>
            </div>
        </form>
    );

    const viewTemplate = (
        <div>
            {/* <p>{props.id}</p> */}
            <p className="post__author mb-3">{props.username}</p>
            <p className="post__name mb-3">{props.name}</p>
            <p className="post__text mb-0">{props.text}</p>
            {/* <p>{props.date}</p> */}
            <div className="post__footer d-flex justify-content-end">
                <div className={"post__buttons" + (hasAccess() ? " mt-3" : " hidden")}>
                    <Button
                        type="button"
                        variant="outline-primary"
                        size="sm"
                        className="btn"
                        onClick={() => hasAccess() ? setEditing(true) : alert("No access")}
                    >
                        Edit
                    </Button>
                    <Button
                        type="button"
                        variant="outline-danger"
                        size="sm"
                        className="btn ms-2"
                        onClick={() => hasAccess() ? props.deletePost(props.id) : alert("No access")}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="post">{isEditing ? editingTemplate : viewTemplate}</div>
    );
}

export default Post;