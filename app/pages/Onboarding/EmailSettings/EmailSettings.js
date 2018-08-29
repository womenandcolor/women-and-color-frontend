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
        <h1 className={css.registrationFormHeader}>Communication</h1>

        <FormField fullWidth className={css.formControl}>
          <p>Speaker Perks is available exclusively to speakers on Women & Color. You will only receive an email email if there’s a speaking opportunity in your area or we have special offers such as complimentary tickets to an event.</p>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.profile.speaker_mailing_list}
                onChange={e => props.handleProfileInputChange('speaker_mailing_list', e.target.checked)}
                value="speaker_mailing_list"
                color="primary"
              />
            }
            label="Subscribe to the Speaker Perks"
          />
        </FormField>

        <FormField fullWidth className={css.formControl}>
          <p>Be the first to learn about our new initiatives as well as keep up-to-date on speaking opportunities, up-coming training and development workshops, and additional curated content.</p>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.profile.newsletter_mailing_list}
                onChange={e => props.handleProfileInputChange('newsletter_mailing_list', e.target.checked)}
                value="newsletter_mailing_list"
                color="primary"
              />
            }
            label="Subscribe to monthly newsletter"
          />
        </FormField>

        <p>P.S. We keep your info private, we won't spam you, and you can unsubscribe at any time.</p>

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
    props.onChangeProfile({ current_page: null });
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
