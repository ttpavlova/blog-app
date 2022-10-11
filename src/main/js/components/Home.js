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
        title={post.title}
        text={post.text}
        date={post.date}
        username={post.user.username}
        currentUsername={currentUsername}
        editPost={editPost}
        deletePost={deletePost}
        areInputsEmpty={areInputsEmpty}
        key={post.id}
      />
    ));

    async function editPost(id, title, text) {
      const updatedPost = { title, text };

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
          return {...post, title: title, text: text};
        }
        return post;
      });
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

    function areInputsEmpty(title, text) {
      if ((title === "") || (text === "")) {
          return true;
      }
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
          <Col md={3} lg={4}></Col>
          <Col md={6} lg={4}>
            <AddPostForm
              fetchData={fetchData}
              currentUsername={currentUsername}
              areInputsEmpty={areInputsEmpty}
            />
            <br/>
            <div>{listPosts}</div>
          </Col>
          <Col md={1} lg={2}></Col>
          <Col xs={{ order: "first" }} md={{ span: 2, order: "last" }} lg={{ span: 2 }}>
            <Avatar currentUsername={currentUsername} />
          </Col>
        </Row>
      </Container>
    );
}

export default Home;