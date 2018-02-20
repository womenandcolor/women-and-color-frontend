import React, { PropTypes } from "react";
import StyledButton from "appCommon/StyledButton";
import css from "../styles.css";

const FeaturedTalk = props => {
  return (
    <article className={`card ${css.talkCard}`}>
      <img className="card-img-top" src={props.talk.image} />
      <div className="card-body">
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
      <h4 className={css.featuredTalksHeader}>Featured Talks and Links</h4>
      <div className={css.talksWrapper}>
        {props.talks.map(talk => <FeaturedTalk talk={talk} key={talk.id} />)}
      </div>
    </section>
  );
};

export default FeaturedTalks;
