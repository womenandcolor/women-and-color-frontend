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

const SideBar = ({ baseUrl, subroutes }) => (
  <div>
    <h2 className={css.sidebarTitle}>MENU</h2>
    <List component="nav">
      {subroutes.map(subroute => (
        <SideBarLink
          href={`#${baseUrl}/${subroute.path}`}
          text={subroute.text}
          isActive={false} // TODO determine if active
        />
      ))}
    </List>
  </div>
);

export default SideBar;
