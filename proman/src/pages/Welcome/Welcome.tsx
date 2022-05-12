import React, { FC } from 'react';
import './welcome.scss';
import { WelcomePageText } from '../../types/enums';
import { teamMember } from '../../constants/arrays';
import TeamMemberCard from '../../components/TeamMemberCard/TeamMemberCard';

const Welcome: FC = () => {
  return (
    <div className="welcome-page">
      <div className="welcome-page__main-info">
        <div className="welcome-page__poster"></div>
        <div className="welcome-page__text">
          <h1 className="welcome-page__greeting">
            {WelcomePageText.GREETING_FIRST_PART} <span>{WelcomePageText.APP_TITLE}</span>!
          </h1>
          <p className="welcome-page__descr">{WelcomePageText.GREETING_SECOND_PART}</p>
        </div>
      </div>
      <div className="welcome-page__team">
        <h2 className="welcome-page__team-subtitle">{WelcomePageText.TEAM_SUBTITLE}</h2>
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
    </div>
  );
};

export default Welcome;
