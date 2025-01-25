import { ScrollRestoration } from 'react-router-dom';
import LoginForm from '../components/Pages/Login/LoginForm';

const Login = () => {
  return (
    <div>
      <LoginForm />
      <ScrollRestoration />
    </div>
  );
};

export default Login;
