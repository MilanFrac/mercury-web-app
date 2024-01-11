import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavGroup = ({ items }) => {
  return (
    <NavDropdown title="Wybierz" id="nav-dropdown">
      {Object.keys(items).map((key) => {
        const item = items[key];
        return (
          <NavDropdown.Item key={key}>
            <Link to={item.path}>{item.name}</Link>
          </NavDropdown.Item>
        );
      })}
    </NavDropdown>
  );
};

export default NavGroup;