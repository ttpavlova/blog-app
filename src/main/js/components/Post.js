import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

function Post(props) {

    const [isEditing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(props.title);
    const [newText, setNewText] = useState(props.text);

    function handleChangeTitle(e) {
        setNewTitle(e.target.value);
    }

    function handleChangeRole(e) {
        setNewText(e.target.value);
    }

    function handleCancel(e) {
        setEditing(false);
        setNewTitle(props.title);
        setNewText(props.text);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.editPost(props.id, newTitle, newText);
        setEditing(false);
    }

    function handleDelete(id) {
        props.setShowModal(true);
        props.setPostIdToDelete(id);
    }

    function isAdmin() {
        const found = props.currentRoles.find(role => role.name === "ROLE_ADMIN");

        if (found) {
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

            <Form.Group className="mb-3" controlId="new-title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    value={newTitle}
                    placeholder={props.title}
                    onChange={handleChangeTitle}
                />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="new-text">
                <Form.Label>Text</Form.Label>
                <Form.Control
                    as="textarea"
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
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        className="btn ms-2"
                        disabled={props.areInputsEmpty(newTitle, newText) ? true : ""}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </Form>
    );

    const viewTemplate = (
        <div>
            <p className="post__author mb-3">{props.username}</p>
            <p className="post__title mb-3">{props.title}</p>
            <p className="post__text mb-0">{props.text}</p>
            
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
                        onClick={() => hasAccess() ? handleDelete(props.id) : alert("No access")}
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