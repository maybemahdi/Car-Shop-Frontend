/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MyFormWrapper from "../../ui/MyForm/MyFormWrapper/MyFormWrapper";
import MyFormInput from "../../ui/MyForm/MyFormInput/MyFormInput";
// import MyFormCheckbox from '../../ui/MyForm/MyFormCheckbox/MyFormCheckbox';
import { Link, useNavigate } from "react-router-dom";
import Button from "../../shared/Button/Button";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { useAppDispatch } from "../../../redux/hooks";
import { toast } from "sonner";
import { setUser } from "../../../redux/features/auth/authSlice";

const validationSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters long"),
});

type TFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (formData: TFormData, reset: () => void) => {
    const toastId = toast.loading("Logging in your account");
    try {
      const res = await login(formData).unwrap();
      console.log(res);
      if (res.success) {
        toast.success(res.message, { id: toastId });
        reset();
        await dispatch(
          setUser({
            user: {
              id: res.data.id,
              name: res.data.name,
              email: res.data.email,
              role: res.data.role,
            },
            token: res.data.token,
          })
        );
        navigate("/");
      }
    } catch (error: any) {
      if (error?.status === 401) {
        toast.error(error?.data?.message, { id: toastId });
        return;
      }
      toast.error(error?.data?.message || "Something went wrong", { id: toastId });
    }
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
            className="flex flex-col gap-4"
          >
            <div className="w-full">
              <MyFormInput
                name={"email"}
                label="Email"
                placeHolder="Enter your email"
                inputClassName="border hover:border-primary focus:border-primary bg-white py-3"
              />
            </div>
            <div className="w-full">
              <MyFormInput
                name={"password"}
                label="Password"
                placeHolder="Enter your Password"
                type="password"
                inputClassName="border hover:border-primary focus:border-primary py-3"
              />
            </div>
            {/* <div className="w-full flex gap-1 items-center justify-between">
              <MyFormCheckbox name="remember" label="Remember for 30 days" checkboxClassName='text-primary' />
              <Link to={"/auth/forgot-password"} className="text-primary cursor-pointer">Forgot password</Link>
            </div> */}
            <div className="-mt-2 md:mt-0 w-full">
              <Button text="Sign in" isFullWidth={true} />
            </div>
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
