// TableComponent.js
import React, { useMemo, useState, useEffect } from "react";
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

  const formatDateParam = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const { startDate, endDate } = useMemo(() => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (dateFilter) {
      case "Yesterday": {
        const yesterday = new Date(todayStart);
        yesterday.setDate(yesterday.getDate() - 1);
        return {
          startDate: formatDateParam(yesterday),
          endDate: formatDateParam(yesterday),
        };
      }
      case "Last 7 Days": {
        const start = new Date(todayStart);
        start.setDate(start.getDate() - 6);
        return {
          startDate: formatDateParam(start),
          endDate: formatDateParam(todayEnd),
        };
      }
      case "Last 30 Days": {
        const start = new Date(todayStart);
        start.setDate(start.getDate() - 29);
        return {
          startDate: formatDateParam(start),
          endDate: formatDateParam(todayEnd),
        };
      }
      case "This Month": {
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        return {
          startDate: formatDateParam(start),
          endDate: formatDateParam(todayEnd),
        };
      }
      case "Last Month": {
        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const end = new Date(now.getFullYear(), now.getMonth(), 0);
        return {
          startDate: formatDateParam(start),
          endDate: formatDateParam(end),
        };
      }
      case "Today":
        return {
          startDate: formatDateParam(todayStart),
          endDate: formatDateParam(todayEnd),
        };
      case "All Time":
      default:
        return {
          startDate: undefined,
          endDate: undefined,
        };
    }
  }, [dateFilter]);

  const { data: orderListingData, error, isLoading } = useGetInvoicesQuery({
    page,
    limit,
    sortBy,
    sortOrder,
    searchFilter,
    startDate,
    endDate,
    status: statusFilter !== "ALL" ? statusFilter : undefined,
  });

  useEffect(() => {
    setPage(1);
  }, [searchFilter, statusFilter, dateFilter]);

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
