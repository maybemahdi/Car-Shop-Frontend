import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import MyFormWrapper from '../../ui/MyForm/MyFormWrapper/MyFormWrapper';
import MyFormInput from '../../ui/MyForm/MyFormInput/MyFormInput';
// import MyFormCheckbox from '../../ui/MyForm/MyFormCheckbox/MyFormCheckbox';
import { Link } from 'react-router-dom';
import Button from '../../shared/Button/Button';

const validationSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email address'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, 'Password must be at least 8 characters long'),
});

export default function LoginForm() {
  const handleSubmit = async (formData: SubmitHandler<FieldValues>, reset: () => void) => {
    console.log(formData, reset);
  };
  return (
    <div className="min-h-[calc(100vh-57px)] flex items-center justify-center bg-transparent">
      <div className="w-full max-w-lg space-y-8 p-2 xs:p-6">
        <div className="text-center space-y-2">
          <h1 className="text-xl md:text-3xl font-bold tracking-tight text-primary">
            Log in to your account
          </h1>
          <p className="text-gray-600">
            Welcome back! Please enter your details.
          </p>
        </div>

        <div className="bg-white p-3 xs:p-6 rounded-lg shadow-sm border border-gray-100">
          <MyFormWrapper
            onSubmit={handleSubmit}
            resolver={zodResolver(validationSchema)}
            className="flex flex-col gap-5"
          >
            <div className="w-full">
              <MyFormInput
                name={'email'}
                label="Email"
                placeHolder="Enter your email"
                inputClassName='border hover:border-primary focus:border-primary bg-white py-3'
              />
            </div>
            <div className="w-full">
              <MyFormInput
                name={'password'}
                label="Password"
                placeHolder="Enter your Password"
                type="password"
                inputClassName='border hover:border-primary focus:border-primary py-3'
              />
            </div>
            {/* <div className="w-full flex gap-1 items-center justify-between">
              <MyFormCheckbox name="remember" label="Remember for 30 days" checkboxClassName='text-primary' />
              <Link to={"/auth/forgot-password"} className="text-primary cursor-pointer">Forgot password</Link>
            </div> */}
            <Button text='Sign in' />
          </MyFormWrapper>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?
          <Link
            to="/register"
            className="font-medium text-primary hover:text-primary ms-1"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}