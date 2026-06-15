import { Table, Card, Row, Col, Statistic, Flex, Tag, Button } from "antd";
import { RiseOutlined } from "@ant-design/icons";
import {
  DashboardContainer,
  StatisticContainer,
  TableContainer,
  OverviewHeader,
  OverviewHeading,
} from "./styles";
import { useGetOverviewQuery } from "../../api/authApi";
import { useGetOrdersQuery } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import timePng from "../../assets/Icons/time.png";
import graphPng from "../../assets/Icons/graph.png";
import usersPng from "../../assets/Icons/users.png";
import growthPng from "../../assets/Icons/growth.png";
const OverviewComponent = () => {
  const navigate = useNavigate();

  const {
    data: overviewData,
    isLoading: isOverviewLoading,
    isError: isOverviewError,
  } = useGetOverviewQuery();

  const {
    data: orderListingData,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
  } = useGetOrdersQuery({
    page: 1,
    limit: 5,
    sortBy: "created",
    sortOrder: "DESC",
    status: "ALL",
  });
  console.log("Overview Data:", orderListingData);

  const allStatistics = [
    {
      title: "Total Orders",
      value: overviewData?.totalOrders,
      icon: "box",
      growth: 1.3,
      positive: true,
    },
    {
      title: "Total Subscriptions",
      value: overviewData?.totalSubscriptions,
      icon: "box",
      growth: 1.3,
      positive: true,
    },
    {
      title: "Total Sales",
      value: overviewData?.totalSales,
      icon: "dollar",
      growth: -4.3,
      positive: false,
    },
    {
      title: "Pending Orders",
      value: overviewData?.totalPendingOrders,
      icon: "clock",
      growth: 1.8,
      positive: true,
    },
    {
      title: "Total User",
      value: overviewData?.totalUsers,
      icon: "user",
      growth: 8.5,
      positive: true,
    },
  ];

  // Filter to only show statistics where API returns a value
  const statistics = allStatistics.filter(
    (stat) => stat.value !== undefined && stat.value !== null
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 120,
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "customer",
      key: "customer",
      width: 140,
      ellipsis: true,
      render: (_, record) =>
        `${record?.customer?.firstName || ""} ${record?.customer?.lastName || ""}`.trim() ||
        "—",
    },
    {
      title: "Address",
      key: "address",
      width: 200,
      ellipsis: true,
      render: (_, record) => {
        const addr = record?.shippingAddress;
        if (!addr) return "—";
        const line = [
          addr.streetAddress,
          addr.apartmentNumber,
          addr.state,
          addr.zip,
        ]
          .filter(Boolean)
          .join(", ");
        return line || "—";
      },
    },
    {
      title: "Date",
      dataIndex: "created",
      key: "created",
      width: 110,
      render: (created) => new Date(created).toLocaleDateString(),
    },
    {
      title: "Type",
      dataIndex: "orderType",
      key: "orderType",
      width: 130,
      ellipsis: true,
      render: (_, record) =>
        record?.orderItems[0]?.product?.category?.name
          ? record?.orderItems[0]?.product?.category?.name
          : "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => {
        const statusConfig = {
          CANCEL: { color: "#FFE8E0", textColor: "#FF6B35", text: "Canceled" },
          CANCELED: { color: "#FFE8E0", textColor: "#FF6B35", text: "Canceled" },
          SHIPPED: { color: "#E0F2FF", textColor: "#0091FF", text: "Shipped" },
          DELIVERED: { color: "#E0F9F4", textColor: "#00B894", text: "Completed" },
          DILEVERED: { color: "#E0F9F4", textColor: "#00B894", text: "Completed" },
          FULL_FILLED: { color: "#E0F9F4", textColor: "#00B894", text: "Completed" },
          PROCESSING: { color: "#F3E5FF", textColor: "#9B59B6", text: "Processing" },
          PENDING: { color: "#F5F5F5", textColor: "#595959", text: "Pending" },
          DRAFT: { color: "#F5F5F5", textColor: "#595959", text: "Draft" },
        };

        const config = statusConfig[status] || { color: "#F5F5F5", textColor: "#595959", text: status };

        return (
          <Tag
            style={{
              cursor: "pointer",
              backgroundColor: config.color,
              color: config.textColor,
              border: "none",
              fontWeight: 500,
            }}
          >
            {config.text}
          </Tag>
        );
      },
    },
  ];
  const ImageTitle = {
    "Total Orders": growthPng,
    "Total Subscriptions": growthPng,
    "Total Sales": graphPng,
    "Pending Orders": timePng,
    "Total User": usersPng,
  };
  const ImageWithTitle = ({ title }) => (
    <Flex align="center" justify="space-between" gap="8px">
      <span>{title}</span>
      <img src={ImageTitle[title]} alt={title} style={{ height: 34 }} />
    </Flex>
  );

  return (
    <DashboardContainer>
      <StatisticContainer>
        <OverviewHeader>
          <OverviewHeading>Statistic Overview</OverviewHeading>
        </OverviewHeader>
        <Row gutter={[12, 12]}>
          {statistics.map((stat, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4}>
              <Card>
                <Statistic
                  style={{
                    maxHeight: "100px",
                    height: "80px",
                    overflow: "hidden",
                  }}
                  title={<ImageWithTitle title={stat.title} />}
                  value={stat.value}
                  loading={isOverviewLoading}
                  valueStyle={{ color: stat.positive ? "#3f8600" : "#cf1322" }}
                  prefix={
                    <span style={{ display: "block" }}>
                      {stat.positive ? <RiseOutlined /> : <RiseOutlined />}
                    </span>
                  }
                  suffix="%"
                />
              </Card>
            </Col>
          ))}
        </Row>
      </StatisticContainer>
      <TableContainer>
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: "16px" }}
        >
          <h2>Recent Orders</h2>
          <Button
            style={{ marginBottom: "16px" }}
            type="text"
            onClick={() =>
              navigate("/dashboard", { state: { selectedKey: "orders" } })
            }
          >
            View All Orders
          </Button>
        </Flex>
        <Table
          columns={columns}
          dataSource={orderListingData?.results || []}
          loading={isOrdersLoading}
          scroll={{ x: 880 }}
          onRow={(record) => ({
            onClick: () => {
              navigate("/dashboard", {
                state: {
                  selectedKey: "view_order",
                  orderData: record
                }
              });
            },
            style: { cursor: "pointer" }
          })}
          pagination={
            orderListingData?.total > 4
              ? {
                pageSize: 4,
                showSizeChanger: false,
                showTotal: false,
                itemRender: (_, type, originalElement) => {
                  if (type === "prev" || type === "next") {
                    return originalElement;
                  }
                  return null;
                },
              }
              : false
          }
          rowKey="id"
        />
      </TableContainer>
    </DashboardContainer>
  );
};

export default OverviewComponent;
