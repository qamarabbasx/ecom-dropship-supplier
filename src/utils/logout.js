import { clearToken } from "../store/authSlice";
import { authApi } from "../api/authApi";
import { productApi } from "../api/productApi";

export const AUTH_LOGGED_OUT_KEY = "auth_logged_out";

export function hydrateVerifyUser(dispatch, user, token) {
  dispatch(
    authApi.util.upsertQueryData("verifyUser", undefined, {
      ...user,
      token,
    })
  );
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
