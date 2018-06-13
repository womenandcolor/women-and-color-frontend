// NPM
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar';

import {
  showNotification,
  hideNotification
} from 'appRedux/modules/notification';

const Notification = props => {
  return(
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={!!props.notification}
      onClose={props.hideNotification}
      autoHideDuration={4000}
      SnackbarContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{props.notification}</span>}
    />
  )
}

function mapStateToProps(state) {
  return {
    notification: state.notification.message,
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    showNotification: (message) => {
      dispatch(showNotification(message))
    },
    hideNotification: () => {
      dispatch(hideNotification())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
