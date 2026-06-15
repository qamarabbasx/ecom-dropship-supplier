import { clearToken, setToken } from "../store/authSlice";
import { authApi } from "../api/authApi";
import { productApi } from "../api/productApi";

export const AUTH_LOGGED_OUT_KEY = "auth_logged_out";

/** Sync verify cache after login so bootstrap does not clear a fresh token. */
export function hydrateVerifyUser(dispatch, user, token) {
  dispatch(
    authApi.util.upsertQueryData("verifyUser", undefined, {
      ...user,
      token,
    })
  );
}

/** Apply login response to Redux + session; token lives on result.user.token from API. */
export function completeLoginSession(dispatch, result, email) {
  const user = result?.user;
  const authToken = user?.token || result?.token || "session";

  sessionStorage.removeItem(AUTH_LOGGED_OUT_KEY);
  dispatch(setToken(authToken));

  if (user) {
    hydrateVerifyUser(dispatch, user, authToken);
  }

  if (email) {
    sessionStorage.setItem("user", email);
  }

  return { user, authToken };
}

export async function performLogout({ dispatch, navigate, logoutMutation }) {
  dispatch(clearToken());
  sessionStorage.setItem(AUTH_LOGGED_OUT_KEY, "1");
  sessionStorage.removeItem("user");
  dispatch(authApi.util.resetApiState());
  dispatch(productApi.util.resetApiState());
  navigate("/login", { replace: true });

  try {
    await logoutMutation().unwrap();
  } catch {
    // fail-open: local teardown already applied (D-14)
  }
}
