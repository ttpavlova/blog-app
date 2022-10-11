import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

function AddPostForm(props) {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const newPost = { title, text };
        
        await fetch('/api/posts', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost),
        });

        props.fetchData();

        setTitle("");
        setText("");
    }

    function handleChangeTitle(e) {
        setTitle(e.target.value);
    }

    function handleChangeText(e) {
        setText(e.target.value);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={handleChangeTitle}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Text</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Enter text"
                    style={{ height: '150px', resize: 'none' }}
                    value={text}
                    onChange={handleChangeText}
                    required
                />
            </Form.Group>

            <Button
                type="submit"
                variant="primary"
                disabled={props.areInputsEmpty(title, text) ? true : ""}
            >
                Add
            </Button>
        </Form>
    );
}

export default AddPostForm;