import { SignInForm } from '../../components/SignInForm/SignInForm';
import { SignUpForm } from '../../components/SignUpForm/SignUpForm';
import './authorizationPage.scss';

export const AuthorizationPage: React.FC = () => {
  return (
    <div className="authrization-page">
      <SignUpForm />
      {/* <SignInForm /> */}
    </div>
  );
};
