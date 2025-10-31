import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/Images/logo.png";
import user_icon from "../../assets/Images/user_icon.png";
import { Layout, Menu, message } from "antd";
import styles from "./Dashboard.module.css";
import Bottom_arrow_icon from "../../assets/Icons/bottom_arrow_icon";
import OverviewIcon from "../../assets/Icons/overviewIcon";
import ProductsIcon from "../../assets/Icons/ProductsIcon";
import OrdersIcons from "../../assets/Icons/ordersIcons";
import UsersIcons from "../../assets/Icons/usersIcons";
import PaymentsIcon from "../../assets/Icons/PaymentsIcon";
import SettingsIcon from "../../assets/Icons/SettingsIcon";
import OverviewComponent from "../OverviewComponent";
import ProductsComponent from "../ProductsComponent";
import OrdersComponent from "../OredrsComponent";
import UsersComponent from "../UsersComponent";
import PaymentsComponent from "../PaymentsComponents";
import AddProductPage from "../AddProductPage";
import { useGetUserProfileQuery } from "../../api/authApi";
import ProfileSettings from "../SettingsComponent";
import LogoutIcon from "../../assets/Icons/logoutIcon";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../api/authApi";
import { clearToken } from "../../store/authSlice";
const { Header, Content, Sider } = Layout;

const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thick",
  scrollbarColor: "unset",
};
const Dashboard = () => {
  const [selectedKey, setSelectedKey] = useState("overview");

  const { data: userProfile, error } = useGetUserProfileQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  

  const handleLogout = async () => {
    try {
      await logout().unwrap(); // Call the logout API
      dispatch(clearToken()); // Clear token from redux state
      sessionStorage.clear(); // Clear all session storage
      navigate("/login"); // Redirect to login page
      message.success("Successfully logged out!");
    } catch (error) {
      message.error("Failed to log out.");
    }
  };


  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef()

  const handleMouseEnter = () => setIsOpen(true);
  useEffect(() => {
    // Add event listener to detect clicks outside the dropdown to close it
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const items = [
    {
      key: "overview",
      icon: (
        <OverviewIcon color={selectedKey === "overview" ? "#fff" : "#1C274C"} />
      ),
      label: "Overview",
    },
    {
      key: "products",
      icon: (
        <ProductsIcon color={selectedKey === "products" ? "#fff" : "#1C274C"} />
      ),
      label: "Products",
    },
    {
      key: "orders",
      icon: (
        <OrdersIcons color={selectedKey === "orders" ? "#fff" : "#1C274C"} />
      ),
      label: "Orders",
    },
    // {
    //   key: "users",
    //   icon: <UsersIcons color={selectedKey === "users" ? "#fff" : "#1C274C"} />,
    //   label: "Users",
    // },
    {
      key: "payments",
      icon: (
        <PaymentsIcon color={selectedKey === "payments" ? "#fff" : "#1C274C"} />
      ),
      label: "Payments",
    },
    {
      key: "settings",
      icon: (
        <SettingsIcon color={selectedKey === "settings" ? "#fff" : "#1C274C"} />
      ),
      label: "Settings",
    },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case "overview":
        return <OverviewComponent />;
      case "products":
        return <ProductsComponent onAddProduct={() => setSelectedKey("add_product")} />;
      case "orders":
        return <OrdersComponent />;
      case "users":
        return <UsersComponent />;
      case "payments":
        return <PaymentsComponent />;
      case "settings":
        return <ProfileSettings />;
      case "add_product":
        return <AddProductPage />;
      default:
        return <OverviewComponent />;
    }
  };

  return (
    <Layout hasSider>
      <Sider style={siderStyle} className={styles.sider}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" />
        </div>
        <Menu
          className={styles.menu}
          mode="inline"
          defaultSelectedKeys={["overview"]}
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          items={items}
        />
      </Sider>

      <Layout
        style={{
          marginInlineStart: 250,
        }}
        className={styles.antLayout}
      >
        <Header className={styles.header}>
          <div className={styles.header_wrapper}>
            <div className={styles.name}>
              <h2>Hi,</h2>
              <h3>Good Morning {userProfile?.firstName}!</h3>
            </div>
            <div className={styles.profile_name}>
              <div className={styles.user_icon}>
                <img src={user_icon} alt="user icon" />
              </div>
              <h3>
                {userProfile?.firstName} {userProfile?.lastName}
              </h3>
              <div
                onMouseEnter={handleMouseEnter}
                ref={menuRef}
                style={{
                  position: "relative",
                  display: "inline-block",
                  cursor: "pointer",
                }}
              >
                <Bottom_arrow_icon />
                {isOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      backgroundColor: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      padding: "8px",
                      zIndex: 10,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "8px",
                        gap: "10px",
                      }}
                      onClick={handleLogout}
                    >
                      <LogoutIcon style={{ marginRight: "8px" }} />
                      <span>Logout</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Header>
        <Content>
          <div
            style={{
              marginLeft: "20px",
              padding: "20px",
              flex: 1,
            }}
          >
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
