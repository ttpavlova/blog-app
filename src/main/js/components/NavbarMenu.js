import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";

function NavbarMenu() {
    return (
        <Navbar bg="light" variant="light" sticky="top">
            <Container>
                <Navbar.Brand href="#">Blog App</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#">Home</Nav.Link>
                </Nav>

                <form name="logout" action="/logout" method="post">
                    <Button type="submit" variant="outline-primary">Log out</Button>
                </form>
                </Container>
        </Navbar>
    );
}

export default NavbarMenu;