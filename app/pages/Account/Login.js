// Project
import React, { Component }  from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import Grid from 'material-ui/Grid';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { Link } from 'react-router-dom'
import Card from 'material-ui/Card';
import { Helmet } from "react-helmet";
import { push } from 'react-router-redux';

// App
import {
  onChange as onChangeUser,
  login as submitForm
} from 'appRedux/modules/user';
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import AccountFormContainer from './AccountFormContainer';

import css from './styles.css';

const Login = (props) => {
  const generateHandlerUser = (fieldName) => {
    return (event) => { props.handleUserInputChange(fieldName, event.currentTarget.value) }
  }

  return(
    <div>
      <AccountFormContainer>
        <form onSubmit={ props.handleSubmit }>
          <h1 className={css.title}>Log in</h1>

          <FormField fullWidth>
            <TextField label="Email" type="email" onChange={ generateHandlerUser('email') } />
          </FormField>

          <FormField fullWidth>
            <TextField label="Password" type="password" onChange={ generateHandlerUser('password') } />
          </FormField>

          <Grid container justify="space-between" className={css.actions}>
            <Grid item>
              <Link to={'/reset-password'}>Forgot your password?</Link>
            </Grid>
            <Grid item>
              <StyledButton label="Submit" type="submit" color="primary">Submit</StyledButton>
            </Grid>
          </Grid>

        </form>
      </AccountFormContainer>
      <Grid container justify="center">
        <Grid item xs={11} sm={8} md={5}>
          <p className={css.loginRegisterPrompt}>If you have not created an account yet, then please <Link to="/register">sign up</Link> first.</p>
        </Grid>
      </Grid>
    </div>
  )
}


class LoginContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <Helmet>
          <title>Log in</title>
          <meta name="description" content="Log in to Women and Color" />
        </Helmet>
        <Login
          handleSubmit={event => {
            event.preventDefault();
            this.props.submitForm(this.props.user);
          }}
          handleUserInputChange={(field, value) => {
            this.props.onChangeUser({ [field]: value })
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
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    onChangeUser: (attrs) => {
      dispatch(onChangeUser(attrs))
    },
    fetchLocations: () => {
      dispatch(fetchLocations())
    },
    submitForm: (user) => {
      dispatch(submitForm(user));
    },
    goToProfile: () => {
      dispatch(push('/'));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
