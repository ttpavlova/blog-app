import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

function AddPostForm(props) {
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const currentUsername = props.currentUsername;

    async function handleSubmit(e) {
        e.preventDefault();
        // alert("Hi");
        const newPost = { name, text };
        console.log(newPost);
        
        await fetch('/api/posts', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost),
        });

        props.fetchData();
        // setName("");
        // setRole("");
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
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Text</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Enter text"
                    style={{ height: '100px' }}
                    value={text}
                    onChange={handleChangeText}
                />
            </Form.Group>
            {/* <label htmlFor="new-post-name-input">
                Add a new post
            </label>
            <input
                type="text"
                id="new-post-name-input"
                name="text"
                placeholder="name"
                autoComplete="off"
                value={name}
                onChange={handleChangeName}
            />
            <input
                type="text"
                id="new-post-text-input"
                name="text"
                placeholder="text"
                value={text}
                autoComplete="off"
                onChange={handleChangeText}
            /> */}
            {/* <button type="submit">
                Add
            </button> */}
            <Button type="submit" variant="primary">Add</Button>
        </Form>
    );
}

export default AddPostForm;