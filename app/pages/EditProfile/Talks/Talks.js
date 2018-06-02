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
import { get as getUser } from 'appRedux/modules/user';
import {
  update as updateTalk,
  create as createTalk,
  destroy as destroyTalk,
} from 'appRedux/modules/featuredTalk';

import css from './style.css';
import StyledButton from 'appCommon/StyledButton';
import EditTalk from './EditTalk';

const emptyTalk = {
  event_name: '',
  talk_title: '',
  url: '',
  image: '',
};

class TalksContainer extends Component {
  state = {
    talks: this.props.profile.featured_talks || [],
  };

  componentWillMount() {
    this.props.getUser();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.profile.featured_talks !== this.props.profile.featured_talks
    ) {
      this.setState({ talks: nextProps.profile.featured_talks });
    }
  }

  saveTalk = talkData => {
    if (talkData.id) {
      this.props.updateTalk({ ...talkData, profile: this.props.profile.id });
    } else {
      this.props.createTalk({ ...talkData, profile: this.props.profile.id });
    }
  };

  destroyTalk = talkData => {
    this.props.destroyTalk(talkData);
  };

  addEmptyTalk = () => {
    this.setState({ talks: this.state.talks.concat(emptyTalk) });
  };

  render() {
    const { talks } = this.state;

    return (
      <div className={css.talkContainer}>
        <div className={css.section}>
          <h1 className={css.header}>Edit Talks</h1>
        </div>

        <div className={css.talkList}>
          {talks.map((talk, index) => (
            <EditTalk
              talk={talk}
              key={`talk-${index}`}
              saveTalk={this.saveTalk}
              destroyTalk={this.destroyTalk}
              profile={this.props.profile.id}
            />
          ))}
        </div>

        {talks.length < 6 && (
          <div className={css.section}>
            <StyledButton
              disabled={talks.length >= 7}
              color="secondary"
              className={css.addNewTalk}
              onClick={this.addEmptyTalk}
            >
              Add new talk
            </StyledButton>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    profile: state.profile,
    notification: state.notification.message,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: () => {
      dispatch(getUser());
    },
    showNotification: message => {
      dispatch(showNotification(message));
    },
    hideNotification: () => {
      dispatch(hideNotification());
    },
    createTalk: data => {
      dispatch(createTalk(data));
    },
    updateTalk: data => {
      dispatch(updateTalk(data));
    },
    destroyTalk: data => {
      dispatch(destroyTalk(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TalksContainer);
