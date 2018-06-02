import React, { PropTypes } from "react";
import Card, { CardContent, CardMedia } from "material-ui/Card";
import Carousel from 'nuka-carousel';

// App
import { ensureAbsoluteUrl } from 'appHelpers/url';
import css from "../styles.css";

const FeaturedTalk = props => {
  const { talk } = props;
  return (
    <div className={css.talkCardContainer}>
      <Card elevation={6} className={css.talkCard}>
        <CardMedia image={talk.image} className={css.talkCardImage} />
        <CardContent>
          <h2 className={css.talkCardHeader}>{props.talk.event_name}</h2>
          <a className={css.talkCardLink} href={ensureAbsoluteUrl(props.talk.url)} target="_blank">
            {props.talk.talk_title}
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

const FeaturedTalks = props => {
  const settings = {
      infinite: true,
      arrows: true,
      slidesToShow: 3,
      slidesToScroll: 1
    };
  return (
    <section>
      <h4 className={css.sectionSubHeader}>Featured Talks and Links</h4>
      <div className={css.talksWrapper}>
        <Carousel slidesToShow={2} wrapAround={true} dragging cellAlign={'left'}>
          {props.talks.map(talk => <FeaturedTalk talk={talk} key={talk.id} />)}
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedTalks;
