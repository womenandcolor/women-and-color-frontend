// NPM
import React, { PropTypes, Component } from 'react'
import {withRouter} from 'react-router-dom'
import IconButton from 'material-ui/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import { connect } from 'react-redux';

// APP
import StyledButton from 'appCommon/StyledButton';
import { updateSearchParams } from 'appRedux/modules/speaker';
import { searchForm } from '../sharedStyles/styles.css';
import css from './styles.css';

const styles = {
  searchButton: {
    height: '100%'
  },
  banner: {
    backgroundColor: 'var(--color-primary)',
    paddingTop: '6rem',
    paddingBottom: '6rem',
    marginBottom: '2rem',
    background: "url('https://s3.ca-central-1.amazonaws.com/womenandcolor/background-image.jpg') no-repeat center center fixed",
    backgroundSize: 'cover',
  },
  headline: {
    fontSize: '2rem',
    color: 'var(--color-inverted-light)',
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
    marginRight: '1rem'
  },
  searchIcon: {
    marginRight: '1rem'
  }
}

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = { query: this.props.q || '' }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.q !== newProps.q) {
      const query = newProps.q || '';
      this.setState({ query })
    }
  }

  searchProfiles = (event) => {
    event.preventDefault();
    const home = '/'
    if (this.props.history.location.pathname !== home) {
      this.props.history.push(home)
    }
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
      const home = '/'
      if (this.props.history.location.pathname !== home) {
        this.props.history.push(home)
      }
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
      <Grid container justify="center" className={css.banner} spacing={0}>
        <Grid item xs={10} md={8}>
          <h2 className={css.headline}>
            Find talented <span className={css.highlight}>women and people of color</span> available for speaking opportunities at tech-related events.
          </h2>
          <Hidden smDown>
            <form onSubmit={this.searchProfiles} className={`${searchForm} ${css.searchForm}`}>
              <Hidden only='xs'>
                <SearchIcon className={css.searchIcon} />
              </Hidden>
              <TextField
                fullWidth
                type="search"
                onChange={this.onChange}
                value={this.state.query}
                placeholder={'Search for speakers or topics'}
                InputProps={{ disableUnderline: true }}
                className={css.textField}
              />
              <div>
                <StyledButton color="primary" type="submit" >
                  <Hidden smUp>
                    <SearchIcon />
                  </Hidden>
                  <Hidden only='xs'>
                    <span>Find Speakers</span>
                  </Hidden>
                </StyledButton>
              </div>
            </form>
          </Hidden>
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

function mapStateToProps(state) {
  return {
    q: state.speaker.searchParams.q
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Banner));
