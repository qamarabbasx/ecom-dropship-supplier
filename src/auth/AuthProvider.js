import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
} from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useVerifyUserQuery } from "../api/authApi";
import { setToken, clearToken } from "../store/authSlice";
import { AUTH_LOGGED_OUT_KEY } from "../utils/logout";

const AuthContext = createContext(null);

const bootstrapSpinner = (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}
  >
    <Spin size="large" />
  </div>
);

export function AuthProvider({ children, allowedRoles }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const sessionLoggedOut =
    sessionStorage.getItem(AUTH_LOGGED_OUT_KEY) === "1";
  const skipVerify = sessionLoggedOut || Boolean(token);

  const {
    data: user,
    isUninitialized,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useVerifyUserQuery(undefined, { skip: skipVerify });

  const hasValidVerify =
    !sessionLoggedOut &&
    isSuccess &&
    user &&
    allowedRoles.includes(user.role);

  const isAuthenticated =
    !sessionLoggedOut && (Boolean(token) || hasValidVerify);

  const isBootstrapping =
    !sessionLoggedOut &&
    !isAuthenticated &&
    (isUninitialized || isLoading || isFetching);

  useLayoutEffect(() => {
    if (sessionLoggedOut || token) return;
    if (isUninitialized || isLoading || isFetching) return;
    if (hasValidVerify) {
      dispatch(setToken(user.token || "session"));
      if (user.email) {
        sessionStorage.setItem("user", user.email);
      }
    } else if (isError) {
      dispatch(clearToken());
      sessionStorage.removeItem("user");
    }
  }, [
    sessionLoggedOut,
    token,
    isUninitialized,
    isLoading,
    isFetching,
    hasValidVerify,
    isError,
    user,
    dispatch,
  ]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      isBootstrapping,
      sessionLoggedOut,
    }),
    [isAuthenticated, isBootstrapping, sessionLoggedOut]
  );

  if (isBootstrapping) {
    return bootstrapSpinner;
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
