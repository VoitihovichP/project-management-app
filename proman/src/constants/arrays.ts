import { TeamMemberProps } from './../components/TeamMemberCard/TeamMemberCard';
import { injectIntl, FormattedMessage } from 'react-intl';

export const teamMember: Array<TeamMemberProps> = [
  {
    name: 'Павел Войтехович',
    description:
      'Описание будет добавлено по завершению работы над проектом, а пока что этот текст для примера',
    github_login: 'VoitihovichP',
    github_url: 'https://github.com/VoitihovichP',
  },
  {
    name: 'Сергей Козловский',
    description:
      'Описание будет добавлено по завершению работы над проектом, а пока что этот текст для примера',
    github_login: 'SergeyKozlovskiy',
    github_url: 'https://github.com/SergeyKozlovskiy',
  },
  {
    name: 'Тимур Щербина',
    description:
      'Описание будет добавлено по завершению работы над проектом, а пока что этот текст для примера',
    github_login: 'Stellarator85',
    github_url: 'https://github.com/Stellarator85',
  },
];
