import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import TextField from '@mui/material/TextField';
import Modal from 'react-bootstrap/Modal';
import NavGroup from '../routes/groups/NavGroup';
import navItems from '../data/locations/navItems';
import i18n from '../data/i18n';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Settings from '../routes/Settings';
import AppointmentForm from '../routes/AppointmentForm';

export default function Header() {
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
              <NavGroup title={i18n.t('locations')} items={navItems}></NavGroup>
              <Nav.Link
                as={NavLink}
                to="/dashboard"
                style={{ marginRight: '10px', marginLeft: '10px' }}>
                {i18n.t('dashboard')}
              </Nav.Link>
              <Button eventkey="Form" title="Create" onClick={handleCreateModalShow}>
                {i18n.t('create')}
              </Button>
            </Nav>
            <TextField id="outlined-search" label={i18n.t('search')} type="search" size="small" />
          </Navbar.Collapse>
        </Container>
        <div className="avatar-search-container">
          <div className="avatar-dropdown">
            <Avatar variant="light" onClick={handleToggleSidebar}>
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
          size='lg'>
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
            margin-left: 10px;
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
