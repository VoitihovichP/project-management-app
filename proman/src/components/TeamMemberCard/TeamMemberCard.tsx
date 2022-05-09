import React, { FC } from 'react';
import './teamMemberCard.scss';
import MemberIcon from '../../assets/svg/member-icon.svg';
import GHLogo from '../../assets/svg/gh-logo.svg';

export type TeamMemberProps = {
  name: string;
  description: string;
  github_login: string;
  github_url: string;
};

const TeamMemberCard: FC<TeamMemberProps> = ({ name, description, github_login, github_url }) => {
  return (
    <div className="team-card">
      <img src={MemberIcon} alt="member-icon" className="team-card__icon" />
      <h3 className="team-card__name">{name}</h3>
      <p className="team-card__descr">{description}</p>
      <div className="team-card__github">
        <img src={GHLogo} alt="gh-icon" className="team-card__github-icon" />
        <a href={github_url} className="team-card__github-url" target="_blank" rel="noreferrer">
          {github_login}
        </a>
      </div>
    </div>
  );
};

export default TeamMemberCard;
