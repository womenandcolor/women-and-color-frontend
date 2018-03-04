// NPM
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import List, { ListItem, ListItemText } from 'material-ui/List';

// APP
import { updateSearchParams, updateSelection } from 'redux/modules/speaker';
import { CITIES, IDENTITIES } from 'config/constants';

const Sidebar = props => {
  const allCitiesItem = {
    city: 'All cities',
    id: null,
  };
  if (props.locations[0] && props.locations[0].city !== allCitiesItem.city) {
    props.locations.unshift(allCitiesItem);
  }

  return (
    <div>
      <h2>CITY</h2>
      <List>
        {props.locations.map((location, index) => {
          const selector =
            location.id === props.selectedLocation
              ? 'sidebarObjectSelected'
              : 'sidebarObject';
          const handleClick = () => {
            props.updateSearchParams({ location: location.id });
            props.updateSelection({ selectedLocation: location.id });
          };

          return (
            <ListItem key={index} className={selector} onClick={handleClick}>
              <ListItemText primary={location.city} />
            </ListItem>
          );
        })}
      </List>

      <div>SELF-IDENTITY</div>
      <List>
        {IDENTITIES.map((identity, index) => {
          const selector =
            identity.label === props.selectedIdentity
              ? 'sidebarObjectSelected'
              : 'sidebarObject';
          const handleClick = () => {
            props.updateSearchParams(identity.value);
            props.updateSelection({ selectedIdentity: identity.label });
          };

          return (
            <ListItem key={index} className={selector} onClick={handleClick}>
              <ListItemText primary={identity.label} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    selectedLocation: state.speaker.selectedLocation,
    selectedIdentity: state.speaker.selectedIdentity,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSearchParams: params => {
      dispatch(updateSearchParams(params));
    },
    updateSelection: selected => {
      dispatch(updateSelection(selected));
    },
    fetchSpeakers: params => {
      dispatch(fetchSpeakers(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
