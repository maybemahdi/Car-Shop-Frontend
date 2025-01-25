import { ScrollRestoration } from 'react-router-dom';
import RegisterForm from '../components/Pages/Register/RegisterForm';

const Register = () => {
  return (
    <div>
      <RegisterForm />
      <ScrollRestoration />
    </div>
  );
};

export default Register;
