import React, { useState } from "react";
import { Table, Spin, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useGetWarehousesQuery } from "../../../api/authApi";
import { getColumns } from "./columns";
import { TableWrapper } from "./styles";

const WarehouseListing = ({
  searchFilter,
  sortBy,
  sortOrder,
  onEdit,
  onDelete,
}) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const { data, isLoading, error } = useGetWarehousesQuery({
    page: pagination.current,
    limit: pagination.pageSize,
    sortBy: sortBy || "created",
    sortOrder: sortOrder || "DESC",
    searchFilter: searchFilter || undefined,
  });

  const handleTableChange = (pag, filters, sorter) => {
    setPagination({
      current: pag.current,
      pageSize: pag.pageSize,
    });
  };

  const handleEdit = (record) => {
    onEdit(record);
  };

  const handleDelete = (warehouseId) => {
    Modal.confirm({
      title: "Delete Warehouse",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to delete this warehouse?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        onDelete(warehouseId);
      },
    });
  };

  const columns = getColumns(handleEdit, handleDelete);

  if (isLoading) {
    return (
      <TableWrapper>
        <Spin size="large" style={{ display: "flex", justifyContent: "center", padding: "40px" }} />
      </TableWrapper>
    );
  }

  if (error) {
    message.error("Failed to fetch warehouses");
  }

  const warehouses = data?.data || [];

  return (
    <TableWrapper>
      <Table
        columns={columns}
        dataSource={warehouses}
        rowKey="id"
        pagination={{
          showSizeChanger: false,
          showQuickJumper: false,
          showTotal: false,
          showTitle:false,
          itemRender: (page, type, originalElement) => {
            if (type === "prev" || type === "next") {
              return originalElement;
            }
            return null;
          },
        }}
        onChange={handleTableChange}
        loading={isLoading}
      />
    </TableWrapper>
  );
};

export default WarehouseListing;
