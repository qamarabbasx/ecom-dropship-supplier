import React, { useState, useEffect } from "react";
import { Table, Spin, message } from "antd";
import getColumns from "./columns";
import { TableWrapper } from "./styles";
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} from "../../../api/authApi";

const OrdersListing = ({
  searchFilter,
  startDate,
  endDate,
  appliedFilters,
  onEditOrder,
  onViewOrder,
  onDataChange,
}) => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sortBy, setSortBy] = useState("order.created");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [supplier] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const columns = getColumns(
    onEditOrder,
    onViewOrder,
    updateOrderStatus,
    deleteOrder
  );

  // Build query parameters with filters
  const queryParams = {
    page,
    limit,
    sortBy,
    sortOrder,
    supplier,
    searchFilter,
  };

  // Add date filters if they exist
  if (startDate) {
    queryParams.startDate = startDate;
  }
  if (endDate) {
    queryParams.endDate = endDate;
  }

  // Add filter parameters if they exist
  if (appliedFilters?.status && appliedFilters.status !== "All") {
    queryParams.status = appliedFilters.status.toUpperCase();
  }
  if (appliedFilters?.orderType && appliedFilters.orderType.length > 0) {
    queryParams.orderType = appliedFilters.orderType.join(",");
  }
  if (appliedFilters?.customer && appliedFilters.customer.length > 0) {
    queryParams.customer = appliedFilters.customer.join(",");
  }

  const {
    data: orderListingData,
    error,
    isLoading,
  } = useGetOrdersQuery(queryParams);

  useEffect(() => {
    if (orderListingData?.results && onDataChange) {
      onDataChange(orderListingData.results);
    }
  }, [orderListingData, onDataChange]);

  const handleTableChange = (pagination, filters, sorter) => {
    const { field, order } = sorter;
    setSortBy(field);
    setSortOrder(order === "ascend" ? "ASC" : "DESC");
    setPage(pagination.current);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  useEffect(() => {
    if (error) {
      message.error("Failed to load orders");
    }
  }, [error]);

  return (
    <TableWrapper>
      {isLoading ? (
        <div className="loading-wrapper">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={orderListingData?.results || []}
          rowKey="id"
          loading={isLoading}
          scroll={{ x: "max-content" }}
          onChange={handleTableChange}
          pagination={{
            current: page,
            pageSize: limit,
            total: orderListingData?.total || 0,
            onChange: (newPage) => setPage(newPage),
            showSizeChanger: false,
            showTotal: (total, range) =>
              `Showing ${range[0]}-${range[1]} of ${total}`,
            itemRender: (_, type, originalElement) => {
              if (type === "prev" || type === "next") {
                return originalElement;
              }
              return null;
            },
          }}
        />
      )}
    </TableWrapper>
  );
};

export default OrdersListing;
