import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Input, { InputLabel } from 'material-ui/Input';
import Grid from 'material-ui/Grid';

// App
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import css from '../styles.css';
import axios from 'appHelpers/axios';
import { BASE_URL_PATH } from 'appHelpers/constants';

import { create, onChange } from "appRedux/modules/contactForm";

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
                  value={form.event_date}
                  onChange={generateHandler('event_date')}
                />
              </FormField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField fullWidth>
                <TextField
                  label="Event Time"
                  value={form.event_time}
                  onChange={generateHandler('event_time')}
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
        <StyledButton type="submit">Send Message</StyledButton>
      </form>
    </section>
  );
};

class MessageSpeakerFormContainer extends Component {
  constructor(props) {
    super(props);
  }

  handleInputChange = (fieldname, value) => {
    this.props.onChange({ [fieldname]: value })
  };

  submitForm = (event) => {
    event.preventDefault();
    this.props.submitForm();
  }

  render() {
    return (
      <MessageSpeakerForm
        speaker={this.props.speaker}
        onSubmit={this.submitForm}
        onInputChange={this.handleInputChange}
        form={this.props.form}
      />
    );
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    submitForm: () => {
      dispatch(create());
    },
    onChange: (data) => {
      dispatch(onChange(data));
    }
  };
}

function mapStateToProps(state) {
  return {
    form: state.contactForm.form,
    speaker: state.speaker.speaker
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageSpeakerFormContainer);
