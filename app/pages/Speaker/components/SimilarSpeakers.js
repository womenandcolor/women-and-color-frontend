import React, { PropTypes } from "react";
import StyledButton from "appCommon/StyledButton";
import css from "../styles.css";

const SimilarSpeakers = props => {
  return (
    <section>
      <h3 className="text-center">Similar Speakers</h3>
      <div className={css.similarSpeakersWrapper}>
        {props.speakers.map(speaker => <div key={speaker.id} />)}
      </div>
    </section>
  );
};

export default SimilarSpeakers;
