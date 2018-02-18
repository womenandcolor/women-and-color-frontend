// NPM
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// APP
import css from '../styles.css';
import { updateSearchParams, updateSelection } from 'appRedux/modules/speaker';
import { CITIES, IDENTITIES } from 'appHelpers/constants';

const Sidebar = (props) => {
  return(
    <div className="col-lg-3">
      <h2 className={css.sidebarTitles}>CITY</h2>
        <ul className="list-unstyled">
          {
            CITIES.map((city, index) => {
              const selector = city.label === props.selectedCity ? 'sidebarObjectSelected' : 'sidebarObject';
              const handleClick = () => {
                props.updateSearchParams(city.value);
                props.updateSelection({ selectedCity: city.label });
              }

              return (
                <li key={index} className={css[selector]} onClick={handleClick}>{city.label}</li>
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
    selectedCity: state.speaker.selectedCity,
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