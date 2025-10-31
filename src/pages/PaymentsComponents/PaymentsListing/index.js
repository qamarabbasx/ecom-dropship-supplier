// TableComponent.js
import React, { useState} from "react";
import { Table, Spin, message } from "antd";
import { StyledTableWrapper } from "./styles";
import { columns } from "./columns";
import { useGetInvoicesQuery } from "../../../api/authApi";

const data = [
  {
    key: "1",
    invoiceId: "00001",
    orderNumber: 877,
    recipientName: "Savannah Nguyen",
    amount: "$42,000",
    date: "04 Sep 2019",
    type: "Incoming",
    status: "Completed",
  },
  {
    key: "2",
    invoiceId: "00002",
    orderNumber: 740,
    recipientName: "Brooklyn Simmons",
    amount: "$17,000",
    date: "28 May 2019",
    type: "Outgoing",
    status: "Rejected",
  },
  {
    key: "3",
    invoiceId: "00003",
    orderNumber: 536,
    recipientName: "Darlene Robertson",
    amount: "$57,000",
    date: "23 Nov 2019",
    type: "Incoming",
    status: "Processing",
  },
];

const PaymentsListing = ({ searchFilter, statusFilter }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy] = useState("created");
  const [sortOrder] = useState("DESC");

  const { data: orderListingData, error, isLoading } = useGetInvoicesQuery({
    page,
    limit,
    sortBy,
    sortOrder,
    searchFilter,
    status: statusFilter
  });

  if (error) {
    message.error("Failed to load invoices");
  }

  const data = orderListingData?.invoices.map((invoice) => ({
    key: invoice.id,
    invoiceId: invoice.id,
    orderNumber: invoice.order.id,
    recipientName: `${invoice.customer.firstName} ${invoice.customer.lastName}`,
    amount: `$${invoice.order.amount}`,
    date: new Date(invoice.created).toLocaleDateString(),
    type: invoice.type,
    status: invoice.status,
  })) || [];

  return (
    <StyledTableWrapper>
    {isLoading ? (
      <Spin size="large" />
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
          showTotal: (total) => `Total ${total} items`,
        }}
        rowSelection={{
          type: "checkbox",
        }}
      />
    )}
  </StyledTableWrapper>
  );
};

export default PaymentsListing;
