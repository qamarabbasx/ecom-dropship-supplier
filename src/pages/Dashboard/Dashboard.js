/* eslint-disable react/jsx-pascal-case */
import React, { useState, useRef, useEffect } from "react";
import { Drawer, Button } from "antd";
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
import WarehouseIcon from "../../assets/Icons/WarehouseIcon";
import OverviewComponent from "../OverviewComponent";
import ProductsComponent from "../ProductsComponent";
import OrdersComponent from "../OredrsComponent";
import UsersComponent from "../UsersComponent";
import PaymentsComponent from "../PaymentsComponents";
import WarehouseComponent from "../WarehouseComponent";
import AddProductPage from "../AddProductPage";
import AddOrderPage from "../AddOrderPage";
import ViewOrderPage from "../ViewOrderPage";
import UserForm from "../UsersComponent/UserForm";
import InvoiceDetail from "../Invoice";
import { useGetUserProfileQuery } from "../../api/authApi";
import ProfileSettings from "../SettingsComponent";
import LogoutIcon from "../../assets/Icons/logoutIcon";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../api/authApi";
import { performLogout } from "../../utils/logout";
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
  // Responsive state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("overview");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrderData, setSelectedOrderData] = useState(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [isEditOrder, setIsEditOrder] = useState(false);

  // Set selectedKey from navigation state if present
  React.useEffect(() => {
    if (location.state && location.state.selectedKey) {
      setSelectedKey(location.state.selectedKey);
      if (location.state.orderData) {
        setSelectedOrderData(location.state.orderData);
      }
      if (location.state.invoiceId) {
        setSelectedInvoiceId(location.state.invoiceId);
      }
    }
  }, [location.state]);

  const { data: userProfile } = useGetUserProfileQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await performLogout({ dispatch, navigate, logoutMutation: logout });
      message.success("Successfully logged out!");
    } catch (error) {
      message.error("Failed to log out.");
    }
  };

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

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
        return <ProductsComponent onAddProduct={(product) => {
          setSelectedProduct(product || null);
          setSelectedKey("add_product");
        }} />;
      case "orders":
        return (
          <OrdersComponent
            onAddOrder={(order) => setSelectedKey("add_order")}
            onViewOrder={(orderData) => {
              setSelectedOrderData(orderData);
              setSelectedKey("view_order");
            }}
            onEditOrder={(orderData) => {
              setIsEditOrder(true);
              setSelectedOrderData(orderData);
              setSelectedKey("add_order");
            }}
          />
        );
      case "warehouses":
        return <WarehouseComponent />;
      case "users":
        return <UsersComponent onAddUser={() => setSelectedKey("add_user")} />;
      case "payments":
        return <PaymentsComponent />;
      case "settings":
        return <ProfileSettings />;
      case "add_product":
        return <AddProductPage ProductData={selectedProduct} />
      case "add_order":
        return <AddOrderPage onOrderAdded={() => setSelectedKey("orders")} orderData={isEditOrder ? selectedOrderData : null} />;
      case "view_order":
        return (
          <ViewOrderPage
            orderData={selectedOrderData}
            onClose={() => setSelectedKey("orders")}
          />
        );
      case "view_invoice":
        return <InvoiceDetail invoiceId={selectedInvoiceId} />;
      case "add_user":
        return <UserForm onUserAdded={() => setSelectedKey("users")} />;
      default:
        return <OverviewComponent />;
    }
  };

  return (
    <Layout hasSider>
      {/* Desktop Sider */}
      {!isMobile && (
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
      )}

      <Layout
        style={{
          marginInlineStart: !isMobile ? 250 : 0,
        }}
        className={styles.antLayout}
      >
        <Header className={styles.header}>
          <div className={styles.header_wrapper}>
            {/* Hamburger for mobile */}
            {isMobile && (
              <Button
                type="text"
                className={styles.menuButton}
                icon={
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="4"
                      y="6"
                      width="16"
                      height="2"
                      rx="1"
                      fill="#1C274C"
                    />
                    <rect
                      x="4"
                      y="11"
                      width="16"
                      height="2"
                      rx="1"
                      fill="#1C274C"
                    />
                    <rect
                      x="4"
                      y="16"
                      width="16"
                      height="2"
                      rx="1"
                      fill="#1C274C"
                    />
                  </svg>
                }
                onClick={() => setDrawerVisible(true)}
              />
            )}
            <div className={styles.name}>
              <h2>
                {isMobile
                  ? `Hi, ${userProfile?.firstName || ""}`
                  : "Hi,"}
              </h2>
              {!isMobile && (
                <h3 className={styles.greetingSub}>
                  Good Morning {userProfile?.firstName}!
                </h3>
              )}
            </div>
            <div className={styles.profile_name}>
              <div className={styles.user_icon}>
                <img
                  src={userProfile?.profileUrl || user_icon}
                  alt="user icon"
                />
              </div>
              <h3 className={styles.profileNameText}>
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
        {/* Mobile Drawer Sidebar */}
        {isMobile && (
          <Drawer
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{ height: 32, marginRight: 8 }}
                />
                <span>Menu</span>
              </div>
            }
            placement="left"
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            styles={{ body: { padding: 0 } }}
          >
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              onClick={(e) => {
                handleMenuClick(e);
                setDrawerVisible(false);
              }}
              items={items}
              style={{ borderRight: 0 }}
            />
          </Drawer>
        )}
        <Content>
          <div
            className={styles.contentArea}
            style={{ marginLeft: !isMobile ? "20px" : 0 }}
          >
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
