import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input';
import { FormHelperText } from 'material-ui/Form';
import FormField from 'appCommon/FormField';
import Snackbar from 'material-ui/Snackbar';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import { onChange as onChangeUser } from 'appRedux/modules/user';

import css from './style.css';
import StyledButton from 'appCommon/StyledButton';
import PlaceHolder from 'svg-react-loader?name=PlaceHolder!./placeholder-photo.svg'; // remove this later

const Talk = props => {
  const generateHandler = fieldName => {
    return event => {
      props.handleUserInputChange(fieldName, event.currentTarget.value);
    };
  };

  return (
    <div className={css.talk}>
      <div className={css.section}>
        <Grid container>
          <Grid item md={12}>
            <h2>Talks # {`${props.talk.id + 1}`}</h2>
          </Grid>
          <Grid item md={12}>
            <Grid container spacing={40}>
              <Grid item xs={12} md={4}>
                <Card className={css.card}>
                  <PlaceHolder />
                  <CardContent>
                    <div>{props.talk.event}</div>
                    <a href="#">{props.talk.link}</a>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid item md={12}>
                  <FormField fullWidth className={css.formControl} required>
                    <FormHelperText
                      id="talk-link-label"
                      className={css.talkLabel}
                    >
                      Link
                    </FormHelperText>
                    <Input
                      id="talk-link"
                      value={props.talk.link}
                      onChange={generateHandler('talk-link')}
                      placeholder="https://www.youtube.com"
                    />
                  </FormField>
                </Grid>

                <Grid item md={12}>
                  <FormField fullWidth className={css.formControl} required>
                    <FormHelperText
                      id="talk-event-label"
                      className={css.talkLabel}
                    >
                      Event
                    </FormHelperText>
                    <Input
                      id="talk-event"
                      value={props.talk.event}
                      onChange={generateHandler('talk-event')}
                    />
                  </FormField>
                </Grid>

                <Grid item md={12}>
                  <FormField fullWidth className={css.formControl} required>
                    <FormHelperText
                      id="talk-name-label"
                      className={css.talkLabel}
                    >
                      Name
                    </FormHelperText>
                    <Input
                      id="talk-name"
                      value={props.talk.name}
                      onChange={generateHandler('talk-name')}
                    />
                  </FormField>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mockTalks = [
  {
    id: 0,
    name: 'Event Name',
    link: 'https://youtube.com',
    event: 'Event',
  },
];

class TalksContainer extends Component {
  state = {
    talks: this.props.talks,
  };

  addNewTalk = () => {
    // TODO: refactor this when backend is ready, right now just make it work for UI
    if (this.state.talks.length >= 7) {
      return;
    }
    const newTalk = {
      id: this.state.talks.length,
      name: 'Tech Toronto',
      link: 'https://youtube.com',
      event: 'Canada 150',
    };
    this.setState({
      talks: this.state.talks.concat(newTalk),
    });
  };

  handleChange = (field, value) => {
    // TODO: continue this when api is ready
    // this.props.onChangeUser({
    //   [field]: value,
    // })
  };

  renderTalks = (props, state) => {
    return (
      <div className={css.talkList}>
        {state.talks.map(talk => (
          <Talk
            talk={talk}
            key={talk.id}
            handleUserInputChange={(field, value) =>
              this.handleChange(field, value)
            }
          />
        ))}
      </div>
    );
  };

  renderComponent = (props, state) => {
    // TODO: change state into props when integrate with backend
    return (
      <form className={css.talkContainer}>
        <div className={css.section}>
          <h1 className={css.header}>Edit Talks</h1>
        </div>
        {this.renderTalks(props, state)}
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={state.talks.length >= 7}
          autoHideDuration={4000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={
            <span id="message-id">Limit of talks could be added is 7</span>
          }
        />
        <div className={css.section}>
          <StyledButton
            disabled={state.talks.length >= 7}
            color="secondary"
            className={css.addNewTalk}
            onClick={this.addNewTalk}
          >
            Add new Talk
          </StyledButton>
        </div>
        <div className={css.sectionBorderless}>
          <StyledButton label="Submit" type="submit" color="primary">
            Save changes
          </StyledButton>

          <StyledButton label="Cancel" type="submit" color="secondary">
            Cancel changes
          </StyledButton>
        </div>
      </form>
    );
  };

  render() {
    return this.renderComponent(this.props, this.state);
  }
}

export default connect(
  (state, props) => {
    return {
      talks: mockTalks,
    };
  },
  dispatch => {
    return bindActionCreators(
      {
        onChangeUser,
      },
      dispatch
    );
  }
)(TalksContainer);
