import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Input, { InputLabel } from 'material-ui/Input';
import Grid from 'material-ui/Grid';

// App
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import css from '../styles.css';
import { BASE_URL_PATH } from 'appHelpers/constants';

import { create, onChange } from 'appRedux/modules/contactForm';
import { hideNotification } from 'appRedux/modules/notification';

const MessageSpeakerForm = ({ speaker, onInputChange, onSubmit, form }) => {
  const generateHandler = fieldName => event =>
    onInputChange(fieldName, event.target.value);
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
                  required
                />
              </FormField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField fullWidth>
                <TextField
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={generateHandler('email')}
                  required
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
                  label="Message"
                  value={form.comments}
                  onChange={generateHandler('comments')}
                  multiline
                  required
                  rows={3}
                />
              </FormField>
            </Grid>
          </Grid>
        </div>
        <StyledButton type="submit" color="primary">
          Send Message
        </StyledButton>
      </form>
    </section>
  );
};

const MessageSpeakerFormContainer = props => {
  const handleInputChange = (fieldname, value) => {
    props.onChange({ [fieldname]: value });
  };

  const submitForm = event => {
    event.preventDefault();
    props.submitForm();
  };

  return (
    <MessageSpeakerForm
      speaker={props.speaker}
      onSubmit={submitForm}
      onInputChange={handleInputChange}
      form={props.form}
    />
  );
};

function mapDispatchToProps(dispatch, props) {
  return {
    submitForm: () => {
      dispatch(create());
    },
    onChange: data => {
      dispatch(onChange(data));
    }
  };
}

function mapStateToProps(state) {
  return {
    form: state.contactForm.form,
    speaker: state.speaker.speaker,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  MessageSpeakerFormContainer
);
