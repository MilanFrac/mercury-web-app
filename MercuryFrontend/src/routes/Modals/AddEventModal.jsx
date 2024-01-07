import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddEventModal = ({ closeModal, onSave }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const handleSave = () => {
    onSave({ title, start, end });
    closeModal();
  };

  return (
    <Modal show={true} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Dodaj nowe wydarzenie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Tytuł</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wprowadź tytuł"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formStart">
            <Form.Label>Początek</Form.Label>
            <Form.Control
              type="datetime-local"
              value={start.toISOString().slice(0, 16)}
              onChange={(e) => setStart(new Date(e.target.value))}
            />
          </Form.Group>
          <Form.Group controlId="formEnd">
            <Form.Label>Koniec</Form.Label>
            <Form.Control
              type="datetime-local"
              value={end.toISOString().slice(0, 16)}
              onChange={(e) => setEnd(new Date(e.target.value))}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Anuluj
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Zapisz
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEventModal;