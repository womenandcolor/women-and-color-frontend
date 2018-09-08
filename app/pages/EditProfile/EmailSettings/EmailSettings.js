// NPM
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Checkbox from 'material-ui/Checkbox';
import {FormControlLabel} from 'material-ui/Form';
import ReactLoading from 'react-loading';
import { find, remove } from 'lodash';

// App
import { update as updateProfile, onChange as onChangeProfile } from 'appRedux/modules/profile';
import { get as getSubscriptionGroups } from 'appRedux/modules/subscriptionGroup'
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';

import css from './styles.css';

const EmailSettings = props => {
  if (!props.user.id) {
    return <div>User is not found</div>;
  }

  const group_options = props.subscription_groups || [];

  const handleSubscriptionGroups = (e) => {
    const group = find(props.subscription_groups, g => g.group_id === e.target.value)
    let selectedGroups = [...props.profile.subscription_groups];

    if (e.target.checked) {
      selectedGroups.push(group);
    } else {
      remove(selectedGroups, g => g.group_id === group.group_id);
    }

    props.handleProfileInputChange('subscription_groups', selectedGroups);
  }


  return (
    <form onSubmit={props.handleSubmit}>
      <div className={css.section}>
        <h1 className={css.header}>Edit your communication settings</h1>
      </div>

      <div className={css.section}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <FormField fullWidth className={css.formControl}>
              <label>What can we contact you about?</label>

              {
                group_options.map(group => {
                  const checked = find(props.profile.subscription_groups, g => g.group_id === group.group_id)
                  return (
                    <FormControlLabel
                      key={group.group_id}
                      control={
                        <Checkbox
                          checked={Boolean(checked)}
                          onChange={handleSubscriptionGroups}
                          value={group.group_id}
                          color="primary"
                        />
                      }
                      label={group.label}
                    />
                  )
                })
              }
            </FormField>

            <FormField className={css.formControl}>
              <StyledButton label="Save communication settings" type="submit" color="primary">
                Save
              </StyledButton>
            </FormField>
          </Grid>
        </Grid>
      </div>
    </form>
  );
};

class EmailSettingsContainer extends React.Component {
  componentDidMount() {
    this.props.getSubscriptionGroups();
  }


  render() {
    const { props } = this;
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

}

function mapStateToProps(state) {
  return {
    user: state.user,
    profile: state.profile,
    subscription_groups: state.subscriptionGroup.groups,
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
    getSubscriptionGroups: () => {
      dispatch(getSubscriptionGroups());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailSettingsContainer);
