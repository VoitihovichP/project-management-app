import React, { FC } from 'react';
import './footer.scss';

/* const Footer: FC = () => {
  return (
    <footer>
      <a href="https://rs.school/react/" rel="noreferrer" target="_blank">
        <div>React 2022 Q1</div>
      </a>
      <div>© 2022</div>
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
}; */

const Footer: FC = () => {
  return (
    <footer>
      <a href="https://rs.school/react/" rel="noreferrer" target="_blank">
        <div>
          <img src="https://cdn.discordapp.com/icons/794806036506607647/23adbdd5c06bbe67f2256d7c045dd4f9.webp"></img>
          React 2022 Q1
        </div>
      </a>
      <div>© 2022</div>
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
