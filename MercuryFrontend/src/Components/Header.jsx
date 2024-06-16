import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import AppointmentForm from '../routes/AppointmentForm';
import Settings from '../routes/settings';
import i18n from '../data/i18n';

function Header() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCreateModalShow = () => setShowCreateModal(true);
  const handleCreateModalClose = () => setShowCreateModal(false);

  const handleSettingsModalShow = () => setShowSettingsModal(true);
  const handleSettingsModalClose = () => setShowSettingsModal(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddEventOutside = (newEvent) => {
    console.log('Event added', newEvent);
    handleCreateModalClose();
  };

  return (
    <>
      <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" href="#">
            {i18n.t('yourBrand')}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link
                as={NavLink}
                to="/dashboard"
                style={{ marginRight: '10px', marginLeft: '10px' }}>
                {i18n.t('dashboard')}
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/warehouse"
                style={{ marginRight: '10px', marginLeft: '10px' }}>
                {i18n.t('Warehouse')}
              </Nav.Link>
              <Button
                eventkey="Form"
                title="Create"
                onClick={handleCreateModalShow}
                style={{ backgroundColor: '#333333', color: '#ffffff' }}> 
                {i18n.t('create')}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <div className="avatar-search-container">
          <div className="avatar-dropdown">
            <Avatar variant="light" onClick={handleToggleSidebar}
              style={{marginRight:'10px', backgroundColor: '#333333', color: '#ffffff' }}>                  
              RX
            </Avatar>
          </div>
        </div>
      </Navbar>
      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={handleToggleSidebar}
        classes={{ paper: 'drawer-paper' }}
        BackdropProps={{ style: { backgroundColor: 'transparent' } }}>
        <List>
          <ListItem
            button
            onClick={handleSettingsModalShow}
            style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText primary={i18n.t('settings')} />
            <SettingsIcon />
          </ListItem>
          <ListItem button>
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText primary={i18n.t('logout')} />
            </Link>
            <LogoutIcon />
          </ListItem>
        </List>
      </Drawer>
      <main style={{ marginRight: sidebarOpen ? '240px' : '0' }}>
        <Settings showModal={showSettingsModal} handleModalClose={handleSettingsModalClose} />
        <Modal
          show={showCreateModal}
          onHide={handleCreateModalClose}
          dialogClassName={{ maxWidth: '70vw' }}>
          <Modal.Header closeButton>
            <Modal.Title>{i18n.t('create')} Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AppointmentForm
              onAddEvent={handleAddEventOutside}
              onCloseModal={handleCreateModalClose}
              handleAddEventOutside={handleAddEventOutside}
            />
          </Modal.Body>
        </Modal>
      </main>
      <style>
        {`
          .avatar-search-container {
            display: flex;
            align-items: center;
            margin-left: 10px;
          }
          .avatar-dropdown {
            margin-left: 5px; /* Adjust this value to move the RX button to the left */
          }
          .drawer-paper {
            background-color: #fff !important;
            box-shadow: none !important;
          }
        `}
      </style>
    </>
  );
}

export default Header;
