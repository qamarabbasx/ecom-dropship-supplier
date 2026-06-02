jest.mock("../api/authApi", () => ({
  authApi: { util: { resetApiState: jest.fn(() => ({ type: "authApi/reset" })) } },
}));
jest.mock("../api/productApi", () => ({
  productApi: { util: { resetApiState: jest.fn(() => ({ type: "productApi/reset" })) } },
}));
jest.mock("../store/authSlice", () => ({
  clearToken: jest.fn(() => ({ type: "auth/clearToken" })),
}));

import { performLogout } from "./logout";
import { clearToken } from "../store/authSlice";
import { authApi } from "../api/authApi";
import { productApi } from "../api/productApi";

describe("performLogout", () => {
  beforeEach(() => {
    sessionStorage.clear();
    sessionStorage.setItem("user", "supplier@test.com");
  });

  it("clears auth, resets RTK caches, storage, and navigates to login", async () => {
    const dispatch = jest.fn();
    const navigate = jest.fn();
    const logoutMutation = jest.fn(() => ({
      unwrap: () => Promise.resolve({ message: "successfully logout" }),
    }));

    await performLogout({ dispatch, navigate, logoutMutation });

    expect(logoutMutation).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearToken());
    expect(dispatch).toHaveBeenCalledWith(authApi.util.resetApiState());
    expect(dispatch).toHaveBeenCalledWith(productApi.util.resetApiState());
    expect(sessionStorage.getItem("user")).toBeNull();
    expect(navigate).toHaveBeenCalledWith("/login");
  });
});
