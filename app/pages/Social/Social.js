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
import { push } from 'react-router-redux'

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


const CURRENT_PAGE = 'social';

const Social = (props) => {

  const generateHandler = (fieldName) => {
    return (event) => { props.handleProfileInputChange(fieldName, event.currentTarget.value) }
  }

  return(
    <div className={ css.registrationForm }>
      <form onSubmit={ props.handleSubmit }>
        <h1>Be a little social</h1>

        <FormField fullWidth className={ css.formControl }>
          <TextField label="Twitter (optional)" onChange={ generateHandler('twitter') } />
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <TextField label="LinkedIn (optional)" onChange={ generateHandler('linkedin') } />
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <TextField label="Website (optional)" onChange={ generateHandler('website') } />
        </FormField>

        <div>
          <FormField className={ css.formControl }>
            <StyledButton label="Submit" type="submit">Save and submit</StyledButton>
          </FormField>
        </div>
      </form>

    </div>
  )
}

class SocialContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    props.getUser();
    props.onChangeProfile({ current_page: null });
  }

  render() {
    const props = this.props;

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
          message={<span id="message-id">{this.props.notification}</span>}
        />
        <Social
          handleSubmit={event => {
            event.preventDefault();
            props.updateProfile();
          }}
          handleProfileInputChange={(field, value) => {
            props.onChangeProfile({ [field]: value })
          }}
          {...this.props}
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
      dispatch(updateProfile()).then(x => {
        dispatch(push('/'))
      });
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialContainer);
