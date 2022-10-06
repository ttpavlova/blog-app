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
        <Form onSubmit={handleSubmit}>
            <p className="post__author mb-3">{props.username}</p>

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    id="new-name"
                    value={newName}
                    placeholder={props.name}
                    onChange={handleChangeName}
                />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Text</Form.Label>
                <Form.Control
                    as="textarea"
                    id="new-text"
                    value={newText}
                    placeholder={props.text}
                    onChange={handleChangeRole}
                    style={{ height: '150px', resize: 'none' }}
                />
            </Form.Group>

            <div className="post__footer d-flex justify-content-end">
                <div className="post__buttons mt-3">
                    <Button
                        type="button"
                        variant="outline-primary"
                        size="sm"
                        className="btn"
                        onClick={() => setEditing(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        className="btn ms-2"
                    >
                        Save
                    </Button>
                </div>
            </div>
        </Form>
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