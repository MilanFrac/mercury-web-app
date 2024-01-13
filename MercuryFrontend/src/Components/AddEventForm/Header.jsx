import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import TextField from '@mui/material/TextField';
import Modal from 'react-bootstrap/Modal';
import Form from '../../routes/Form';

function Header() {
  const [showModal, setShowModal] = useState(false);

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleAddEventOutside = (newEvent) => {
    console.log('Event added', newEvent);
    handleModalClose();
  };

  const handleConfirm = (newEvent) => {
    console.log('Event confirmed', newEvent);
  };

  return (
    <>
      <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" href="#">
            Rolltex
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <NavDropdown title="Punkt" id="navbarScrollingDropdown">
                <NavDropdown.Item as={NavLink} to="/fullInfo">
                  Informacje zbiorcze
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/cityMeble">
                  City Meble
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/matarnia">
                  Matarnia
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/pruszczGdanski">
                  Pruszcz Gdański
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/tczew">
                  Tczew
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={NavLink} to="/dashboard" style={{ marginRight: '10px', marginLeft: '10px' }}>
                Panel Pracownika
              </Nav.Link>

              <Button eventkey="Form" title="Utwórz" onClick={handleModalShow}>
                Utwórz
              </Button>
            </Nav>

            <TextField id="outlined-search" label="Szukaj" type="search" size="small" />

            <Button eventkey="Login" title="Wyloguj" as={Link} to="/login">
              Wyloguj
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleModalClose} dialogClassName={{ maxWidth: '70vw' }}>
        <Modal.Header closeButton>
          <Modal.Title>Utwórz zdarzenie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onAddEvent={handleAddEventOutside} onCloseModal={handleModalClose} onConfirm={handleConfirm} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
