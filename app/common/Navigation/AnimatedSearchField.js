// NPM
import React, { PropTypes, Component } from 'react';
import { withRouter } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';

// APP
import StyledButton from 'appCommon/StyledButton';
import { updateSearchParams } from 'appRedux/modules/speaker';
import css from './styles.css';
import { searchForm, hideOnMobile } from '../../sharedStyles/styles.css';


class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.q || '',
      expand: false,
    };
  }

  searchProfiles = event => {
    event.preventDefault();
    const query = this.state.query;
    const home = '/';
    if (this.props.history.location.pathname !== home) {
      this.props.history.push(home);
    }
    this.props.updateSearchParams({
      q: query,
      offset: 0,
      limit: 20,
      append: false,
    });
  };

  onChange = event => {
    const query = event.target.value;
    this.setState({ query });
    if (!query) {
      const home = '/';
      if (this.props.history.location.pathname !== home) {
        this.props.history.push(home);
      }
      this.props.updateSearchParams({
        q: null,
        offset: 0,
        limit: 20,
        append: false,
      });
    }
  };

  handleClick = () => {
    console.log('show search!');
    this.setState({ expand: !this.state.expand });
  };

  render() {
    return (
      <IconButton
        type="submit"
        onClick={this.handleClick}
      >
        <SearchIcon />
      </IconButton>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSearchParams: params => {
      dispatch(updateSearchParams(params));
    },
  };
}

function mapStateToProps(state) {
  return {
    q: state.speaker.searchParams.q,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(SearchField)
);
