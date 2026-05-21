import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Login/Login.module.css";
import logo from "../../assets/Images/logo.png";
import { useForgotPasswordMutation } from "../../api/authApi";
import { message } from "antd";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      message.error("Please enter your email");
      return;
    }

    try {
      await forgotPassword({ email }).unwrap();
      message.success("Password reset link sent to your email!");
      // Navigate to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      message.error(err.data?.message || "Failed to send reset link");
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
              <h2>Forget Password</h2>
            </div>
            <div className={`${styles.inputWrapper} mt-20`}>
              <label>Email</label>
              <input
                type="text"
                style={{ width: "100%" }}
                onKeyDown={handleKeyPress}
                className={styles.loginInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.btnWrapper}>
              <button
                className={`${styles.loginButton} mt-10`}
                disabled={isLoading}
                aria-busy={isLoading}
                aria-disabled={isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
            <button
              className="mt-20"
              style={{
                background: "none",
                border: "none",
                color: "#222222",
                cursor: "pointer",
                textDecoration: "none",
              }}
              onClick={handleBackToLogin}
            >
              Back to login?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
