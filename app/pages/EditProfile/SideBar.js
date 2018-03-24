import React from 'react';
import { Route } from 'react-router-dom';
import List, { ListItem, ListItemText } from 'material-ui/List';
import css from './styles.css';

const SideBarLink = ({ href, text, isActive }) => (
  <ListItem
    button
    component="a"
    href={href}
    className={isActive ? css.sidebarObjectSelected : ''}
  >
    <ListItemText primary={text} />
  </ListItem>
);

const SideBar = ({ baseUrl, subroutes, activeSubroute }) => (
  <div>
    <h2 className={css.sidebarTitle}>MENU</h2>
    <List component="nav">
      {subroutes.map(subroute => (
        <SideBarLink
          key={subroute.id}
          href={`#${baseUrl}/${subroute.path}`}
          text={subroute.text}
          isActive={subroute.id === activeSubroute}
        />
      ))}
    </List>
  </div>
);

export default SideBar;
