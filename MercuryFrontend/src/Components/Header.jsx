import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import TextField from '@mui/material/TextField';

function Header() {
  return (
    <Navbar fixed='top' expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" href="#">
          Rolltex
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <NavDropdown title="Punkt" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/fullInfo">
                Informacje zbiorcze
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/cityMeble">
                City Meble
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/matarnia">
                Matarnia
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/pruszczGdanski">
                Pruszcz Gdański
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/tczew">
                Tczew
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to="/dashboard" style={{ marginRight:'10px', marginLeft:'10px'}}>
              Panel Pracownika
          </Nav.Link>

            <Button as={Link} to="/forms" variant="outline-success">
              Utwórz
            </Button>
          </Nav>

          <Form className="d-flex">
            <TextField id="outlined-search" label="Szukaj" type="search" size="small" />
          </Form>

          <Button variant="outline-danger">Wyloguj</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
