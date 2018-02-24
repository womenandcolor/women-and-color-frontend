import React, { PropTypes } from "react";
import Card, { CardContent, CardMedia } from "material-ui/Card";

// App
import css from "../styles.css";

const FeaturedTalk = props => {
  const { talk } = props;
  return (
    <Card elevation={6} className={css.talkCard}>
      <CardMedia image={talk.image} className={css.talkCardImage} />
      <CardContent>
        <h2 className={css.talkCardHeader}>{props.talk.organization}</h2>
        <a className={css.talkCardLink} href={props.talk.url}>
          {props.talk.name}
        </a>
      </CardContent>
    </Card>
  );
};

const FeaturedTalks = props => {
  return (
    <section>
      <h4 className={css.sectionSubHeader}>Featured Talks and Links</h4>
      <div className={css.talksWrapper}>
        {props.talks.map(talk => <FeaturedTalk talk={talk} key={talk.id} />)}
      </div>
    </section>
  );
};

export default FeaturedTalks;
