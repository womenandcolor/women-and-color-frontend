// NPM
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// APP
import css from '../styles.css';
import { updateSearchParams, updateSelection } from 'appRedux/modules/speaker';
import { CITIES, IDENTITIES } from 'appHelpers/constants';

const Sidebar = (props) => {
  const allCitiesItem = {
    city: 'All cities',
    id: null
  }
  if (props.locations[0] && props.locations[0].city !== allCitiesItem.city) {
    props.locations.unshift(allCitiesItem)
  }

  return(
    <div className="col-lg-3">
      <h2 className={css.sidebarTitles}>CITY</h2>
        <ul className="list-unstyled">
          {
            props.locations.map((location, index) => {
              const selector = location.id === props.selectedLocation ? 'sidebarObjectSelected' : 'sidebarObject';
              const handleClick = () => {
                props.updateSearchParams({ location: location.id });
                props.updateSelection({ selectedLocation: location.id });
              }

              return (
                <li key={index} className={css[selector]} onClick={handleClick}>{location.city}</li>
              )
            })
          }
        </ul>

      <div className={css.sidebarTitles}>SELF-IDENTITY</div>
        <ul className="list-unstyled">
          {
            IDENTITIES.map((identity, index) => {
              const selector = identity.label === props.selectedIdentity ? 'sidebarObjectSelected' : 'sidebarObject';
              const handleClick = () => {
                props.updateSearchParams(identity.value);
                props.updateSelection({ selectedIdentity: identity.label });
              }

              return (
                <li key={index} className={css[selector]} onClick={handleClick}>{identity.label}</li>
              )
            })
          }
        </ul>
    </div>
  )
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