// NPM
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControlLabel } from 'material-ui/Form';
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading';

// App
import axios from 'appHelpers/axios';
import {
  update as updateProfile,
  onChange as onChangeProfile
} from 'appRedux/modules/profile';
import {
  get as getUser
} from 'appRedux/modules/user';
import {
  get as getLocations
} from 'appRedux/modules/location';
import { hideNotification } from 'appRedux/modules/notification';
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import { BASE_URL_PATH } from 'appHelpers/constants';
import css from './styles.css';


const CURRENT_PAGE = 'profile';


const Profile = (props) => {
  const generateHandler = (fieldName) => {
    return (event) => {
      props.handleProfileInputChange(fieldName, event.target.value)
    }
  }

  if (!props.profile.id) {
    return <div>User is not found [work in progress, please start again at register, to create new user]</div>
  }

  return(
    <div className={ css.registrationForm }>
      <form onSubmit={ props.handleSubmit }>
        <h1 className={css.registrationFormHeader}>Tell us about you</h1>

        <FormField fullWidth className={ css.formControl }>
          <InputLabel htmlFor="speaker-location">City</InputLabel>
          <Select
              value={props.profile.location}
              onChange={ generateHandler('location') }
              input={<Input name="location" id="location" />}
            >
            {
              props.locations && props.locations.map((location, index) => (
                <MenuItem key={index} value={location.id}>{location.city}</MenuItem>
              ))
            }
          </Select>
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <TextField label="First Name" onChange={ generateHandler('first_name') } />
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <TextField label="Last Name" onChange={ generateHandler('last_name') } />
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <FormLabel component="legend">Do you identify as a woman?</FormLabel>
          <RadioGroup
            aria-label="woman"
            name="woman"
            value={props.profile.woman === null ? 'true' : props.profile.woman.toString() }
            onChange={generateHandler('woman')}
          >
            <FormControlLabel value='true' control={<Radio color="primary" />} label="Yes" />
            <FormControlLabel value='false' control={<Radio color="primary" />} label="No" />
          </RadioGroup>
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <FormLabel component="legend">Do you identify as a person of color?</FormLabel>
          <RadioGroup
            aria-label="poc"
            name="poc"
            value={props.profile.poc === null ? 'true' : props.profile.poc.toString()}
            onChange={generateHandler('poc')}
          >
            <FormControlLabel value='true' control={<Radio color="primary" />} label="Yes" />
            <FormControlLabel value='false' control={<Radio color="primary" />} label="No" />
          </RadioGroup>
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <FormLabel component="legend">What pronouns do you use?</FormLabel>
          <RadioGroup
            aria-label="pronouns"
            name="pronouns"
            value={props.profile.pronouns || 'they'}
            onChange={generateHandler('pronouns')}
          >
            <FormControlLabel value='they' control={<Radio color="primary" />} label="They, them, their" />
            <FormControlLabel value='she' control={<Radio color="primary" />} label="She, her, her" />
            <FormControlLabel value='he' control={<Radio color="primary" />} label="He, him, his" />
          </RadioGroup>
        </FormField>

        <FormField className={ css.formControl }>
          <FormLabel component="legend">Upload your photo</FormLabel>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={ props.handleImageChange }
            />
        </FormField>

        <div>
          <FormField className={ css.formControl }>
            <StyledButton label="Submit" type="submit" color="primary">Save and continue</StyledButton>
          </FormField>
        </div>
      </form>
    </div>
  )
}


class ProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleImageChange = (e) => this._handleImageChange(e);
    props.getLocations();
    props.onChangeProfile({ current_page: CURRENT_PAGE });
  }

  componentWillMount() {
    if (!this.props.profile.id) {
      this.props.getUser();
    }
  }

  _handleImageChange(event) {
    const file = event.currentTarget.files[0];
    const data = new FormData();
    data.append('file', file)
    data.append('profile', this.props.profile.id)
    const url = `${BASE_URL_PATH}/api/v1/images/`;

    axios({
      url,
      data,
      method: 'post',
      responseType: 'json',
    }).then(res => {
      this.props.onChangeProfile({ image: res.data.file })
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    const props = this.props;

    if (!props.profile.isInitialized || props.profile.isLoading) {
      return <ReactLoading type='spinningBubbles' color='#000000' />
    }
    return(
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={!!props.notification}
          onClose={props.hideNotification}
          autoHideDuration={4000}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{props.notification}</span>}
        />
        <Profile
          handleSubmit={event => {
            event.preventDefault();
            props.updateProfile();
          }}
          handleProfileInputChange={(field, value) => {
            props.onChangeProfile({ [field]: value })
          }}
          handleImageChange={this.handleImageChange}
          {...props}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    profile: state.profile,
    notification: state.notification.message,
    locations: state.location.locations
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    getUser: () => {
      dispatch(getUser());
    },
    getLocations: () => {
      dispatch(getLocations());
    },
    onChangeProfile: (attrs) => {
      dispatch(onChangeProfile(attrs))
    },
    showNotification: (message) => {
      dispatch(showNotification(message))
    },
    hideNotification: () => {
      dispatch(hideNotification())
    },
    updateProfile: () => {
      dispatch(updateProfile());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
