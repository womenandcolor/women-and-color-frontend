// Project
import React, { Component }  from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import Grid from 'material-ui/Grid';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { Link } from 'react-router-dom';
import Card from 'material-ui/Card';
import { Helmet } from "react-helmet";

// App
import {
  onChange as onChangeUser,
  confirmResetPassword as submitForm
} from 'appRedux/modules/user';
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import AccountFormContainer from './AccountFormContainer';

import css from './styles.css';

const ConfirmResetPassword = (props) => {
  const generateHandler = (fieldName) => {
    return (event) => { props.handleUserInputChange(fieldName, event.currentTarget.value) }
  }

  return(
    <div>
      <AccountFormContainer>
        <form onSubmit={ props.handleSubmit }>
          <h1 className={css.title}>Enter your new password</h1>

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

          <Grid container justify="flex-start" className={css.actions}>
            <Grid item>
              <StyledButton label="Submit" type="submit" color="primary">Submit</StyledButton>
            </Grid>
          </Grid>

        </form>
      </AccountFormContainer>
    </div>
  )
}


class ConfirmResetPasswordContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { match: { params: { uid, token } } } = this.props;
    this.setState({ uid, token })
  }

  render() {
    return(
      <div>
        <Helmet>
          <title>Set a new password</title>
          <meta name="description" content="Set a new password" />
        </Helmet>
        <ConfirmResetPassword
          handleSubmit={event => {
            event.preventDefault();
            this.props.submitForm(this.state.uid, this.state.token);
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
    submitForm: (uid, token) => {
      dispatch(submitForm(uid, token));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmResetPasswordContainer);
