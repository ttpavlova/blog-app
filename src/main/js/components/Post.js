import React from "react";
import { useState } from "react";

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
                <button type="button" className="btn" onClick={() => setEditing(false)}>Cancel</button>
                <button type="submit" className="btn">Save</button>
            </div>
        </form>
    );

    const viewTemplate = (
        <div>
            <p>{props.id}</p>
            <p>{props.name}</p>
            <p>{props.text}</p>
            <p>{props.username}</p>
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
                    onClick={() => props.deletePost(props.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );

    return (
        <li className="post">{isEditing ? editingTemplate : viewTemplate}</li>
    );
}

export default Post;