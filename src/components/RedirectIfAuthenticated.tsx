import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";
import {  useDispatch} from "react-redux";
import { setUserDetails, setIsAuthenticated } from "../store/auth";
import { authenticateUser } from "../api/api";

const RedirectIfAuthenticated = ({ children }: { children: ReactElement }) => {
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



  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RedirectIfAuthenticated;
