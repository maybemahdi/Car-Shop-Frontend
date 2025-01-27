import { useEffect, useRef, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import menuItems from "../../../data/menuItems"; // assuming you have a menuItems data file
// import Headroom from 'react-headroom';
import logo from "../../../assets/icons/logo.png";
import { cn } from "../../../lib/utils";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  logout,
  selectCurrentToken,
} from "../../../redux/features/auth/authSlice";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { toast } from "sonner";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpened, setIsNavOpened] = useState(false);
  const location = useLocation();
  const isLoggedIn = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Listen to scroll events
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: !isScrolled ? -20 : 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={cn(
        "flex justify-between items-center py-4 md:py-8 mx-auto z-[100] bg-transparent fixed top-0 w-full md:h-[100px] text-white",
        {
          "bg-gray-800 shadow-md":
            isScrolled ||
            (location.pathname !== "/" && location.pathname !== "/about"),
        }
      )}
    >
      <div className="w-[90%] md:w-[88%] mx-auto flex justify-between">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <Link to="/" className="font-semibold text-primary text-xl">
            <img src={logo} alt="carz" className="h-11 w-full object-cover" />
          </Link>
        </div>

        {/* Menu links for large devices */}
        <div className="hidden lg:flex items-center justify-center gap-12 font-questrial text-para text-[14px] font-normal bg-primary px-12 py-3 rounded-full transition-transform duration-300">
          {menuItems.map((menu, idx) => {
            const isActive = location.pathname === menu.path;
            return (
              <Link
                key={idx}
                to={menu.path}
                className={`${
                  isActive ? "text-gray-800" : "text-para"
                } hover:text-gray-800 transition-all duration-300`}
              >
                {menu.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Login and Button */}
        <div className="hidden lg:flex items-center gap-8">
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="text-para hover:text-primary transition-all duration-300"
            >
              Login
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded-full transition-colors"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <div className="h-10 w-10 rounded-full border overflow-hidden bg-gray-100">
                  <img
                    height={100}
                    width={100}
                    src="/placeholder.svg?height=32&width=32"
                    alt="User avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <MdKeyboardArrowDown className="h-5 w-5 text-gray-600" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20">
                  <div
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-3 mx-3 border-b border-dashed cursor-pointer"
                  >
                    <div className="h-10 w-10 rounded-full border overflow-hidden bg-gray-100">
                      <img
                        height={100}
                        width={100}
                        src="/placeholder.svg?height=32&width=32"
                        alt="User avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium">Martin De</h3>
                  </div>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FiUser className="h-4 w-4 text-main" />
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      dispatch(logout());
                      toast.success("Log out Successful");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <BiLogOut className="h-4 w-4 text-main" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile menu bar */}
          <div
            data-aos="zoom-in"
            className="flex lg:hidden items-center gap-3 md:gap-8 font-questrial text-[14px] font-normal text-gray-800"
          >
            {isNavOpened ? (
              <IoClose
                className="text-primary"
                onClick={() => setIsNavOpened(!isNavOpened)}
                size={32}
              />
            ) : (
              <IoMenu
                className="text-primary"
                onClick={() => setIsNavOpened(!isNavOpened)}
                size={32}
              />
            )}
          </div>

          {/* Mobile menu */}
          <div
            className={`fixed top-0 left-0 h-[calc(100vh+72px)] bg-gray-800 shadow-lg z-40 transform transition-all duration-500 ease-in-out ${
              isNavOpened
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
            style={{ width: "80%" }}
          >
            <div
              data-aos="zoom-in"
              className="flex flex-col items-start gap-6 px-6 py-5"
            >
              <Link to="/" className="font-semibold text-white text-xl">
                CarZ
              </Link>
              <div className="mt-2 md:mt-8 flex flex-col gap-4">
                {menuItems.map((menu, idx) => {
                  const isActive = location.pathname === menu.path;
                  return (
                    <Link
                      key={idx}
                      to={menu.path}
                      onClick={() => setIsNavOpened(!isNavOpened)}
                      className={`${
                        isActive ? "border-b-2 border-primary" : ""
                      } text-[16px] text-white`}
                    >
                      {menu.name}
                    </Link>
                  );
                })}
                <Link to="/login" className="w-full text-white">
                  Login
                </Link>
              </div>
              {/* <div className="flex flex-col items-center justify-start gap-2"></div> */}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
