import React, { FC } from 'react';
import './footer.scss';
import RsSchoolLogo from '../../assets/svg/rs-school-logo_inverted.svg';
import GitHubLogo from '../../assets/svg/github-logo.svg';

const Footer: FC = () => {
  return (
    <footer className="footer">
      <a href="https://rs.school/react/" rel="noreferrer" target="_blank">
        <div className="footer_rss-logo-block">
          <img
            src={RsSchoolLogo}
            alt="Rolling Scopes School"
            className="footer_rss-logo-block_image"
            id="RS-School"
          ></img>
          <label htmlFor="RS-School" className="footer_rss-logo-block_label">
            React 2022 Q1
          </label>
        </div>
      </a>
      <span className="footer_yearmark-label">© 2022</span>
      <ul className="footer_github-block">
        <a href="https://github.com/SergeyKozlovskiy" rel="noreferrer" target="_blank">
          <li className="footer_github-block_item">
            <img
              src={GitHubLogo}
              alt="Sergey Kozlovskiy GitHub"
              className="footer_github-block_item_image"
              id="SergeyKozlovskiy"
            ></img>
            <label htmlFor="SergeyKozlovskiyl" className="footer_github-block_item_label">
              SergeyKozlovskiy
            </label>
          </li>
        </a>
        <a href="https://github.com/VoitihovichP" rel="noreferrer" target="_blank">
          <li className="footer_github-block_item">
            <img
              src={GitHubLogo}
              alt="Pavel Voitihovich GitHub"
              className="footer_github-block_item_image"
              id="VoitihovichP"
            ></img>
            <label htmlFor="VoitihovichP" className="footer_github-block_item_label">
              VoitihovichP
            </label>
          </li>
        </a>
        <a href="https://github.com/Stellarator85" rel="noreferrer" target="_blank">
          <li className="footer_github-block_item">
            <img
              src={GitHubLogo}
              alt="Tymur Shcherbyna GitHub"
              className="footer_github-block_item_image"
              id="Stellarator85"
            ></img>
            <label htmlFor="Stellarator85" className="footer_github-block_item_label">
              Stellarator85
            </label>
          </li>
        </a>
      </ul>
    </footer>
  );
};

export default Footer;
