import React, { FC } from 'react';
import './welcome.scss';
import { WelcomePageText } from '../../types/enums';
// import { teamMember } from '../../constants/arrays';
import TeamMemberCard from '../../components/TeamMemberCard/TeamMemberCard';
import { TeamMemberProps } from '../../components/TeamMemberCard/TeamMemberCard';

import { injectIntl } from 'react-intl';

const Welcome: FC = injectIntl(({ intl }) => {
  const teamMembersInfo: Array<TeamMemberProps> = [
    {
      name: intl.formatMessage({ id: 'PAVEL_FULL_NAME' }),
      description: intl.formatMessage({ id: 'PAVEL_TASKS' }),
      github_login: intl.formatMessage({ id: 'PAVEL_GITHUB_LOGIN' }),
      github_url: intl.formatMessage({ id: 'PAVEL_GITHUB_URL' }),
    },
    {
      name: intl.formatMessage({ id: 'SERGEY_FULL_NAME' }),
      description: intl.formatMessage({ id: 'SERGEY_TASKS' }),
      github_login: intl.formatMessage({ id: 'SERGEY_GITHUB_LOGIN' }),
      github_url: intl.formatMessage({ id: 'SERGEY_GITHUB_URL' }),
    },
    {
      name: intl.formatMessage({ id: 'TIMUR_FULL_NAME' }),
      description: intl.formatMessage({ id: 'TIMUR_TASKS' }),
      github_login: intl.formatMessage({ id: 'TIMUR_GITHUB_LOGIN' }),
      github_url: intl.formatMessage({ id: 'TIMUR_GITHUB_URL' }),
    },
  ];
  return (
    <main className="welcome-page">
      <div className="welcome-page__main-info">
        <div className="welcome-page__poster"></div>
        <div className="welcome-page__text">
          <h1 className="welcome-page__greeting">
            {intl.formatMessage({ id: 'MAIN_GREETING_1' })} <span>{WelcomePageText.APP_TITLE}</span>
            {intl.formatMessage({ id: 'MAIN_GREETING_2' })}
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
          {teamMembersInfo.map((item, index) => {
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
