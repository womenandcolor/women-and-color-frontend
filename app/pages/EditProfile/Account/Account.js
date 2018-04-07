// NPM
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import ReactLoading from 'react-loading';

// App
import axios from 'appHelpers/axios';
import {
  update as updateUser,
  onChange as onChangeUser,
} from 'appRedux/modules/user';
import { get as getUser } from 'appRedux/modules/user';
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
    <form onSubmit={props.handleSubmit}>
      <h1 className={css.header}>Edit account</h1>

      <Grid container>
        <Grid item xs={6}>
          <FormField fullWidth className={css.formControl}>
            <TextField
              label="Email Address"
              value={props.user.email}
              onChange={generateHandler('email')}
            />
          </FormField>
        </Grid>
        <Grid item xs={6} />

        <a href="/accounts/password/change" className={css.changePasswordLink}>
          Click here to change your password.
        </a>

        <Grid item xs={12}>
          <div>
            <FormField className={css.formControl}>
              <StyledButton label="Submit" type="submit" color="primary">
                Save changes
              </StyledButton>
            </FormField>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

class AccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.getUser();
  }

  render() {
    const props = this.props;

    if (!props.user.isInitialized || props.user.isLoading) {
      return <ReactLoading type="spinningBubbles" color="#000000" />;
    }
    return (
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
        <Account
          handleSubmit={event => {
            event.preventDefault();
            props.updateUser();
          }}
          handleUserInputChange={(field, value) => {
            props.onChangeUser({ [field]: value });
          }}
          {...props}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    notification: state.notification.message,
    locations: state.location.locations,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    getUser: () => {
      dispatch(getUser());
    },
    getLocations: () => {
      dispatch(getLocations());
    },
    onChangeUser: attrs => {
      dispatch(onChangeUser(attrs));
    },
    showNotification: message => {
      dispatch(showNotification(message));
    },
    hideNotification: () => {
      dispatch(hideNotification());
    },
    updateUser: () => {
      dispatch(updateUser());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
