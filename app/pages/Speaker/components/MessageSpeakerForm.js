import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import Grid from 'material-ui/Grid';

// App
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import css from '../styles.css';
import axios from 'appHelpers/axios';
import { BASE_URL_PATH } from 'appHelpers/constants';

const MessageSpeakerForm = ({ speaker, onInputChange, onSubmit }) => {
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
                  onChange={generateHandler('full_name')}
                />
              </FormField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField fullWidth>
                <TextField label="Email" onChange={generateHandler('email')} />
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
                  onChange={generateHandler('event_name')}
                />
              </FormField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField fullWidth>
                <TextField
                  label="Venue Name"
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
                  onChange={generateHandler('event_date')}
                />
              </FormField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField fullWidth>
                <TextField
                  label="Event Time"
                  onChange={generateHandler('event_time')}
                />
              </FormField>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <FormField fullWidth>
                <TextField
                  label="Speaker Compensation"
                  onChange={generateHandler('speaker_compensation')}
                />
              </FormField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField fullWidth>
                <TextField
                  label="Code of Conduct"
                  onChange={generateHandler('code_of_conduct')}
                />
              </FormField>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <FormField fullWidth>
                <TextField
                  label="Additional Comments"
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
  handleInputChange = (fieldname, value) => {
    this.setState({
      ...this.state,
      [fieldname]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const url = `${BASE_URL_PATH}/api/v1/messagespeaker/`;

    axios({
      url,
      data: this.state,
      method: 'post',
      responseType: 'json',
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <MessageSpeakerForm
        speaker={this.props.speaker}
        onSubmit={this.handleSubmit}
        onInputChange={this.handleInputChange}
      />
    );
  }
}

function mapDispatchToProps(dispatch, props) {
  return {};
}

export default connect(null, mapDispatchToProps)(MessageSpeakerFormContainer);
