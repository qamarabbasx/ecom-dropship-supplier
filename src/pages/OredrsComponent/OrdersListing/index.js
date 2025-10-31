import React, { useState, useEffect } from "react";
import { Table, Spin, message } from "antd";
import columns from "./columns";
import { TableWrapper } from "./styles";
import { useGetOrdersQuery } from "../../../api/authApi";

const OrdersListing = ({ searchFilter, selectedDate }) => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sortBy, setSortBy] = useState("order.created");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [supplier] = useState(false);


  const { data: orderListingData, error, isLoading } = useGetOrdersQuery({ 
    page, 
    limit, 
    sortBy, 
    sortOrder,
    supplier,
    startDate: selectedDate,
    searchFilter
  });

  const handleTableChange = (pagination, filters, sorter) => {
    const { field, order } = sorter;
    setSortBy(field);
    setSortOrder(order === "ascend" ? "ASC" : "DESC");
    setPage(pagination.current);
  };


  const data1 = [
    {
      key: "1",
      orderId: "1784",
      orderNumber: "302012",
      orderType: "Home Delivery",
      items: 2,
      customerName: "Wade Warren",
      status: "Canceled",
    },
    {
      key: "2",
      orderId: "1374",
      orderNumber: "302012",
      orderType: "Pick Up",
      items: 3,
      customerName: "Cameron Williamson",
      status: "Completed",
    },
    {
      key: "3",
      orderId: "4152",
      orderNumber: "302012",
      orderType: "Home Delivery",
      items: 4,
      customerName: "Ralph Edwards",
      status: "Pending",
    },
    {
      key: "4",
      orderId: "8013",
      orderNumber: "302012",
      orderType: "Home Delivery",
      items: 2,
      customerName: "Eleanor Pena",
      status: "Shipped",
    },
    {
      key: "5",
      orderId: "8861",
      orderNumber: "302012",
      orderType: "Pick Up",
      items: 0,
      customerName: "Devon Lane",
      status: "Completed",
    },
    {
      key: "6",
      orderId: "3536",
      orderNumber: "302012",
      orderType: "Pick Up",
      items: 1,
      customerName: "Brooklyn Simmons",
      status: "Pending",
    },
    {
      key: "7",
      orderId: "9151",
      orderNumber: "302012",
      orderType: "Pick Up",
      items: 5,
      customerName: "Cody Fisher",
      status: "Draft",
    },
    {
      key: "8",
      orderId: "4349",
      orderNumber: "302012",
      orderType: "Pick Up",
      items: 3,
      customerName: "Jacob Jones",
      status: "Draft",
    },
  ];

  useEffect(() => {
    if (error) {
      message.error("Failed to load orders");
    }
  }, [error]);

  return (
    <TableWrapper>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={orderListingData?.results || []}
          rowKey="id"
          loading={isLoading}
          onChange={handleTableChange}
          pagination={{
            current: page,
            pageSize: limit,
            total: orderListingData?.total || 0,
            onChange: (newPage) => setPage(newPage),
            showTotal: (total) => `Total ${total} items`,
          }}
          rowSelection={{
            type: "checkbox",
          }}
        />
      )}
    </TableWrapper>
  );
};

export default OrdersListing;
