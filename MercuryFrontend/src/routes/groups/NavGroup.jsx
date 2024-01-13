import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function NavGroup({ title, items }) {
  const itemsList = items.map((item, index) => (
    <React.Fragment key={index}>
      {item.isDivided && <NavDropdown.Divider key={`${item.name}-divider`} />}
      <NavDropdown.Item as={NavLink} to={item.path} key={item.name}>
        {item.name}
      </NavDropdown.Item>
    </React.Fragment>
  ));

  return (
    <NavDropdown title={title} id="nav-dropdown">
      {itemsList}
    </NavDropdown>
  );
};
