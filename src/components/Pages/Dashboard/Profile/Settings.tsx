import { FormEvent } from "react";
import { selectCurrentUser } from "../../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../../redux/hooks";
import Button from "../../../shared/Button/Button";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../../../../redux/features/auth/authApi";

const Settings = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [changePassword] = useChangePasswordMutation();
  const handlePasswordChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const currentPassword = (form as HTMLFormElement).currentPassword.value;
    const newPassword = (form as HTMLFormElement).newPassword.value;
    const payload = {
      currentPassword,
      newPassword,
    };
    const toastId = toast.loading("Changing Password");
    try {
      const response = await changePassword(payload).unwrap();
      if (response?.success) {
        form.reset();
        console.log(response);
        toast.success("Password Changed Successfully", { id: toastId });
      } else {
        form.reset();
        toast.error(response?.message, { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      form.reset();
      toast.error(error?.message || "Something went wrong", { id: toastId });
      console.error("Error submitting", error);
    }
  };
  return (
    <form onSubmit={handlePasswordChange} className="mx-auto mb-0 space-y-4">
      <div>
        <div className="relative">
          <label className="text-sm">Current Email</label>
          <input
            disabled
            placeholder="Current Email"
            className="w-full bg-slate-200 text-gray-500 rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mt-2"
            type="email"
            value={currentUser?.email}
            data-temp-mail-org="0"
          />
        </div>
        <div className="relative mt-2">
          <label className="text-sm">Current Password</label>
          <input
            placeholder="Current Password"
            className="w-full bg-slate-200 rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mt-2"
            name="currentPassword"
            type="password"
            required
          />
        </div>
      </div>
      <div>
        <div className="relative">
          <label className="text-sm">New Password</label>
          <input
            placeholder="New Password"
            className="w-full bg-slate-200 rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mt-2"
            name="newPassword"
            type="password"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 items-center justify-between">
        <Button text="Change Password" isFullWidth={true} />
      </div>
    </form>
  );
};

export default Settings;
