import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Input, { InputLabel } from 'material-ui/Input';
import Grid from 'material-ui/Grid';
import Snackbar from 'material-ui/Snackbar';


// App
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import css from '../styles.css';
import axios from 'appHelpers/axios';
import { BASE_URL_PATH } from 'appHelpers/constants';

import { create, onChange } from "appRedux/modules/contactForm";
import { hideNotification } from "appRedux/modules/notification";

const MessageSpeakerForm = ({ speaker, onInputChange, onSubmit, form }) => {
  const generateHandler = fieldName => event =>
    onInputChange(fieldName, event.currentTarget.value);
  const title = `Message ${speaker.first_name}`;
  return (
    <section>
      <h2 className={css.sectionHeader}>{title}</h2>
      <form onSubmit={onSubmit}>
        <div>
          <h4 className={css.sectionSubHeader}>Your Info</h4>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <FormField fullWidth>
                <TextField
                  label="Full Name"
                  value={form.full_name}
                  onChange={generateHandler('full_name')}
                />
              </FormField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField fullWidth>
                <TextField
                  label="Email"
                  value={form.email}
                  onChange={generateHandler('email')}
                />
              </FormField>
            </Grid>
          </Grid>
        </div>
        <div>
          <h4 className={css.sectionSubHeader}>Event Info</h4>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <FormField fullWidth>
                <TextField
                  label="Event Name"
                  value={form.event_name}
                  onChange={generateHandler('event_name')}
                />
              </FormField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField fullWidth>
                <TextField
                  label="Venue Name"
                  value={form.venue_name}
                  onChange={generateHandler('venue_name')}
                />
              </FormField>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <FormField fullWidth>
                <TextField
                  label="Event Date"
                  type="date"
                  value={form.event_date}
                  onChange={generateHandler('event_date')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField fullWidth>
                <TextField
                  label="Event Time"
                  type="time"
                  value={form.event_time}
                  onChange={generateHandler('event_time')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormField>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <FormField fullWidth>
                <TextField
                  select
                  label="Speaker Compensation"
                  value={form.speaker_compensation}
                  onChange={generateHandler('speaker_compensation')}
                >
                  <MenuItem key={0} value={0}>
                    No
                  </MenuItem>
                  <MenuItem key={1} value={1}>
                    Yes
                  </MenuItem>
                </TextField>
              </FormField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField fullWidth>
                <TextField
                  select
                  label="Code of Conduct"
                  value={form.code_of_conduct}
                  onChange={generateHandler('code_of_conduct')}
                >
                  <MenuItem key={0} value={0}>
                    None
                  </MenuItem>
                  <MenuItem key={1} value={1}>
                    Publicly Accessible
                  </MenuItem>
                </TextField>
              </FormField>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <FormField fullWidth>
                <TextField
                  label="Additional Comments"
                  value={form.comments}
                  onChange={generateHandler('comments')}
                  multiline
                  rows={3}
                />
              </FormField>
            </Grid>
          </Grid>
        </div>
        <StyledButton type="submit" color="primary">Send Message</StyledButton>
      </form>
    </section>
  );
};

const MessageSpeakerFormContainer = (props) => {

  const handleInputChange = (fieldname, value) => {
    props.onChange({ [fieldname]: value })
  };

  const submitForm = (event) => {
    event.preventDefault();
    props.submitForm();
  }

  return (
    <div>
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
      <MessageSpeakerForm
        speaker={props.speaker}
        onSubmit={submitForm}
        onInputChange={handleInputChange}
        form={props.form}
      />
    </div>
  )
}

function mapDispatchToProps(dispatch, props) {
  return {
    submitForm: () => {
      dispatch(create());
    },
    onChange: (data) => {
      dispatch(onChange(data));
    },
    hideNotification: () => {
      dispatch(hideNotification())
    },
  };
}

function mapStateToProps(state) {
  return {
    form: state.contactForm.form,
    speaker: state.speaker.speaker,
    notification: state.notification.message
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageSpeakerFormContainer);
