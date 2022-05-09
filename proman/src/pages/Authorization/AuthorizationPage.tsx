import { AuthorizationForm } from '../../components/AuthorizationForm/AuthorizationForm';
import './authorizationPage.scss';

export const AuthorizationPage: React.FC = () => {
  return (
    <div className="authrization-page">
      <AuthorizationForm />
    </div>
  );
};
