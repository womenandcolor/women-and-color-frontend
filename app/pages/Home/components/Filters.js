// NPM
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FilterList from '@material-ui/icons/FilterList';
import Hidden from 'material-ui/Hidden';
import { map } from 'lodash';

// APP
import css from '../styles.css';
import { updateSearchParams, updateSelection } from 'appRedux/modules/speaker';
import { IDENTITIES, DEFAULT_SPEAKER_LIMIT } from 'appHelpers/constants';

const selectedStyle = {
  backgroundColor: 'var(--color-secondary)',
};

const styles = {
  primary: {
    fontWeight: 'var(--font-weight-semibold)',
  },
};

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = { expand: {}, showFilters: false };
  }

  createLocationDict = (locations, dict) => {
    locations.map(location => {
      const country = location.country.toLowerCase();
      if (!dict[country]) {
        dict[country] = [];
      }
      dict[country].push(location);
    });

    return dict;
  };

  toggleCountry = country => {
    this.setState({
      expand: {
        [country]: !this.state.expand[country],
      },
    });
  };

  toggleFilters = () => {
    this.setState({ showFilters: !this.state.showFilters })
  }

  handleSelectCity = location => {
    const locationVal = location ? location.id : location
    this.props.updateSearchParams({
      location: locationVal,
      offset: 0,
      limit: DEFAULT_SPEAKER_LIMIT,
      append: false,
    });
    this.props.updateSelection({ selectedLocation: locationVal });
  };

  handleSelectIdentity = identity => {
    this.props.updateSearchParams({
      ...identity.value,
      offset: 0,
      limit: DEFAULT_SPEAKER_LIMIT,
      append: false,
    });
    this.props.updateSelection({ selectedIdentity: identity.label });
  };

  render() {
    const locations = this.createLocationDict(this.props.locations, {});

    return (
      <div className={css.sidebarContainer}>
        <h2 className={css.sidebarTitles}>CITY</h2>
        <List>
          <ListItem
            onClick={() => this.handleSelectCity(null)}
            button
            style={!this.props.selectedLocation ? selectedStyle : {}}
          >
            <ListItemText
              primary="all cities"
              classes={{ primary: this.props.classes.primary }}
            />
          </ListItem>
          {map(locations, (cities, country) => {
            return (
              <div key={country}>
                <ListItem onClick={() => this.toggleCountry(country)} button>
                  <ListItemText
                    primary={country}
                    classes={{ primary: this.props.classes.primary }}
                  />
                  {this.state.expand[country] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                  in={this.state.expand[country]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {cities.map((location, index) => {
                      const selected =
                        location.id === this.props.selectedLocation;
                      const handleClick = () => this.handleSelectCity(location);

                      return (
                        <ListItem
                          key={index}
                          button
                          style={selected ? selectedStyle : {}}
                          onClick={handleClick}
                        >
                          <ListItemText primary={location.city.toLowerCase()} />
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </div>
            );
          })}
        </List>

        <div className={css.sidebarTitles}>FILTER</div>
        <List>
          {IDENTITIES.map((identity, index) => {
            const selected = identity.label === this.props.selectedIdentity;
            const handleClick = () => this.handleSelectIdentity(identity);

            return (
              <ListItem
                key={index}
                style={selected ? selectedStyle : {}}
                onClick={handleClick}
                button
              >
                <ListItemText primary={identity.label.toLowerCase()} />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Filters)
);
