import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactLoading from 'react-loading';

import { onChange as onChangeProfile } from 'appRedux/modules/profile';
import { getApiToken } from 'appRedux/modules/user';
import StyledButton from 'appCommon/StyledButton';
import { BASE_URL_PATH, MAXIMUM_IMAGE_SIZE } from 'appHelpers/constants';
import css from './styles.css';


class ImageUpload extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, imageError: false }
  }

  handleImageChange = event => {
    this.setState({ loading: true })
    const file = event.currentTarget.files[0];
    // image must not larger than 2MB
    if (file.size > MAXIMUM_IMAGE_SIZE) {
      this.setState({
        imageError: true,
        loading: false
      });
      return;
    }

    const data = new FormData();
    data.append('file', file);
    data.append('profile', this.props.profile.id);
    const url = `${BASE_URL_PATH}/api/v1/images/`;
    const token = getApiToken()
    axios({
      url,
      data,
      method: 'post',
      responseType: 'json',
      headers: {
        'Authorization': `JWT ${token}`
      }
    })
      .then(res => {
        this.props.onChangeProfile({ image: res.data.file });
        this.setState({ loading: false })
        console.log(res);
      })
      .catch(err => {
        this.setState({ loading: false })
        console.log(err);
      });
  }

  render() {
    return(
      <div className={css.imageUpload}>
        <div className={css.photo}>
          { this.state.loading ?
            (<ReactLoading type='spinningBubbles' color='#E5E8F4' />) :
            (<img src={this.props.profile.image} />)
          }
          {this.state.imageError ? (
            <div className={css.imageError}>
              ** The file size can not exceed 2MB.
            </div>
          ) : null}
        </div>
        <StyledButton component="label" color="secondary">
          <input
            type="file"
            accept="image/*"
            className={css.fileInput}
            onChange={this.handleImageChange}
          />
          Choose Image
        </StyledButton>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    profile: state.profile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeProfile: attrs => {
      dispatch(onChangeProfile(attrs));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);