import React, { PropTypes } from "react";
import StyledButton from "appCommon/StyledButton";
import css from "../styles.css";

const FeaturedTalk = props => {
  return (
    <article className={`card ${css.talkCard}`}>
      <div className="card-image">
        <img src={props.talk.image} />
      </div>
      <div className="card-content">
        <h5>{props.talk.organization}</h5>
        <p>
          <a href={props.talk.url}>{props.talk.name}</a>
        </p>
      </div>
    </article>
  );
};

const FeaturedTalks = props => {
  return (
    <section>
      <h6 className={css.featuredTalksHeader}>Featured Talks and Links</h6>
      <div className={css.talksWrapper}>
        {props.talks.map(talk => <FeaturedTalk talk={talk} key={talk.id} />)}
      </div>
    </section>
  );
};

export default FeaturedTalks;
