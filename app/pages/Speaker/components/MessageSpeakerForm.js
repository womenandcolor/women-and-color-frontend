import React, { PropTypes } from "react";
import Input, { InputLabel } from "material-ui/Input";
import Grid from "material-ui/Grid";

// App
import StyledButton from "appCommon/StyledButton";
import FormField from "appCommon/FormField";
import css from "../styles.css";

const _renderYourInfo = () => (
  <div>
    <h4 className={css.sectionSubHeader}>Your Info</h4>
    <Grid container>
      <Grid item xs={12} sm={6}>
        <FormField fullWidth>
          <InputLabel htmlFor="full_name">Full Name</InputLabel>
          <Input id="full_name" />
        </FormField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField fullWidth>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input id="full_name" />
        </FormField>
      </Grid>
    </Grid>
  </div>
);

const _renderEventInfo = () => (
  <div>
    <h4 className={css.sectionSubHeader}>Event Info</h4>
    <Grid container>
      <Grid item xs={12} sm={6}>
        <FormField fullWidth>
          <InputLabel htmlFor="event_name">Event Name</InputLabel>
          <Input id="event_name" />
        </FormField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField fullWidth>
          <InputLabel htmlFor="venue_name">Venue Name</InputLabel>
          <Input id="venue_name" />
        </FormField>
      </Grid>
    </Grid>
    <Grid container>
      <Grid item xs={12} sm={6}>
        <FormField fullWidth>
          <InputLabel htmlFor="event_date">Event Date</InputLabel>
          <Input id="event_date" />
        </FormField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField fullWidth>
          <InputLabel htmlFor="event_time">Event Time</InputLabel>
          <Input id="event_time" />
        </FormField>
      </Grid>
    </Grid>
    <Grid container>
      <Grid item xs={12} sm={6}>
        <FormField fullWidth>
          <InputLabel htmlFor="compensation">Speaker Compensation</InputLabel>
          <Input id="compensation" />
        </FormField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField fullWidth>
          <InputLabel htmlFor="code_of_conduct">Code of Conduct</InputLabel>
          <Input id="code_of_conduct" />
        </FormField>
      </Grid>
    </Grid>
    <Grid container>
      <Grid item xs={12}>
        <FormField fullWidth>
          <InputLabel htmlFor="comments">Additional Comments</InputLabel>
          <Input id="comments" multiline rows={3} />
        </FormField>
      </Grid>
    </Grid>
  </div>
);

const MessageSpeakerForm = ({ speaker }) => {
  const title = `Message ${speaker.first_name}`;
  return (
    <section>
      <h2 className={css.sectionHeader}>{title}</h2>
      <form
        onSubmit={() => {
          alert("TODO");
          return true;
        }}
      >
        {_renderYourInfo()}
        {_renderEventInfo()}
        <StyledButton type="submit">Send Message</StyledButton>
      </form>
    </section>
  );
};

export default MessageSpeakerForm;
