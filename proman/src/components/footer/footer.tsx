import React, { FC } from 'react';
import './footer.scss';

const Footer: FC = () => {
  return (
    <footer className="footer">
      <a href="https://rs.school/react/" rel="noreferrer" target="_blank">
        {/* <div>
          <img src={RsSchoolLogo}></img>
          React 2022 Q1
  </div> */}
        <div className="footer_rss-logo-block">React 2022 Q1</div>
      </a>
      <div className="footer_yearmark-block">© 2022</div>
      <ul className="footer_github-block">
        <a href="https://github.com/SergeyKozlovskiy" rel="noreferrer" target="_blank">
          <li>SergeyKozlovskiy</li>
        </a>
        <a href="https://github.com/VoitihovichP" rel="noreferrer" target="_blank">
          <li>VoitihovichP</li>
        </a>
        <a href="https://github.com/Stellarator85" rel="noreferrer" target="_blank">
          <li>Stellarator85</li>
        </a>
      </ul>
    </footer>
  );
};

export default Footer;
