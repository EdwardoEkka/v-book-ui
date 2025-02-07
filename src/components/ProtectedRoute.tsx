import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { RootState } from "../store/store";
import { setUserDetails, setIsAuthenticated } from "../store/auth";
import { authenticateUser } from "../api/api";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const authenticateUserHere = async () => {
      try {
        const response = await authenticateUser();
        dispatch(setUserDetails(response.data.user));
        dispatch(setIsAuthenticated(true));
      } catch (error) {
        console.log("Authentication failed:", error);
        dispatch(setIsAuthenticated(false));
      } finally {
        setLoading(false); // End loading state
      }
    };

    if (!isAuthenticated) {
      authenticateUserHere(); // Authenticate if not already authenticated
    } else {
      setLoading(false); // Skip authentication if already authenticated
    }
  }, [dispatch, isAuthenticated]);

  // Show loading state while authentication is being checked
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to the sign-in page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  // Render the nested routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;
