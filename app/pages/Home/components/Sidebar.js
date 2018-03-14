// NPM
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import { map } from 'lodash';

// APP
import css from '../styles.css';
import { updateSearchParams, updateSelection } from 'appRedux/modules/speaker';
import { IDENTITIES, DEFAULT_SPEAKER_LIMIT } from 'appHelpers/constants';

const selectedStyle = {
  backgroundColor: 'var(--color-secondary)'
}


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { expand: {} };
  }

  createLocationDict = (locations, dict) => {
    locations.map(location => {
      if (!dict[location.country]) {
        dict[location.country] = [];
      }
      dict[location.country].push(location)
    })

    return dict
  }

  toggleCountry = (country) => {
    this.setState({
      expand: {
        [country]: !this.state.expand[country]
      }
    })
  }

  handleSelectCity = (location) => {
    this.props.updateSearchParams({
      location: location,
      offset: 0,
      limit: DEFAULT_SPEAKER_LIMIT,
      append: false
    });
    this.props.updateSelection({ selectedLocation: location.id });
  }

  handleSelectIdentity = (identity) => {
    this.props.updateSearchParams({
      ...identity.value,
      offset: 0,
      limit: DEFAULT_SPEAKER_LIMIT,
      append: false
    });
    this.props.updateSelection({ selectedIdentity: identity.label });
  }

  render() {
    const locations = this.createLocationDict(this.props.locations, {});

    return(
      <div>
        <h2 className={css.sidebarTitles}>CITY</h2>
        <List>
          <ListItem onClick={() => this.handleSelectCity(null)} button style={!this.props.selectedLocation ? selectedStyle : {}}>
            <ListItemText primary='All cities' />
          </ListItem>
          {
            map(locations, (cities, country) => {
              return (
                <div key={country}>
                  <ListItem onClick={() => this.toggleCountry(country)} button>
                    <ListItemText primary={country} />
                    {this.state.expand[country] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={this.state.expand[country]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {
                      cities.map((location, index) => {
                        const selected = location.id === this.props.selectedLocation;
                        const handleClick = () => this.handleSelectCity(location);

                        return (
                          <ListItem key={index} button style={selected ? selectedStyle : {}} onClick={handleClick}>
                            <ListItemText inset primary={location.city} />
                          </ListItem>
                        )
                      })
                    }
                    </List>
                  </Collapse>
                </div>
              )
            })
          }
        </List>

        <div className={css.sidebarTitles}>SELF-IDENTITY</div>
        <List>
          {
            IDENTITIES.map((identity, index) => {
              const selected = identity.label === this.props.selectedIdentity;
              const handleClick = () => this.handleSelectIdentity(identity)

              return (
                <ListItem key={index} style={selected ? selectedStyle : {}} onClick={handleClick} button>
                  <ListItemText primary={identity.label} />
                </ListItem>
              )
            })
          }
        </List>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    selectedLocation: state.speaker.selectedLocation,
    selectedIdentity: state.speaker.selectedIdentity
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSearchParams: (params) => {
      dispatch(updateSearchParams(params))
    },
    updateSelection: (selected) => {
      dispatch(updateSelection(selected))
    },
    fetchSpeakers: (params) => {
      dispatch(fetchSpeakers(params))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)