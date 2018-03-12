// NPM
import React, { PropTypes, Component } from 'react'
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui-icons/Search';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux'

// APP
import StyledButton from 'appCommon/StyledButton';
import { updateSearchParams } from 'appRedux/modules/speaker';
import { searchForm } from '../sharedStyles/styles.css';

const styles = {
  searchButton: {
    height: '100%'
  },
  banner: {
    backgroundColor: 'var(--color-primary)',
    paddingTop: '3rem',
    paddingBottom: '3rem',
    marginBottom: '2rem'
  },
  headline: {
    fontSize: '2rem',
    color: 'var(--color-inverted-light)',
    marginTop: '2rem',
    marginBottom: '2rem',
    fontWeight: '100'
  },
  highlight: {
    fontWeight: '600'
  },
  searchForm: {
    backgroundColor: 'var(--color-inverted-light)',
    paddingTop: '1rem',
    paddingBottom: '1rem'
  },
  textField: {
    marginRight: '1rem',
    marginLeft: '1rem'
  }
}

class Banner extends Component {
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
      <Grid container justify="center" style={styles.banner}>
        <Grid item xs={8}>
          <Typography variant="headline" style={styles.headline}>
            Find talented <span style={styles.highlight}>women and people of color</span> available for speaking opportunities at tech-related events.
          </Typography>
          <form onSubmit={this.searchProfiles} className={searchForm} style={styles.searchForm}>
            <SearchIcon />
            <TextField
              fullWidth
              type="search"
              onChange={this.onChange}
              value={this.state.query}
              placeholder={'Search for speakers or topics'}
              InputProps={{ disableUnderline: true }}
              style={styles.textField}
            />
            <div>
            <StyledButton color="primary" type="submit" >
              Find Speakers
            </StyledButton>
            </div>
          </form>
        </Grid>
      </Grid>
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
)(Banner);
