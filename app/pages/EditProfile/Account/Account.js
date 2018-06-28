// NPM
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import ReactLoading from 'react-loading';

// App
import {
  update as updateUser,
  onChange as onChangeUser,
  changePassword
} from 'appRedux/modules/user';
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

  if (!props.user.id) {
    return <div>User is not found</div>;
  }

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
    changePassword: () => {
      dispatch(changePassword());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
