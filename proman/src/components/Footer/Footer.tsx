import React, { FC } from 'react';
import './footer.scss';
import RsSchoolLogo from '../../assets/svg/rs-school-logo_inverted-cropped.svg';
import GitHubLogo from '../../assets/svg/github-logo.svg';
import { teamMember } from '../../constants/arrays';

const Footer: FC = () => {
  return (
    <footer className="footer">
      <a
        href="https://rs.school/react/"
        rel="noreferrer"
        target="_blank"
        className="footer__rss-link"
      >
        <img
          src={RsSchoolLogo}
          alt="Rolling Scopes School"
          className="footer_rss-logo-block_image"
          id="RS-School"
        />
      </a>
      <span className="footer_yearmark-label">© 2022</span>
      <ul className="footer_github-block">
        {teamMember.map((item) => {
          const { github_login, github_url } = item;
          return (
            <li className="footer_github-block_item" key={github_login}>
              <a href={github_url} rel="noreferrer" target="_blank" className="footer_github-link">
                <img
                  src={GitHubLogo}
                  alt={`${github_login} Github`}
                  className="footer_github-block_item_image"
                  id={github_login}
                />
                <label htmlFor={github_login} className="footer_github-block_item_label">
                  {github_login}
                </label>
              </a>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default Footer;
