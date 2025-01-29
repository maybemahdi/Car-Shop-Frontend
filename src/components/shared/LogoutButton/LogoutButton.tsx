import logoutIcon from "../../../assets/icons/logout.png";
import { toast } from "sonner";
import { useAppDispatch } from "../../../redux/hooks";
import { logout } from "../../../redux/features/auth/authSlice";

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    dispatch(logout());
    toast.success("Log Out Successful");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 hover:bg-gray-300 w-full py-4 px-6 rounded-lg transition-colors duration-200"
    >
      <img src={logoutIcon} width={22} height={22} alt="logout" />
      <span>Log Out</span>
    </button>
  );
};

export default LogoutButton;
