import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import TextField from '@mui/material/TextField';
import Modal from 'react-bootstrap/Modal';
import Form from '../routes/Form';
import NavGroup from '../routes/groups/NavGroup';
import navItems from '../routes/locations/navItems';

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

  const dropdownItems = navItems ? Object.values(navItems) : [];

  return (
    <>
      <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" href="#">
            Your Brand
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>

              <NavGroup title="Locations" items={navItems}>
              </NavGroup>

              <Nav.Link as={NavLink} to="/dashboard" style={{ marginRight: '10px', marginLeft: '10px' }}>
                Dashboard
              </Nav.Link>

              <Button eventkey="Form" title="Create" onClick={handleModalShow}>
                Create
              </Button>
            </Nav>

            <TextField id="outlined-search" label="Search" type="search" size="small" />

            <Button eventkey="Login" title="Logout" as={Link} to="/login">
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleModalClose} dialogClassName={{ maxWidth: '70vw' }}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onAddEvent={handleAddEventOutside} onCloseModal={handleModalClose} onConfirm={handleConfirm} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
