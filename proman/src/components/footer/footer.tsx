import React, { FC } from 'react';
import RsSchoolAvatar from '../../assets/png/rs-school_avatar.png';
import './footer.scss';

const Footer: FC = () => {
  return (
    <footer>
      <a href="https://rs.school/react/" rel="noreferrer" target="_blank">
        <div>
          <img src={RsSchoolAvatar}></img>
          React 2022 Q1
        </div>
      </a>
      <div className="footer_yearmark">© 2022</div>
      <ul>
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
