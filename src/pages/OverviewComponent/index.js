import React from "react";
import { Table, Card, Row, Col, Statistic, Button, Select } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import {
  DashboardContainer,
  StatisticContainer,
  TableContainer,
  OverviewHeader,
  OverviewHeading,
} from "./styles";
import { useGetOverviewQuery } from "../../api/authApi";
import { useGetOrdersQuery } from "../../api/authApi";


const OverviewComponent = () => {
  const { data: overviewData, isLoading: isOverviewLoading, isError: isOverviewError } = useGetOverviewQuery();
  
  const { data: orderListingData, isLoading: isOrdersLoading, isError: isOrdersError } = useGetOrdersQuery({
    page: 1,
    limit: 5,
    sortBy: 'created',
    sortOrder: 'DESC',
    status: 'ALL',
  });
 
  const statistics = [
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
      value: overviewData?.totalSales ?? 0,
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

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "customer", key: "customer" },
    { 
      title: "Address", 
      key: "address",
      render: (_, record) => `${record.streetAddress}, ${record.appartmentNumber}, ${record.state}, ${record.zip}` 
    },
    { title: "Date", dataIndex: "created", key: "created", render: (created) => new Date(created).toLocaleDateString() },
    { title: "Type", dataIndex: "orderType", key: "orderType" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Button
          type={
            status === "Completed"
              ? "primary"
              : status === "Rejected"
              ? "danger"
              : "default"
          }
        >
          {status}
        </Button>
      ),
    },
  ];

  const data = [
    {
      id: "00001",
      name: "Christine Brooks",
      address: "089 Kutch Green Apt. 448",
      date: "04 Sep 2019",
      type: "Electric",
      status: "Completed",
    },
    {
      id: "00002",
      name: "Rosie Pearson",
      address: "979 Immanuel Ferry Suite 526",
      date: "28 May 2019",
      type: "Book",
      status: "Rejected",
    },
    {
      id: "00003",
      name: "Darrell Caldwell",
      address: "8587 Frida Ports",
      date: "23 Nov 2019",
      type: "Medicine",
      status: "Processing",
    },
    {
      id: "00004",
      name: "Gilbert Johnston",
      address: "768 Destiny Lake Suite 600",
      date: "05 Feb 2019",
      type: "Mobile",
      status: "Processing",
    },
    {
      id: "00005",
      name: "Alan Cain",
      address: "042 Mylene Throughway",
      date: "29 Jul 2019",
      type: "Watch",
      status: "Processing",
    },
  ];

  return (
    <DashboardContainer>
      <StatisticContainer>
        <OverviewHeader>
          <OverviewHeading>Statistic Overview</OverviewHeading>
          {/* <div>
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              allowClear
              options={[{ value: "lucy", label: "Lucy" }]}
              placeholder="select it"
            />
          </div> */}
        </OverviewHeader>
        <Row gutter={4}>
          {statistics.map((stat, index) => (
            <Col span={4} key={index}>
              <Card>
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  // precision={2}
                  valueStyle={{ color: stat.positive ? "#3f8600" : "#cf1322" }}
                  prefix={
                    stat.positive ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                  }
                  suffix="%"
                />
              </Card>
            </Col>
          ))}
        </Row>
      </StatisticContainer>
      <TableContainer>
        <h2>Recent Orders</h2>
        <Table
          columns={columns}
          dataSource={orderListingData?.results || []}
          loading={isOrdersLoading}
          pagination={{ pageSize: 5 }}
          rowKey="id"
        />
      </TableContainer>
    </DashboardContainer>
  );
};

export default OverviewComponent;
