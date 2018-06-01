import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import { FormHelperText } from 'material-ui/Form';
import FormField from 'appCommon/FormField';
import TextField from 'material-ui/TextField';
import StyledButton from 'appCommon/StyledButton';
import PlaceHolder from 'svg-react-loader?name=PlaceHolder!./placeholder-photo.svg'; // remove this later

import css from './style.css';

class Talk extends Component {
  state = { talk: this.props.talk };

  componentWillReceiveProps(newProps) {
    if (newProps.talk !== this.props.talk) {
      this.setState({ talk: newProps.talk })
    }
  }

  generateHandler = fieldName => event => {
    this.setState({
      talk: {
        ...this.state.talk,
        [fieldName]: event.currentTarget.value
      }
    });
  };

  onSave = (e) => {
    e.preventDefault();
    this.props.saveTalk(this.state.talk)
  };

  onDelete = () => {
    this.props.destroyTalk(this.state.talk)
  };

  render() {
    const label = this.state.talk.talk_title ? this.state.talk.talk_title : 'New Talk';
    console.log('this.state.talk', this.state.talk);
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
                    <PlaceHolder />
                    <CardContent>
                      <div>{this.state.talk.event_name}</div>
                      <div>{this.state.talk.talk_title}</div>
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
                      <StyledButton label="Submit" type="submit" color="primary">
                        Save
                      </StyledButton>
                      {
                        this.state.talk.id &&
                        <StyledButton label="Cancel" type="button" color="secondary" onClick={this.onDelete}>
                          Delete
                        </StyledButton>
                      }
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
};

export default Talk;