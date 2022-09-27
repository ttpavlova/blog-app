import React from "react";
import { useState, useEffect } from "react";
import AddPostForm from "./AddPostForm";
import Post from "./Post";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Avatar from "./Avatar";

function Home(props) {
    const [posts, setPosts] = useState([]);
    const [currentUsername, setCurrentUsername] = useState("");

    const listPosts = posts.map((post) => (
      <Post
        id={post.id}
        name={post.name}
        text={post.text}
        date={post.date}
        username={post.user.username}
        currentUsername={currentUsername}
        editPost={editPost}
        deletePost={deletePost}
        key={post.id}
      />
    ));

    async function editPost(id, name, text) {
      const updatedPost = { name, text };
      console.log(updatedPost);

      await fetch('/api/posts/' + id, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedPost),
    });

      const updatedPostList = posts.map((post) => {
        if (id === post.id) {
          return {...post, name: name, text: text};
        }
        return post;
      });
      console.log(updatedPostList);
      setPosts(updatedPostList);
    }

    async function deletePost(id) {
      await fetch('/api/posts/' + id, {
          method: "DELETE",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          }
      });

      const updatedPostList = posts.filter((post) => id !== post.id);
      console.log(updatedPostList);
      console.log(id);
      setPosts(updatedPostList);
  }

    async function fetchData() {
      const res = await fetch(
          `/api/posts`
      );

      const data = await res.json();
      setPosts(data);
  }

    async function getCurrentUsername() {
      const res = await fetch("/api/username");
      const currentUsername = await res.json();
      setCurrentUsername(currentUsername.username);
    }

    useEffect(() => {
        getCurrentUsername();
        fetchData();
    }, []);

    if (!posts) {
        return <div>Something is wrong with the data...</div>;
    }

    return (
        <Container>
          <Row>
            <Col xs={4}></Col>
            <Col xs={4}>
              <AddPostForm fetchData={fetchData} currentUsername={currentUsername} />
              <br/>
              <ol>{listPosts}</ol>
            </Col>
            <Col xs={2}></Col>
            <Col xs={2}>
              <h1>Hi, {currentUsername}.</h1>
              <Avatar />
              <form name="logout" action="/logout" method="post">
                <button type="submit">Log out</button>
              </form>
            </Col>
          </Row>
        </Container>
    );
}

export default Home;