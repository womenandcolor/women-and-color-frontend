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
import {
  update as updateProfile,
  onChange as onChangeProfile
} from 'appRedux/modules/profile';
import {
  get as getUser
} from 'appRedux/modules/user';
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import css from './styles.css'


const CURRENT_PAGE = 'profile';


const Profile = (props) => {
  const generateHandler = (fieldName) => {
    return (event) => {
      props.handleProfileInputChange(fieldName, event.currentTarget.value)
    }
  }

  if (!props.profile.id) {
    return <div>User is not found [work in progress, please start again at register, to create new user]</div>
  }

  return(
    <div className={ css.registrationForm }>
      <form onSubmit={ props.handleSubmit }>
        <h1>Tell us about you</h1>

        <FormField fullWidth className={ css.formControl }>
          <FormLabel component="legend">Do you identify as a woman?</FormLabel>
          <RadioGroup
            aria-label="woman"
            name="woman"
            value={props.profile.woman === undefined ? 'true' : props.profile.woman.toString() }
            onChange={generateHandler('woman')}
          >
            <FormControlLabel value='true' control={<Radio />} label="Yes" />
            <FormControlLabel value='false' control={<Radio />} label="No" />
          </RadioGroup>
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <FormLabel component="legend">Do you identify as a person of color?</FormLabel>
          <RadioGroup
            aria-label="poc"
            name="poc"
            value={props.profile.poc === undefined ? 'true' : props.profile.poc.toString()}
            onChange={generateHandler('poc')}
          >
            <FormControlLabel value='true' control={<Radio />} label="Yes" />
            <FormControlLabel value='false' control={<Radio />} label="No" />
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
            <FormControlLabel value='they' control={<Radio />} label="They, them, their" />
            <FormControlLabel value='she' control={<Radio />} label="She, her, her" />
            <FormControlLabel value='he' control={<Radio />} label="He, him, his" />
          </RadioGroup>
        </FormField>

        <FormField className={ css.formControl }>
          <FormLabel component="legend">Upload your photo</FormLabel>
          <StyledButton
            component='label'
            label='Browse files'>
            <span className={ css.buttonLabel }>Browse files</span>
            <input type="file" id="photo" name="photo" style={{ display: 'none' }}/>
          </StyledButton>
        </FormField>

        <div>
          <FormField className={ css.formControl }>
            <StyledButton label="Submit" type="submit">Save and continue</StyledButton>
          </FormField>
          <FormField className={ css.formControl }>
            <p onClick={ props.handleSubmit } style={{ cursor: 'pointer' }}>Save and exit</p>
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
    props.getUser();
    props.onChangeProfile({ page: CURRENT_PAGE });
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
          onClose={props.closeNotification}
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
    notification: state.notification.message
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    getUser: () => {
      dispatch(getUser());
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
