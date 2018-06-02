import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import { FormHelperText } from 'material-ui/Form';
import FormField from 'appCommon/FormField';
import TextField from 'material-ui/TextField';
import Input from 'material-ui/Input';
import StyledButton from 'appCommon/StyledButton';
import { BASE_URL_PATH } from 'appHelpers/constants';
import axios from 'appHelpers/axios';

import css from './style.css';

class Talk extends Component {
  state = { talk: this.props.talk };

  componentWillReceiveProps(newProps) {
    if (newProps.talk !== this.props.talk) {
      this.setState({ talk: newProps.talk });
    }
  }

  generateHandler = fieldName => event => {
    this.setState({
      talk: {
        ...this.state.talk,
        [fieldName]: event.currentTarget.value,
      },
    });
  };

  onSave = e => {
    e.preventDefault();
    this.props.saveTalk(this.state.talk);
  };

  onDelete = () => {
    this.props.destroyTalk(this.state.talk);
  };

  handleImageChange = event => {
    const file = event.currentTarget.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('profile', this.props.profile);
    const url = `${BASE_URL_PATH}/api/v1/images/`;

    axios({
      url,
      data,
      method: 'post',
      responseType: 'json',
    })
      .then(res => {
        this.setState({
          talk: {
            ...this.state.talk,
            image: res.data.file,
          },
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const label = this.state.talk.talk_title
      ? this.state.talk.talk_title
      : 'New Talk';
    return (
      <div className={css.talk}>
        <div className={css.section}>
          <Grid container>
            <Grid item md={12}>
              <h2>{label}</h2>
            </Grid>
            <Grid item md={12}>
              <Grid container spacing={40}>
                <Grid item xs={12} md={5}>
                  <Card className={css.card}>
                    <CardMedia
                      image={this.state.talk.image || './'}
                      className={css.talkCardImage}
                    />
                    <CardContent>
                      <div>{this.state.talk.event_name || 'Event Name'}</div>
                      <div>
                        <a href={this.state.talk.url} target="_blank">
                          {this.state.talk.talk_title || 'Talk Title'}
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={7}>
                  <form onSubmit={this.onSave}>
                    <Grid item md={12}>
                      <FormField fullWidth className={css.formControl}>
                        <FormHelperText
                          id="talk-link-label"
                          className={css.talkLabel}
                        >
                          Link
                        </FormHelperText>
                        <TextField
                          id="talk-link"
                          value={this.state.talk.url}
                          onChange={this.generateHandler('url')}
                          placeholder="https://www.youtube.com"
                          required
                        />
                      </FormField>
                    </Grid>

                    <Grid item md={12}>
                      <FormField fullWidth className={css.formControl}>
                        <FormHelperText
                          id="talk-event-label"
                          className={css.talkLabel}
                        >
                          Event name
                        </FormHelperText>
                        <TextField
                          id="talk-event"
                          value={this.state.talk.event_name}
                          onChange={this.generateHandler('event_name')}
                          required
                        />
                      </FormField>
                    </Grid>

                    <Grid item md={12}>
                      <FormField fullWidth className={css.formControl}>
                        <FormHelperText
                          id="talk-name-label"
                          className={css.talkLabel}
                        >
                          Talk title
                        </FormHelperText>
                        <TextField
                          id="talk-name"
                          value={this.state.talk.talk_title}
                          onChange={this.generateHandler('talk_title')}
                          required
                        />
                      </FormField>
                    </Grid>

                    <Grid item md={12}>
                      <FormField fullWidth className={css.formControl}>
                        <FormHelperText
                          id="talk-name-label"
                          className={css.talkLabel}
                        >
                          Image
                        </FormHelperText>
                        <Input
                          type="file"
                          name="photo"
                          onChange={this.handleImageChange}
                        />
                      </FormField>
                    </Grid>

                    <Grid item md={12}>
                      <StyledButton
                        label="Submit"
                        type="submit"
                        color="primary"
                      >
                        Save
                      </StyledButton>
                      {this.state.talk.id && (
                        <StyledButton
                          label="Cancel"
                          type="button"
                          color="secondary"
                          onClick={this.onDelete}
                        >
                          Delete
                        </StyledButton>
                      )}
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Talk;
