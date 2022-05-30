import React, { FC } from 'react';
import './welcome.scss';
import { WelcomePageText } from '../../types/enums';
import { teamMember } from '../../constants/arrays';
import TeamMemberCard from '../../components/TeamMemberCard/TeamMemberCard';
import Poster from '../../assets/png/main-poster.png';

import { injectIntl } from 'react-intl';

const Welcome: FC = injectIntl(({ intl }) => {
  return (
    <main className="welcome-page">
      <div className="welcome-page__main-info">
        <img src={Poster} alt="Poster" className="welcome-page__poster" />
        <div className="welcome-page__text">
          <h1 className="welcome-page__greeting">
            {intl.formatMessage({ id: 'MAIN_GREETING' })} <span>{WelcomePageText.APP_TITLE}</span>!
          </h1>
          <p className="welcome-page__descr">
            {intl.formatMessage({ id: 'MAIN_APP_DESCRIPTION_1' })}
          </p>
        </div>
      </div>
      <div className="welcome-page__team">
        <h2 className="welcome-page__team-subtitle">
          {intl.formatMessage({ id: 'MAIN_APP_DESCRIPTION_2' })}
        </h2>
        <div className="welcome-page__team-wrapper">
          {teamMember.map((item, index) => {
            const { name, description, github_login, github_url } = item;
            return (
              <TeamMemberCard
                key={`${github_login}_${index}`}
                name={name}
                description={description}
                github_login={github_login}
                github_url={github_url}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
});

export default Welcome;
