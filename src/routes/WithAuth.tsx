import { useState, useEffect } from "react";

import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import Loading from "../components/shared/Loading/Loading";

const WithAuth = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state
  const token = useAppSelector(selectCurrentToken);

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect if not authenticated
    } else {
      setLoading(false); // Stop loading once authenticated
    }
  }, [token, navigate]);

  if (loading) {
    return <Loading />; // Prevent rendering anything while loading
  }

  return children; // Render the children if authenticated
};

export default WithAuth;
