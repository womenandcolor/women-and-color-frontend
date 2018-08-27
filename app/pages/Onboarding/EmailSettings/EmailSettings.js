// NPM
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Checkbox from 'material-ui/Checkbox';
import { FormLabel, FormControlLabel, FormHelperText } from 'material-ui/Form';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Helmet } from 'react-helmet';

// App
import {
  update as updateProfile,
  onChange as onChangeProfile,
} from 'appRedux/modules/profile';
import { showNotification } from 'appRedux/modules/notification';
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import css from '../styles.css';

const CURRENT_PAGE = 'email_settings';

const EmailSettings = props => {
  const generateHandler = fieldName => {
    return event => {
      props.handleProfileInputChange(fieldName, event.currentTarget.value);
    };
  };

  const handleTopicsChange = topics => {
    props.handleProfileInputChange('topics', topics);
  };

  return (
    <div className={css.registrationForm}>
      <form onSubmit={props.handleSubmit}>
        <h1 className={css.registrationFormHeader}>Email settings</h1>

        <FormField fullWidth className={css.formControl}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.profile.speaker_mailing_list}
                onChange={e => props.handleProfileInputChange('speaker_mailing_list', e.target.checked)}
                value="speaker_mailing_list"
                color="primary"
              />
            }
            label="Subscribe to the speakers' list"
          />
        </FormField>

        <FormField fullWidth className={css.formControl}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.profile.newsletter_mailing_list}
                onChange={e => props.handleProfileInputChange('newsletter_mailing_list', e.target.checked)}
                value="newsletter_mailing_list"
                color="primary"
              />
            }
            label="Subscribe to the speakers' list"
          />
        </FormField>

        <div>
          <FormField className={css.formControl}>
            <StyledButton label="Submit" type="submit" color="primary">
              Save and submit
            </StyledButton>
          </FormField>
        </div>
      </form>
    </div>
  );
};

class EmailSettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    props.onChangeProfile({ current_page: CURRENT_PAGE });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Get started - Email Settings</title>
          <meta
            name="description"
            content="Create your profile on Women and Color"
          />
        </Helmet>
        <EmailSettings
          handleSubmit={event => {
            event.preventDefault();
            this.props.updateProfile();
          }}
          handleProfileInputChange={(field, value) => {
            this.props.onChangeProfile({ [field]: value });
          }}
          {...this.props}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    profile: state.profile,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    onChangeProfile: attrs => {
      dispatch(onChangeProfile(attrs));
    },
    updateProfile: () => {
      dispatch(updateProfile()).then(() => {
        dispatch(push('/profile'))
      });
    },
    showNotification: message => {
      dispatch(showNotification(message));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailSettingsContainer);
