import { SignInForm } from '../../components/SignInForm/SignInForm';
import { SignUpForm } from '../../components/SignUpForm/SignUpForm';
import { useAppSelector } from '../../hooks/redux';
import './authorizationPage.scss';

export const AuthorizationPage: React.FC = () => {
  const { isShowSignUp } = useAppSelector((state) => state.formSlice);
  return (
    <main className="authrization-page">{isShowSignUp ? <SignUpForm /> : <SignInForm />}</main>
  );
};
