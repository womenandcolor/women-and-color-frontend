import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import ReactLoading from 'react-loading';
import Grid from 'material-ui/Grid';
import { Helmet } from "react-helmet";

// App
import Banner from 'appCommon/Banner';


const Organization = props => {
  const { speaker } = props;
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Banner />
      </Grid>
      <Grid item xs={9}>
        <Grid container spacing={24}>
          <h2>ORGANIZATION DETAILS GO HERE</h2>
        </Grid>
      </Grid>
    </Grid>
  );
};

class OrganizationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { match: { params: { id, orgName } } } = this.props;
  }

  render() {
    const { speaker } = this.props;
    return(
      <div>
        <Helmet></Helmet>
        <Organization></Organization>
      </div>
    )
  }
}

export default (OrganizationContainer);
