// NPM
import React, { PropTypes, Component } from 'react'
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui-icons/Search';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux'

// APP
import StyledButton from 'appCommon/StyledButton';
import { updateSearchParams } from 'appRedux/modules/speaker';
import css from './styles.css';
import { searchForm } from '../../sharedStyles/styles.css';

const styles = {
  form: {
    paddingLeft: '2px'
  },
  searchButton: {
    height: '100%'
  }
}

class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '' }
  }

  searchProfiles = (event) => {
    event.preventDefault();
    const query = this.state.query;
    this.props.updateSearchParams({
      q: query,
      offset: 0,
      limit: 20,
      append: false
    })
  }

  onChange = (event) => {
    const query = event.target.value;
    this.setState({ query });
    if (!query) {
      this.props.updateSearchParams({
        q: null,
        offset: 0,
        limit: 20,
        append: false
      })
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.searchProfiles} className={searchForm} style={styles.form}>
          <IconButton color="secondary" type="submit" style={styles.searchButton}>
            <SearchIcon />
          </IconButton>
          <TextField
            fullWidth
            type="search"
            onChange={this.onChange}
            value={this.state.query}
            placeholder={'Search for speakers or topics'}
            InputProps={{ disableUnderline: true }}
          />
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSearchParams: (params) => {
      dispatch(updateSearchParams(params))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SearchField);
