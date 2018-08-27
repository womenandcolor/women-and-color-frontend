// NPM
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Checkbox from 'material-ui/Checkbox';
import {FormControlLabel} from 'material-ui/Form';
import ReactLoading from 'react-loading';

// App
import { update as updateProfile, onChange as onChangeProfile } from 'appRedux/modules/profile';
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';

import css from './styles.css';

const EmailSettings = props => {
  if (!props.user.id) {
    return <div>User is not found</div>;
  }

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div className={css.section}>
          <h1 className={css.header}>Edit your email settings</h1>
        </div>

        <div className={css.section}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <FormField fullWidth className={css.formControl}>
                <p>Speakers' Notes is a mailing list exclusively for speakers on Women & Color where you can find out about upcoming speaking opportunities in your city. It's also how we'll inform you about perks such as free tickets to events and special offers from our partners.</p>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.profile.speaker_mailing_list}
                      onChange={e => props.handleProfileInputChange('speaker_mailing_list', e.target.checked)}
                      value="speaker_mailing_list"
                      color="primary"
                    />
                  }
                  label="Subscribe to the Speakers' Notes"
                />
              </FormField>

              <FormField fullWidth className={css.formControl}>
                <p>Our newsletter is where we celebrate the successes of our speakers and share our progress as an organization as we continue to fight for better representation and diversity in the tech industry.</p>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.profile.newsletter_mailing_list}
                      onChange={e => props.handleProfileInputChange('newsletter_mailing_list', e.target.checked)}
                      value="newsletter_mailing_list"
                      color="primary"
                    />
                  }
                  label="Subscribe to our newsletter"
                />
              </FormField>

              <FormField className={css.formControl}>
                <StyledButton label="Save email settings" type="submit" color="primary">
                  Save
                </StyledButton>
              </FormField>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
};

const EmailSettingsContainer = props => {
  if (!props.user.isInitialized || props.user.isLoading) {
    return <ReactLoading type="spinningBubbles" color="#E5E8F4" />;
  }

  return (
    <EmailSettings
      handleSubmit={event => {
        event.preventDefault();
        props.updateProfile();
      }}
      handleProfileInputChange={(field, value) => {
        props.onChangeProfile({ [field]: value });
      }}
      {...props}
    />
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
    profile: state.profile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeProfile: attrs => {
      dispatch(onChangeProfile(attrs));
    },
    updateProfile: () => {
      dispatch(updateProfile());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailSettingsContainer);
