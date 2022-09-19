import React from "react";
import { useState } from "react";

function AddPostForm(props) {
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const username = props.username;

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

    function handleChangeRole(e) {
        setText(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-post-name-input">
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
                onChange={handleChangeRole}
            />
            <button type="submit">
                Add
            </button>
        </form>
    );
}

export default AddPostForm;