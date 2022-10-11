import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

function AddPostForm(props) {
    const [name, setName] = useState("");
    const [text, setText] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const newPost = { name, text };
        
        await fetch('/api/posts', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost),
        });

        props.fetchData();

        setName("");
        setText("");
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeText(e) {
        setText(e.target.value);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={handleChangeName}
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
                disabled={props.areInputsEmpty(name, text) ? true : ""}
            >
                Add
            </Button>
        </Form>
    );
}

export default AddPostForm;