// TableComponent.js
import React, { useState, useEffect } from "react";
import { Table, Spin, message } from "antd";
import { StyledTableWrapper } from "./styles";
import { columns } from "./columns";
import { useGetInvoicesQuery } from "../../../api/authApi";
import { useNavigate } from "react-router-dom";

const PaymentsListing = ({ searchFilter, statusFilter, dateFilter }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy] = useState("created");
  const [sortOrder] = useState("DESC");

  const { data: orderListingData, error, isLoading, refetch } = useGetInvoicesQuery({
    page,
    limit,
    sortBy,
    sortOrder,
    searchFilter,
    status: statusFilter !== "ALL" ? statusFilter : undefined,
  });

  useEffect(() => {
    refetch();
  }, [searchFilter, statusFilter, dateFilter, refetch]);

  useEffect(() => {
    if (error) {
      message.error("Failed to load invoices");
    }
  }, [error]);

  const data =
    orderListingData?.invoices?.map((invoice) => ({
      key: invoice.id,
      invoiceId: invoice.invoiceNumber || invoice.id,
      orderNumber: invoice.order?.orderNumber || invoice.order?.id || "N/A",
      recipientName: invoice.customer
        ? `${invoice.customer.firstName || ""} ${invoice.customer.lastName || ""}`.trim()
        : "N/A",
      amount: invoice.order?.amount
        ? `$${parseFloat(invoice.order.amount).toFixed(2)}`
        : "$0.00",
      date: invoice.created
        ? new Date(invoice.created).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        })
        : "N/A",
      type: invoice.type || "Incoming",
      status: invoice.status || "Processing",
    })) || [];

  const handleRowClick = (record) => {
    navigate("/dashboard", {
      state: {
        selectedKey: "view_invoice",
        invoiceId: record.key,
      },
    });
  };

  return (
    <StyledTableWrapper>
      {isLoading ? (
        <div className="loading-wrapper">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            current: page,
            pageSize: limit,
            total: orderListingData?.total || 0,
            onChange: (newPage, newLimit) => {
              setPage(newPage);
              setLimit(newLimit);
            },
            showSizeChanger: false,
            showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total}`,
            itemRender: (_, type, originalElement) => {
              if (type === "prev" || type === "next") {
                return originalElement;
              }
              return null;
            },
          }}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
            style: { cursor: "pointer" },
          })}
          scroll={{ x: "max-content" }}
        />
      )}
    </StyledTableWrapper>
  );
};

export default PaymentsListing;
