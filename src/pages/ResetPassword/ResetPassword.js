import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ResetPassword.module.css";
import logo from "../../assets/Images/logo.png";
import { useResetPasswordMutation } from "../../api/authApi";
import { message } from "antd";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      message.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      message.error("Password must be at least 6 characters");
      return;
    }

    try {
      await resetPassword({ token, newPassword: password }).unwrap();
      message.success("Password updated successfully!");
      // Navigate to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      message.error(err.data?.message || "Failed to reset password");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
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
              If you've forgotten your account password, enter your email below.
            </h3>
          </div>
        </div>
        <div className={`${styles.rightContainer}`}>
          <div className={styles.logoWrapper}>
            <img src={logo} alt="LOGO" />
          </div>
          <div className={`${styles.loginContainer} text-center`}>
            <div>
              <h2>Enter New Password</h2>
              <p>
                Set the new password for your account so you can login and
                access all features.
              </p>
            </div>
            <div className={styles.inputWrapper}>
              <label>Enter New Password</label>
              <input
                type="password"
                style={{ width: "100%" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
                className={styles.loginInput}
                placeholder="Enter new password"
              />
            </div>
            <div className={styles.inputWrapper}>
              <label>Confirm Password</label>
              <input
                type="password"
                style={{ width: "100%" }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={handleKeyPress}
                className={styles.loginInput}
                placeholder="Confirm password"
              />
            </div>
            <div className={styles.btnWrapper}>
              <button
                onClick={handleSubmit}
                className={`${styles.loginButton} mt-20`}
                disabled={isLoading}
                aria-busy={isLoading}
                aria-disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </div>
            <a
              style={{ marginTop: "20px" }}
              href="#"
              onClick={handleBackToLogin}
              className={styles.backToLogin}
            >
              Back to login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
