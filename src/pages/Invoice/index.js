import React, { useState } from "react";
import { Table, Card, Descriptions } from "antd";
import styled from "styled-components";

const InvoiceContainer = styled.div`
  margin-top: 20px;
`;

const AmountDue = styled.div`
  color: red;
  font-weight: bold;
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const payments = [
  { id: 1, date: "01 Aug, 2023", amount: "$4,950.00", dueDate: "15 Aug, 2023" },
];

const invoiceData = {
  invoiceNumber: "AB2324-01",
  date: "01 Aug, 2023",
  to: {
    name: "Company Name",
    address: "Company address, City, Country - 00000",
    phone: "+0 (000) 123-4567",
  },
  from: {
    name: "Panda, Inc",
    address: "Business address, City, State, IN - 000 000",
    taxId: "00XXXXX1234X0XX",
  },
  items: [
    { product: "Bag", qty: 2, rate: "$100.00", total: "$200.00" },
    { product: "Shoes", qty: 2, rate: "$100.00", total: "$200.00" },
    { product: "Glass", qty: 2, rate: "$100.00", total: "$200.00" },
  ],
  subtotal: "$600.00",
  tax: "$0.00",
  total: "$600.00",
  amountDue: "$600.00",
};

const Invoice = ({ data }) => (
  <InvoiceContainer>
    <Card title={`Invoice #${data.invoiceNumber}`} extra={`Date: ${data.date}`}>
      <Descriptions column={2}>
        <Descriptions.Item label="To">
          {data.to.name}
          <br />
          {data.to.address}
          <br />
          {data.to.phone}
        </Descriptions.Item>
        <Descriptions.Item label="From">
          {data.from.name}
          <br />
          {data.from.address}
          <br />
          TAX ID {data.from.taxId}
        </Descriptions.Item>
      </Descriptions>
      <AmountDue>
        {data.amountDue} due on {invoiceData.dueDate}
      </AmountDue>

      <Table
        pagination={false}
        dataSource={data.items}
        columns={[
          { title: "Products", dataIndex: "product" },
          { title: "Qty", dataIndex: "qty" },
          { title: "Rate", dataIndex: "rate" },
          { title: "Line total", dataIndex: "total" },
        ]}
        summary={() => (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={3}>Subtotal</Table.Summary.Cell>
              <Table.Summary.Cell>{data.subtotal}</Table.Summary.Cell>
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={3}>Tax</Table.Summary.Cell>
              <Table.Summary.Cell>{data.tax}</Table.Summary.Cell>
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={3}>Total</Table.Summary.Cell>
              <Table.Summary.Cell>{data.total}</Table.Summary.Cell>
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={3}>
                <strong>Amount due</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <strong>{data.amountDue}</strong>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        )}
      />
    </Card>
  </InvoiceContainer>
);

const InvoiceDetail = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const handleRowClick = (record) => {
    setSelectedPayment(invoiceData); // Here you'd normally fetch the invoice data for the selected payment
  };

  return (
    <div>
      <Table
        dataSource={payments}
        columns={[
          { title: "Date", dataIndex: "date" },
          { title: "Amount", dataIndex: "amount" },
          { title: "Due Date", dataIndex: "dueDate" },
        ]}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        rowKey="id"
      />

      {selectedPayment && <Invoice data={selectedPayment} />}
    </div>
  );
};

export default InvoiceDetail;
