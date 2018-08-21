// NPM
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import {FormControlLabel} from 'material-ui/Form';
import ReactLoading from 'react-loading';

// App
import {
  update as updateUser,
  onChange as onChangeUser,
  changePassword,
  destroy as destroyUser,
} from 'appRedux/modules/user';
import { update as updateProfile, onChange as onChangeProfile } from 'appRedux/modules/profile';
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import { BASE_URL_PATH } from 'appHelpers/constants';
import css from './styles.css';

const Account = props => {
  const generateHandler = fieldName => {
    return event => {
      props.handleUserInputChange(fieldName, event.currentTarget.value);
    };
  };

  const handleChangeVisibility = (e) => {
    props.onChangeProfile({ published: e.target.checked })
  }

  const onSubmitVisbility = (e) => {
    e.preventDefault();
    props.updateProfile();
  }

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      props.destroyUser();
    }
  }

  if (!props.user.id) {
    return <div>User is not found</div>;
  }

  const isPublished = Boolean(props.profile.published)

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div className={css.section}>
          <h1 className={css.header}>Edit your account</h1>
        </div>

        <div className={css.section}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <FormField fullWidth className={css.formControl}>
                <TextField
                  required
                  label="Email Address"
                  value={props.user.email}
                  type="email"
                  onChange={generateHandler('email')}
                />
              </FormField>

              <FormField className={css.formControl}>
                <StyledButton label="Update email address" type="submit" color="primary">
                  Update email address
                </StyledButton>
              </FormField>
            </Grid>
          </Grid>
        </div>
      </form>

      <form onSubmit={props.handleChangePassword}>
        <div className={css.section}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <FormField fullWidth className={css.formControl}>
                <TextField
                  required
                  label="Old password"
                  value={props.user.old_password || ''}
                  type="password"
                  onChange={generateHandler('old_password')}
                />
              </FormField>

              <FormField fullWidth className={css.formControl}>
                <TextField
                  required
                  label="New password"
                  value={props.user.new_password1 || ''}
                  type="password"
                  onChange={generateHandler('new_password1')}
                />
              </FormField>

              <FormField fullWidth className={css.formControl}>
                <TextField
                  required
                  label="Confirm new password"
                  value={props.user.new_password2 || ''}
                  type="password"
                  onChange={generateHandler('new_password2')}
                />
              </FormField>

              <FormField className={css.formControl}>
                <StyledButton label="Submit" type="submit" color="primary">
                  Update password
                </StyledButton>
              </FormField>
            </Grid>
          </Grid>
        </div>
      </form>

      <form onSubmit={onSubmitVisbility}>
        <div className={css.section}>
          <h2 className={css.header}>Profile visibility</h2>
          <p>Need a break? You can unpublish your profile to exclude your profile from search results and make your profile page visible only to you when you are logged in. You can publish or unpublish your profile at any time.</p>
          <Grid container>
            <Grid item xs={12} md={6}>
              <FormField fullWidth className={css.formControl}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={isPublished}
                      onChange={handleChangeVisibility}
                      value="published"
                    />
                  }
                  label="Published"
                />
              </FormField>

              <FormField className={css.formControl}>
                <StyledButton label="Update email address" type="submit" color="primary">
                  Save
                </StyledButton>
              </FormField>
            </Grid>
          </Grid>
        </div>
      </form>

      <div className="delete-account" className={css.section}>
        <h3 className={css.header}>Delete your account</h3>
        <p>If you want to leave Women & Color, you can delete your account. Your account and all related data will be deleted forever. You cannot recover your account once you have deleted it.</p>
        <FormField className={css.formControl}>
          <StyledButton type="button" onClick={handleDeleteAccount} color="secondary">
            Delete account
          </StyledButton>
        </FormField>
      </div>
    </div>
  );
};

const AccountContainer = props => {
  if (!props.user.isInitialized || props.user.isLoading) {
    return <ReactLoading type="spinningBubbles" color="#E5E8F4" />;
  }

  return (
    <Account
      handleSubmit={event => {
        event.preventDefault();
        props.updateUser();
      }}
      handleChangePassword={event => {
        event.preventDefault();
        props.changePassword();
      }}
      handleUserInputChange={(field, value) => {
        props.onChangeUser({ [field]: value });
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
    onChangeUser: attrs => {
      dispatch(onChangeUser(attrs));
    },
    updateUser: () => {
      dispatch(updateUser());
    },
    destroyUser: () => {
      dispatch(destroyUser());
    },
    changePassword: () => {
      dispatch(changePassword());
    },
    onChangeProfile: attrs => {
      dispatch(onChangeProfile(attrs));
    },
    updateProfile: () => {
      dispatch(updateProfile());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
