import React from "react";
import { useState, useEffect } from "react";
import AddPostForm from "./AddPostForm";
import Post from "./Post";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Avatar from "./Avatar";
import ConfirmModal from "./ConfirmModal";

function Home(props) {
    const [posts, setPosts] = useState([]);
    const [currentUsername, setCurrentUsername] = useState("");
    const [currentRoles, setCurrentRoles] = useState([]);

    // delete confirmation modal
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);

    const reverted = [...posts].reverse();
    const listPosts = reverted.map((post) => (
      <Post
        id={post.id}
        title={post.title}
        text={post.text}
        date={post.date}
        username={post.user.username}
        currentUsername={currentUsername}
        currentRoles={currentRoles}
        editPost={editPost}
        deletePost={deletePost}
        areInputsEmpty={areInputsEmpty}
        setShowModal={setShowModal}
        setPostIdToDelete={setPostIdToDelete}
        key={post.id}
      />
    ));

    async function getAllPosts() {
      const res = await fetch(
          `/api/posts`
      );

      const data = await res.json();
      const posts = data["_embedded"]["postList"];
      setPosts(posts);
    }

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

    async function getCurrentUserData() {
      const res = await fetch("/api/user");
      const currentUser = await res.json();

      setCurrentUsername(currentUser.username);
      setCurrentRoles(currentUser.roles);
    }

    function areInputsEmpty(title, text) {
      if ((title === "") || (text === "")) {
          return true;
      }
    }

    useEffect(() => {
        getCurrentUserData();
        getAllPosts();
    }, []);

    if (!posts) {
        return <div>Something is wrong with the data...</div>;
    }

    return (
      <Container>
        <Row>
          <Col md={3} lg={4}></Col>
          <Col md={6} lg={4}>
            <ConfirmModal
              showModal={showModal}
              setShowModal={setShowModal}
              deletePost={deletePost}
              postIdToDelete={postIdToDelete}
              setPostIdToDelete={setPostIdToDelete}
            />
            <AddPostForm
              getAllPosts={getAllPosts}
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