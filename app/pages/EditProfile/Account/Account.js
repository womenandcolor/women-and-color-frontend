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
      <div className={css.section}>
        <h1 className={css.header}>Edit account</h1>
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
          </Grid>
        </Grid>
      </div>

      <div className={css.section}>
        <Grid container>
          <Grid item xs={12}>
            <a
              href="/accounts/password/change"
              className={css.changePasswordLink}
            >
              Click here to change your password.
            </a>
          </Grid>
        </Grid>
      </div>

      <div className={css.sectionBorderless}>
        <FormField className={css.formControl}>
          <StyledButton label="Submit" type="submit" color="primary">
            Save changes
          </StyledButton>
        </FormField>
      </div>
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
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    locations: state.location.locations,
  };
}

function mapDispatchToProps(dispatch) {
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
    updateUser: () => {
      dispatch(updateUser());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
