import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModal(props) {

    const handleClose = () => {
        props.setShowModal(false);
        props.setPostIdToDelete(null);
    }
    
    const handleDelete = () => {
        props.deletePost(props.postIdToDelete);
        props.setShowModal(false);
        props.setPostIdToDelete(null);
    }

    return (
        <Modal show={props.showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete the post?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmModal;