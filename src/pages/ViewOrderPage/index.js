import React from "react";
import { Tabs, message, Modal, Spin } from "antd";
import { useDeleteOrderMutation, useGetOrderByIdQuery } from "../../api/authApi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { pdfBrand, pdfAutoTableBase, drawExportReportHeader } from "../../theme/exportPdfTheme";
import logo from "../../assets/Images/logo.png";
import {
  PageContainer,
  PageHeader,
  HeaderTitle,
  Breadcrumb,
  ContentContainer,
  HeaderActions,
  ActionButton,
  DetailsSection,
  ProductTable,
  ProductRow,
  ProductImage,
  ProductInfo,
  TableHeader,
  TableCell,
  SummarySection,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  GrandTotal,
  AddressSection,
  AddressCard,
  AddressTitle,
  AddressText,
  StatusBadge,
} from "./styles";

const { TabPane } = Tabs;

const ViewOrderPage = ({ orderData: initialOrderData, onClose }) => {
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  // Fetch fresh order data if we have an order ID
  const { data: fetchedOrderData, isLoading: isLoadingOrder, error: orderError } = useGetOrderByIdQuery(
    initialOrderData?.id,
    { skip: !initialOrderData?.id }
  );

  // Use fetched data if available, otherwise use initial data
  const orderData = fetchedOrderData || initialOrderData;

  if (!orderData) return null;

  if (isLoadingOrder) {
    return (
      <PageContainer>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
          <Spin size="large" />
        </div>
      </PageContainer>
    );
  }

  if (orderError) {
    return (
      <PageContainer>
        <div style={{ padding: "24px", textAlign: "center", color: "#ff4d4f" }}>
          Failed to load order details
        </div>
      </PageContainer>
    );
  }

  const subtotal = parseFloat(orderData.amount) || 0;
  const vat = 0;
  const shippingRate = 5.0;
  const grandTotal = subtotal + vat + shippingRate;

  const getStatusColor = (status) => {
    const statusColors = {
      CANCEL: "#FFE8E0",
      CANCELED: "#FFE8E0",
      SHIPPED: "#E0F2FF",
      DELIVERED: "#E0F9F4",
      DILEVERED: "#E0F9F4",
      FULL_FILLED: "#E0F9F4",
      PROCESSING: "#F3E5FF",
      PENDING: "#F5F5F5",
      DRAFT: "#F5F5F5",
    };
    return statusColors[status] || "#F5F5F5";
  };
  const getStatusLabel = (status) => {
    if (status === "FULL_FILLED" || status === "DELIVERED") return "Fulfilled";
    if (status === "SHIPPED") return "In Transit";
    if (status === "PROCESSING" || status === "IN_PROGRESS" || status === "PENDING")
      return "Processing";
    if (status === "CANCELED") return "Disputed";
    return "Processing";
  };

  const getStatusTextColor = (status) => {
    const colors = {
      CANCEL: "#FF6B35",
      CANCELED: "#FF6B35",
      SHIPPED: "#0091FF",
      DELIVERED: "#00B894",
      DILEVERED: "#00B894",
      FULL_FILLED: "#00B894",
      PROCESSING: "#9B59B6",
      PENDING: "#595959",
      DRAFT: "#595959",
    };
    return colors[status] || "#595959";
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Delete Order",
      content:
        "Are you sure you want to delete this order? This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteOrder(orderData.id).unwrap();
          message.success("Order deleted successfully");
          if (onClose) {
            onClose();
          }
        } catch (error) {
          const errorMessage = error?.data?.response || error?.data?.message || "Failed to delete order";
          message.error(errorMessage);
        }
      },
    });
  };

  const handleExportPDF = () => {
    try {
      const doc = new jsPDF();
      const margin = 14;

      let y = drawExportReportHeader(doc, {
        title: "Order Details",
        subtitle: "ECOM Admin",
        logoSrc: logo,
        margin,
      });

      y += 6;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...pdfBrand.text);
      doc.text(`Order ID: ${orderData.id}`, margin, y);
      y += 6;
      doc.text(`Order Number: ${orderData.orderTrackingId || "-"}`, margin, y);
      y += 6;
      doc.text(`Status: ${orderData.status}`, margin, y);
      y += 6;
      doc.text(`Date: ${new Date(orderData.created).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}`, margin, y);
      y += 6;

      const customer = orderData?.customer;
      if (customer) {
        doc.text(`Customer: ${customer.firstName || ""} ${customer.lastName || ""}`.trim(), margin, y);
        y += 6;
        if (customer.email) {
          doc.text(`Email: ${customer.email}`, margin, y);
          y += 6;
        }
        if (customer.phoneNumber) {
          doc.text(`Phone: ${customer.phoneNumber}`, margin, y);
          y += 6;
        }
      }

      const tableData = orderData.orderItems?.map((item) => {
        const price = parseFloat(item.price || orderData.amount / (item.quantity || 1));
        const variant = item.variant?.name || "";
        return [
          item.product?.name || "Product",
          variant,
          item.product?.sku || "-",
          `${item.quantity || 1} pcs`,
          `$${price.toFixed(2)}`,
          `$${(price * (item.quantity || 1)).toFixed(2)}`,
        ];
      }) || [];

      y += 4;
      autoTable(doc, {
        ...pdfAutoTableBase,
        startY: y,
        head: [["Product", "Variant", "SKU", "Quantity", "Price", "Total"]],
        body: tableData,
        styles: {
          ...pdfAutoTableBase.styles,
          fontSize: 9,
        },
        columnStyles: {
          3: { halign: "center" },
          4: { halign: "right" },
          5: { halign: "right" },
        },
      });

      const finalY = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...pdfBrand.text);
      doc.text(`Subtotal: $${subtotal.toFixed(2)}`, margin, finalY);
      doc.text(`VAT (0%): $${vat.toFixed(2)}`, margin, finalY + 6);
      doc.text(`Shipping Rate: $${shippingRate.toFixed(2)}`, margin, finalY + 12);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(...pdfBrand.primary);
      doc.text(`Grand Total: $${grandTotal.toFixed(2)}`, margin, finalY + 22);
      doc.setTextColor(...pdfBrand.text);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Shipping Address:", margin, finalY + 35);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      const shippingAddress = orderData.customer?.shippingAddress?.streetAddress || orderData.shippingAddress?.streetAddress || "N/A";
      doc.text(shippingAddress, margin, finalY + 41);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Billing Address:", margin, finalY + 52);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(shippingAddress, margin, finalY + 58);

      // Save PDF
      doc.save(`Order_${orderData.id}_${Date.now()}.pdf`);
      message.success("PDF exported successfully");
    } catch (error) {
      console.error("PDF export error:", error);
      message.error("Failed to export PDF");
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <div>
          <Breadcrumb>Orders</Breadcrumb>
          <HeaderTitle>Orders</HeaderTitle>
        </div>
        <HeaderActions>
          <ActionButton danger onClick={handleDelete} loading={isDeleting}>
            Delete
          </ActionButton>
          <ActionButton onClick={handleExportPDF}>Export PDF</ActionButton>
        </HeaderActions>
      </PageHeader>

      <ContentContainer>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          {/* <input
            type="text"
            placeholder="Search"
            style={{
              padding: "8px 12px",
              border: "1px solid #d9d9d9",
              borderRadius: "6px",
              width: "250px",
            }}
          /> */}
        </div>

        <Tabs defaultActiveKey="1">
          <TabPane tab="Details" key="1">
            <DetailsSection>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span style={{ fontSize: "14px", fontWeight: 500 }}>
                    Product
                  </span>
                  <span
                    style={{
                      background: "#E6F7FF",
                      color: "#0091FF",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    {orderData.orderItems?.length || 0} Products
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span style={{ fontSize: "12px", color: "#8c8c8c" }}>
                    {new Date(orderData.created).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <StatusBadge
                    color={getStatusColor(orderData.status)}
                    textColor={getStatusTextColor(orderData.status)}
                  >
                    {getStatusLabel(orderData.status)}
                  </StatusBadge>
                </div>
              </div>

              <ProductTable>
                <TableHeader>
                  <TableCell width="40%">Product</TableCell>
                  <TableCell width="15%">SKU</TableCell>
                  <TableCell width="15%">QTY</TableCell>
                  <TableCell width="15%">Price</TableCell>
                  <TableCell width="15%">Total</TableCell>
                </TableHeader>
                {orderData.orderItems?.map((item, index) => (
                  <ProductRow key={index}>
                    <TableCell width="40%">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <ProductImage
                          src={
                            item.product?.images?.[0]?.url || "/placeholder.png"
                          }
                          alt={item.product?.name}
                        />
                        <ProductInfo>
                          <div style={{ fontWeight: 500 }}>
                            {item.product?.name || "Product"}
                          </div>
                          <div style={{ fontSize: "12px", color: "#8c8c8c" }}>
                            {item.variant?.name || item.product?.category?.name || "Standard"}
                          </div>
                        </ProductInfo>
                      </div>
                    </TableCell>
                    <TableCell width="15%">
                      {item.product?.sku || "-"}
                    </TableCell>
                    <TableCell width="15%">{item.quantity || 1} pcs</TableCell>
                    <TableCell width="15%">
                      ${parseFloat(item.price || orderData.amount / (item.quantity || 1)).toFixed(2)}
                    </TableCell>
                    <TableCell width="15%">
                      $
                      {(
                        parseFloat(item.price || orderData.amount / (item.quantity || 1)) * (item.quantity || 1)
                      ).toFixed(2)}
                    </TableCell>
                  </ProductRow>
                ))}
              </ProductTable>

              <SummarySection>
                <SummaryRow>
                  <SummaryLabel>Subtotal</SummaryLabel>
                  <SummaryValue>${subtotal.toFixed(2)}</SummaryValue>
                </SummaryRow>
                <SummaryRow>
                  <SummaryLabel>VAT (0%)</SummaryLabel>
                  <SummaryValue>${vat.toFixed(2)}</SummaryValue>
                </SummaryRow>
                <SummaryRow>
                  <SummaryLabel>Shipping Rate</SummaryLabel>
                  <SummaryValue>${shippingRate.toFixed(2)}</SummaryValue>
                </SummaryRow>
                <GrandTotal>
                  <SummaryLabel>Grand Total</SummaryLabel>
                  <SummaryValue style={{ fontSize: "18px", fontWeight: 600 }}>
                    ${grandTotal.toFixed(2)}
                  </SummaryValue>
                </GrandTotal>
              </SummarySection>

              <AddressSection>
                <AddressCard>
                  <AddressTitle>
                    <span style={{ color: "#0091FF" }}>📍</span> Shipping
                    Address
                  </AddressTitle>
                  <AddressText>
                    {orderData.customer?.shippingAddress?.streetAddress || orderData.shippingAddress?.streetAddress || "N/A"}
                  </AddressText>
                  {orderData.customer?.phoneNumber && (
                    <AddressText style={{ marginTop: "4px" }}>
                      Phone: {orderData.customer.phoneNumber}
                    </AddressText>
                  )}
                </AddressCard>
                <AddressCard>
                  <AddressTitle>
                    <span style={{ color: "#0091FF" }}>📍</span> Billing Address
                  </AddressTitle>
                  <AddressText>
                    {orderData.customer?.shippingAddress?.streetAddress || orderData.shippingAddress?.streetAddress || "N/A"}
                  </AddressText>
                  {orderData.customer?.email && (
                    <AddressText style={{ marginTop: "4px" }}>
                      Email: {orderData.customer.email}
                    </AddressText>
                  )}
                </AddressCard>
              </AddressSection>
            </DetailsSection>
          </TabPane>
          <TabPane tab="Reviews" key="2">
            <div
              style={{ padding: "24px", textAlign: "center", color: "#8c8c8c" }}
            >
              No reviews available
            </div>
          </TabPane>
        </Tabs>
      </ContentContainer>
    </PageContainer>
  );
};

export default ViewOrderPage;
