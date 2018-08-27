// NPM
import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControlLabel } from 'material-ui/Form';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

// App
import {
  update as updateProfile,
  onChange as onChangeProfile
} from 'appRedux/modules/profile';
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import css from '../styles.css'


const CURRENT_PAGE = 'social';

const Social = (props) => {

  const generateHandler = (fieldName) => {
    return (event) => { props.handleProfileInputChange(fieldName, event.currentTarget.value) }
  }

  return(
    <div className={ css.registrationForm }>
      <form onSubmit={ props.handleSubmit }>
        <h1 className={css.registrationFormHeader}>Be a little social</h1>

        <FormField fullWidth className={ css.formControl }>
          <TextField
            label="Twitter handle (optional)"
            onChange={ generateHandler('twitter') }
            placeholder="Ex. @womenandcolor"
          />
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <TextField
            label="LinkedIn page (optional)"
            onChange={ generateHandler('linkedin') }
            placeholder="Ex. https://www.linkedin.com/in/yournamehere/"
          />
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <TextField
            label="Website (optional)"
            onChange={ generateHandler('website') }
            placeholder="Ex. http://womenandcolor.com/"
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

class SocialContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    props.onChangeProfile({ current_page: CURRENT_PAGE });
  }

  render() {
    const props = this.props;

    return(
      <div>
        <Helmet>
          <title>Get started - Social</title>
          <meta name="description" content="Create your profile on Women and Color" />
        </Helmet>
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
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    onChangeProfile: (attrs) => {
      dispatch(onChangeProfile(attrs))
    },
    updateProfile: () => {
      dispatch(updateProfile());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialContainer);
