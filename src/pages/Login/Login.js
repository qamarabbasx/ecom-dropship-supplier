import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logo from "../../assets/Images/logo.png";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { useLoginMutation } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/authSlice";
import { message } from "antd";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const userCredentials = { email: username, password };
      const result = await login(userCredentials).unwrap();
      console.log('\n\n result \n\n', result);
      if (result && (result.user.role === 'SUPPLIER')) {
        console.log('\n\n result \n\n', result);
        dispatch(setToken(result.token));
        sessionStorage.setItem("user", username);
        navigate("/dashboard");
      } else {
        message.error("Unauthorized user role");
      }
    } catch (err) {
      console.log('\n\n err \n\n', err);
      message.error("Login failed: " + (err.data?.message || err.message));
    }
  };

  return (
    <div className="page-width">
      <div className={styles.loginPageWrapper}>
        <div className={styles.leftContainer}>
          <div className={`${styles.InnerContainer}`}>
            <h2 className={`${styles.mainHeading}`}>
              Seamless Dropshipping Awaits
            </h2>
            <h3 className={`${styles.mainSubHeading}`}>
              Continue managing your dropshipping business with ease
            </h3>
          </div>
        </div>
        <div className={`${styles.rightContainer}`}>
          <div className={styles.logoWrapper}>
            <img src={logo} alt="LOGO" />
          </div>
          <div className={`${styles.loginContainer} text-center`}>
            <div>
              <h2>Sign in</h2>
              <p>Use your LADD account Credentials to access the application</p>
            </div>
            <div className={styles.inputWrapper}>
              <label>Email</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.loginInput}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.loginInput}
              />
            </div>
            <div className={styles.btnWrapper}>
              <a href="#">Forgot Password?</a>
              <button
                onClick={handleLogin}
                className={`${styles.loginButton} mt-20`}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
