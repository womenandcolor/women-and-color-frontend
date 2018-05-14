import React from 'react';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';

import css from './styles.css'

const CodeOfConduct = () => {
  return(
    <Grid container justify="center">
      <Grid item xs={11} md={9}>
        <header className={css.header}>
          <h1>Code of Conduct</h1>
        </header>
        <h2>1. Purpose</h2>
        <p>A primary goal of Women and Color is to be an inclusive community with the largest number of contributors, representing many various and diverse backgrounds as possible. As such, we are committed to providing a nonsectarian, friendly, safe and welcoming environment for all, regardless of gender, sexual orientation, ability, ethnicity, or socioeconomic status.</p>
        <p>This code of conduct outlines our expectations for all those who use Women and Color, as well as the consequences for unacceptable behavior.</p>
        <p>We invite all those who use Women and Color to help us create safe and positive experiences for everyone.</p>
        <h2>2. Community Expectations</h2>
        <p>The following behaviors are expected and requested of all community members:</p>
        <ul>
          <li>Active participation in an authentic way. In doing so, you contribute to the health and longevity of this community. </li>
          <li>Exercise consideration and respect in your speech and actions.</li>
          <li>Attempt collaboration before conflict.</li>
          <li>Refrain from demeaning, discriminatory, or harassing behavior and speech.</li>
          <li>Be mindful of your surroundings and of your fellow community members. Alert Women and Color if you notice a dangerous situation, someone in distress, or violations of this Code of Conduct, even if they seem inconsequential.</li>
          <li>Be understanding of differences. With diversity, we find strength.</li>
          <li>Participants who engage in a working relationship will treat each other respectfully.</li>
        </ul>
        <h2>3. Unacceptable Behavior</h2>
        <p>The following are examples of behaviors that are considered harassment and are unacceptable within our community:</p>
        <ul>
          <li>Violence, threats of violence or violent language directed against another person or entity; </li>
          <li>Sexist, racist, homophobic, transphobic, ableist or otherwise discriminatory jokes or language; </li>
          <li>Posting or displaying sexually explicit or violent material; </li>
          <li>Posting or threatening to post other people’s personally identifying information (“doxing”);</li>
          <li>Personal insults, particularly those related to gender, sexual orientation, race, religion, or disability;</li>
          <li>Advocating for, or encouraging, any of the above behavior.</li>
        </ul>
        <h2>4. Consequences of Unacceptable Behavior</h2>
        <p>Unacceptable behavior from any community member, including sponsors and those with decision-making authority, will not be tolerated. Anyone asked to stop unacceptable behavior is expected to comply immediately and is expected to adhere to Community Guidelines in all future interactions with our community. Failure to do so may result in a temporary ban or permanent expulsion, without further notice.</p>
        <h2>5. Reporting Guidelines</h2>
        <p>If you are subject to or witness unacceptable behavior, or have any other concerns, please notify a community organizer as soon as possible at hello@womenandcolor. Read our full Reporting Guide below.</p>
        <h2>6. Scope</h2>
        <p>We expect all community members (including, but not limited to, paid contributors, volunteer contributors, sponsors, or other guests) to abide by this Code of Conduct in all community interactions, both online and in-person.</p>
        <p>This Code of Conduct and its related policies and procedures also applies to unacceptable behavior occurring outside the scope of community activities when such behavior has the potential to adversely affect the safety and well-being of community members.</p>
        <p>Women and Color reserves the right to remove any profiles that violate our terms of use.</p>
        <h2>7. Contact Info</h2>
        <p>hello@womenandcolor.com</p>
        <h2>8. License & Attribution</h2>
        <p>This Code of Conduct is distributed under a <a href="https://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike license.</a></p>
        <p>Portions of this Code of Conduct derived from the <a href="https://www.djangoproject.com/conduct/">Django Code of Conduct</a> and the <a href="http://geekfeminism.wikia.com/wiki/Conference_anti-harassment/Policy">Geek Feminism Anti-Harassment Policy.</a></p>
        <h2>9. Women and Color’s Code of Conduct - Reporting Guide</h2>
        <p>If you believe someone is violating the code of conduct we ask that you report it to the Women and Color team by emailing hello@womenandcolor.com. We will make every reasonable effort to keep your report confidential.</p>
        <p>In the event it is determined we need to address the matter publicly, we will attempt to maintain the confidentiality of all parties involved unless those individuals instruct us otherwise.</p>
        <p>If you are unsure whether the incident is a violation, we encourage you to still report it! We strive to provide a safe environment and rather have a few extra reports where we decide to take no action, rather than miss a report of an actual violation. We do not look negatively on you if we find the incident is not a violation. Utilizing these reports, we can improve on our Code of Conduct and continue to provide the Women and Color Community with the best possible environment.</p>
        <h2>When making a report, please include the following:</h2>
        <ul>
          <li> Contact Information;</li>
          <li>Names (real, nicknames, or pseudonyms) of all individuals involved. If there were other witnesses besides you, please try to include them as well;</li>
          <li>Specific details surrounding the incident, including when and where the incident occurred;</li>
          <li>If there is a publicly available record (e.g. a mailing list archive or a public IRC logger) please include a link.</li>
          <li>Any relevant information related to the incident;</li>
          <li>If you believe this incident is ongoing.</li>
          <li>Any other information you believe we should have.</li>
        </ul>
        <h2>What happens after you file a report?</h2>
        <p>You will receive an email from Women and Color with an acknowledgment receipt. Once we have a complete account of the events we will make a decision as to how to respond.</p>
        <p>Once we’ve determined our final action, we’ll contact the original reporter to let them know what action (if any) we’ll be taking.</p>
      </Grid>
    </Grid>
  )
}

export default CodeOfConduct;