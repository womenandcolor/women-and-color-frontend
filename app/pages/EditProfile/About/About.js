// NPM
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControlLabel } from 'material-ui/Form';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import Checkbox from 'material-ui/Checkbox';
import { ListItemText } from 'material-ui/List';
import Chip from 'material-ui/Chip';

import { find } from 'lodash';

// App
import axios from 'appHelpers/axios';
import {
  update as updateProfile,
  onChange as onChangeProfile,
} from 'appRedux/modules/profile';
import { get as getUser } from 'appRedux/modules/user';
import { get as getLocations } from 'appRedux/modules/location';
import { get as getTopics, create as createTopic } from 'appRedux/modules/topic';
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import { BASE_URL_PATH } from 'appHelpers/constants';

import TopicSelector from '../FormComponents/TopicSelector/TopicSelector'

import css from './styles.css';

const About = props => {
  const generateHandler = fieldName => event => {
    props.handleProfileInputChange(fieldName, event.currentTarget.value);
  };

  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    props.handleProfileInputChange('location', selectedLocation)
  }

  const handleTopicsChange = (topics) => {
    props.handleProfileInputChange('topics', topics)
  }

  if (!props.profile.id) {
    return (
      <div>
        User is not found [work in progress, please start again at register, to
        create new user]
      </div>
    );
  }

  return (
    <form onSubmit={props.handleSubmit}>
      <div className={css.section}>
        <h1 className={css.header}>Edit about</h1>
      </div>

      <div className={css.section}>
        <Grid container>
          <Grid item xs={12}>
            <div className={css.photo}>
              <img src={props.profile.image} />
            </div>
            <StyledButton component="label" color="primary">
              <input
                type="file"
                accept="image/*"
                className={css.fileInput}
                onChange={props.handleImageChange}
              />
              Choose Image
            </StyledButton>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <TextField
                label="First Name"
                value={props.profile.first_name}
                onChange={generateHandler('first_name')}
              />
            </FormField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <TextField
                label="Last Name"
                value={props.profile.last_name}
                onChange={generateHandler('last_name')}
              />
            </FormField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <TextField
                label="Position"
                value={props.profile.position}
                onChange={generateHandler('position')}
              />
            </FormField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <TextField
                label="Organization"
                value={props.profile.organization}
                onChange={generateHandler('organization')}
              />
            </FormField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <InputLabel htmlFor="speaker-location">City</InputLabel>
              <Select
                value={props.profile.location}
                onChange={handleLocationChange}
                input={<Input name="location" id="location" />}
              >
                {props.locations &&
                  props.locations.map((location, index) => {
                    return (
                    <MenuItem key={index} value={location.id}>
                      <ListItemText primary={location.city} />
                    </MenuItem>
                  )}
                )}
              </Select>
            </FormField>
          </Grid>
          <Grid item xs={12}>
            <FormField fullWidth className={css.formControl}>
              <TextField
                multiline
                rows={5}
                label="Bio"
                value={props.profile.description}
                onChange={generateHandler('description')}
              />
            </FormField>
          </Grid>

        </Grid>
      </div>

      <div className={css.section}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <FormLabel component="legend">
                Do you identify as a woman?
              </FormLabel>
              <RadioGroup
                aria-label="woman"
                name="woman"
                value={
                  props.profile.woman === null
                    ? 'true'
                    : props.profile.woman.toString()
                }
                onChange={generateHandler('woman')}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </FormField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <FormLabel component="legend">
                Do you identify as a person of color?
              </FormLabel>
              <RadioGroup
                aria-label="poc"
                name="poc"
                value={
                  props.profile.poc === null
                    ? 'true'
                    : props.profile.poc.toString()
                }
                onChange={generateHandler('poc')}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </FormField>
          </Grid>

          <Grid item xs={12}>
            <FormField fullWidth className={css.formControl}>
              <FormLabel component="legend">
                What pronouns do you use?
              </FormLabel>
              <RadioGroup
                aria-label="pronouns"
                name="pronouns"
                value={props.profile.pronouns || 'they'}
                onChange={generateHandler('pronouns')}
              >
                <FormControlLabel
                  value="they"
                  control={<Radio />}
                  label="They, them, their"
                />
                <FormControlLabel
                  value="she"
                  control={<Radio />}
                  label="She, her, her"
                />
                <FormControlLabel
                  value="he"
                  control={<Radio />}
                  label="He, him, his"
                />
              </RadioGroup>
            </FormField>
          </Grid>
        </Grid>
      </div>

      <div className={css.section}>
        <Grid item xs={12}>
          <FormLabel component="legend">
            Topics
          </FormLabel>
          <TopicSelector
            topics={props.topics}
            selectedTopics={props.profile.topics}
            handleChange={handleTopicsChange}
            createTopic={props.createTopic}
          />
        </Grid>
      </div>

      <div className={css.section}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <TextField
                label="Twitter"
                value={props.profile.twitter}
                onChange={generateHandler('twitter')}
              />
            </FormField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <TextField
                label="LinkedIn"
                value={props.profile.linkedin}
                onChange={generateHandler('linkedin')}
              />
            </FormField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <TextField
                label="Website"
                value={props.profile.website}
                onChange={generateHandler('website')}
              />
            </FormField>
          </Grid>
        </Grid>
      </div>

      <div className={css.sectionBorderless}>
        <FormField className={css.formControl}>
          <StyledButton label="Submit" type="submit" color="primary">
            Save changes
          </StyledButton>
        </FormField>
      </div>
    </form>
  );
};

class AboutContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleImageChange = e => this._handleImageChange(e);
  }

  componentWillMount() {
    this.props.getUser();
    this.props.getLocations();
    this.props.getTopics();
  }

  _handleImageChange(event) {
    const file = event.currentTarget.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('profile', this.props.profile.id);
    const url = `${BASE_URL_PATH}/api/v1/images/`;

    axios({
      url,
      data,
      method: 'post',
      responseType: 'json',
    })
      .then(res => {
        this.props.onChangeProfile({ image: res.data.file });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const props = this.props;

    if (!props.profile.isInitialized || props.profile.isLoading) {
      return <ReactLoading type="spinningBubbles" color="#000000" />;
    }
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={!!props.notification}
          onClose={props.closeNotification}
          autoHideDuration={4000}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{props.notification}</span>}
        />
        <About
          handleSubmit={event => {
            event.preventDefault();
            props.updateProfile();
          }}
          handleProfileInputChange={(field, value) => {
            props.onChangeProfile({ [field]: value });
          }}
          handleImageChange={this.handleImageChange}
          {...props}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    profile: state.profile,
    notification: state.notification.message,
    locations: state.location.locations,
    topics: state.topic.topics,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    getUser: () => {
      dispatch(getUser());
    },
    getLocations: () => {
      dispatch(getLocations());
    },
    getTopics: () => {
      dispatch(getTopics());
    },
    createTopic: (topic) => {
      dispatch(createTopic(topic))
    },
    onChangeProfile: attrs => {
      dispatch(onChangeProfile(attrs));
    },
    showNotification: message => {
      dispatch(showNotification(message));
    },
    hideNotification: () => {
      dispatch(hideNotification());
    },
    updateProfile: () => {
      dispatch(updateProfile());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutContainer);
