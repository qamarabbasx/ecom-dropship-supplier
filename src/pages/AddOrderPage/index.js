import React, { useState } from "react";
import { Input, Select, DatePicker, TimePicker, Button, message } from "antd";
import {
  PageContainer,
  PageHeader,
  HeaderTitle,
  Breadcrumb,
  FormContainer,
  FormSection,
  SectionTitle,
  FormGrid,
  FormField,
  Label,
  SubmitButton,
} from "./styles";

const { Option } = Select;
const { TextArea } = Input;

const AddOrderPage = ({ onOrderAdded, orderData }) => {
console.log("🚀 ~ AddOrderPage ~ orderData:", orderData)

  const getInitialFormData = (orderData) => {
    let orderDate = null;
    let orderTime = null;
    if (orderData?.created) {
      const dateObj = new Date(orderData.created);
      orderDate = dateObj;
      orderTime = dateObj;
    }
    return {
      orderId: orderData?.id || "",
      orderNumber: orderData?.orderNumber || orderData?.orderTrackingId || "",
      orderType: orderData?.orderType || "",
      customerName: orderData?.customer?.firstName || "",
      orderItems: orderData?.orderItems?.length ? String(orderData.orderItems.length) : "",
      orderStatus: orderData?.status || "",
      orderDate: orderDate,
      orderTime: orderTime,
      shippingName: orderData?.shippingAddress?.name || orderData?.customer?.firstName || "",
      email: orderData?.customer?.email || "",
      phone: orderData?.shippingAddress?.phone || "",
      country: orderData?.shippingAddress?.country || "",
      province: orderData?.shippingAddress?.state || "",
      city: orderData?.shippingAddress?.city || "",
      zipCode: orderData?.shippingAddress?.zip || "",
      address: orderData?.shippingAddress?.streetAddress || "",
    };
  };

  const [formData, setFormData] = useState(getInitialFormData(orderData));

  // Update form fields if orderData changes
  React.useEffect(() => {
    setFormData(getInitialFormData(orderData));
  }, [orderData]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    message.success("Order saved successfully!");
    if (onOrderAdded) {
      onOrderAdded();
    }
  };

  const handleCancel = () => {
    if (onOrderAdded) {
      onOrderAdded();
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <div>
          <Breadcrumb>Order / Add Order</Breadcrumb>
          <HeaderTitle>Order ID</HeaderTitle>
        </div>
      </PageHeader>

      <FormContainer>
        <FormSection>
          <FormGrid columns={3}>
            <FormField>
              <Label>Order ID</Label>
              <Input
                placeholder="647"
                value={formData.orderId}
                onChange={(e) => handleInputChange("orderId", e.target.value)}
              />
            </FormField>
            <FormField>
              <Label>Order Number</Label>
              <Input
                placeholder="5560"
                value={formData.orderNumber}
                onChange={(e) => handleInputChange("orderNumber", e.target.value)}
              />
            </FormField>
            <FormField>
              <Label>Order Type</Label>
              <Input
                placeholder="Home Delivery"
                value={formData.orderType}
                onChange={(e) => handleInputChange("orderType", e.target.value)}
              />
            </FormField>
          </FormGrid>

          <FormGrid columns={3}>
            <FormField>
              <Label>Customer Name</Label>
              <Input
                placeholder="Ronald Richards"
                value={formData.customerName}
                onChange={(e) => handleInputChange("customerName", e.target.value)}
              />
            </FormField>
            <FormField>
              <Label>Order Items</Label>
              <Input
                placeholder="4"
                value={formData.orderItems}
                onChange={(e) => handleInputChange("orderItems", e.target.value)}
              />
            </FormField>
            <FormField>
              <Label>Order Status</Label>
              <Select
                placeholder="Select Status"
                value={formData.orderStatus}
                onChange={(value) => handleInputChange("orderStatus", value)}
                style={{ width: "100%" }}
              >
                <Option value="PENDING">Pending</Option>
                <Option value="PROCESSING">Processing</Option>
                <Option value="SHIPPED">Shipped</Option>
                <Option value="DELIVERED">Delivered</Option>
                <Option value="CANCELED">Canceled</Option>
                <Option value="DRAFT">Draft</Option>
              </Select>
            </FormField>
          </FormGrid>

          <FormGrid columns={2}>
            <FormField>
              <Label>Order Date</Label>
              <DatePicker
                placeholder="Select Date"
                style={{ width: "100%" }}
                onChange={(date) => handleInputChange("orderDate", date)}
              />
            </FormField>
            <FormField>
              <Label>Order Time</Label>
              <TimePicker
                placeholder="Select Time"
                style={{ width: "100%" }}
                format="HH:mm"
                onChange={(time) => handleInputChange("orderTime", time)}
              />
            </FormField>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>Shipping Address</SectionTitle>
          
          <FormGrid columns={3}>
            <FormField>
              <Label>Name</Label>
              <Input
                placeholder="Jane Cooper"
                value={formData.shippingName}
                onChange={(e) => handleInputChange("shippingName", e.target.value)}
              />
            </FormField>
            <FormField>
              <Label>Email Address</Label>
              <Input
                placeholder="michael.mitc@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </FormField>
            <FormField>
              <Label>Phone Number</Label>
              <Input
                placeholder="(702) 555-0122"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </FormField>
          </FormGrid>

          <FormGrid columns={3}>
            <FormField>
              <Label>Country</Label>
              <Select
                placeholder="Pakistan"
                value={formData.country}
                onChange={(value) => handleInputChange("country", value)}
                style={{ width: "100%" }}
              >
                <Option value="Pakistan">Pakistan</Option>
                <Option value="USA">USA</Option>
                <Option value="UK">UK</Option>
                <Option value="Canada">Canada</Option>
              </Select>
            </FormField>
            <FormField>
              <Label>Province</Label>
              <Input
                placeholder="Punjab"
                value={formData.province}
                onChange={(e) => handleInputChange("province", e.target.value)}
              />
            </FormField>
            <FormField>
              <Label>City</Label>
              <Input
                placeholder="Lahore"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
            </FormField>
          </FormGrid>

          <FormGrid columns={1}>
            <FormField>
              <Label>Zip Code</Label>
              <Input
                placeholder="54000"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                style={{ width: "33%" }}
              />
            </FormField>
          </FormGrid>

          <FormGrid columns={1}>
            <FormField>
              <Label>Address</Label>
              <TextArea
                placeholder="389 Johar town , Lahore"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                rows={3}
              />
            </FormField>
          </FormGrid>
        </FormSection>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
          <SubmitButton onClick={handleSubmit}>Add Order</SubmitButton>
        </div>
      </FormContainer>
    </PageContainer>
  );
};

export default AddOrderPage;
