import React, { useState, useEffect, useRef } from "react";
import {
  MainContainer,
  MainHeading,
  ProductsHeader,
  SearchRow,
  ActionsRow,
  ToolbarRow,
  StyledButton,
} from "./styles";
import { ExportOutlined, CalendarOutlined, FilterOutlined } from "@ant-design/icons";
import { Input, Button, Space, DatePicker, message } from "antd";
import OrdersListing from "./OrdersListing";
import FilterDrawer from "./FilterDrawer";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { pdfBrand, pdfAutoTableBase, drawExportReportHeader } from "../../theme/exportPdfTheme";
import logo from "../../assets/Images/logo.png";
import { formatItemType } from "./OrdersListing/itemType.utils";
const { Search } = Input;
const { RangePicker } = DatePicker;

const OrdersComponent = ({ onAddOrder, onViewOrder, onEditOrder }) => {

  const handleAddOrderClick = () => {
    if (onAddOrder) {
      onAddOrder();
    }
  };

  const [searchFilter, setSearchFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [ordersData, setOrdersData] = useState([]);
  const debounceTimer = useRef(null);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchInput(value);

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer
    debounceTimer.current = setTimeout(() => {
      setSearchFilter(value.trim());
    }, 500);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleDateChange = (dates, dateStrings) => {
    if (dates) {
      setStartDate(dateStrings[0]);
      setEndDate(dateStrings[1]);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handleApplyFilter = (filters) => {
    setAppliedFilters(filters);
    console.log("Applied Filters:", filters);
  };

  const handleExportOrders = () => {
    try {
      if (!ordersData || ordersData.length === 0) {
        message.warning("No orders to export");
        return;
      }

      const doc = new jsPDF({ orientation: "landscape" });
      const margin = 14;

      let metaY = drawExportReportHeader(doc, {
        title: "Orders Report",
        subtitle: "ECOM Admin",
        logoSrc: logo,
        margin,
      });

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...pdfBrand.textMuted);
      doc.text(`Export Date: ${new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}`, margin, metaY);

      metaY += 6;
      if (startDate && endDate) {
        doc.text(`Filtered by Date Range: ${startDate} to ${endDate}`, margin, metaY);
        metaY += 6;
      } else if (startDate) {
        doc.text(`Filtered from Date: ${startDate}`, margin, metaY);
        metaY += 6;
      }

      // Prepare table data
      const tableData = ordersData.map((order) => {
        const customer = order?.customer;
        const customerName = customer
          ? `${customer.firstName || ""} ${customer.lastName || ""}`.trim()
          : "-";
        const supplierName = `${order?.orderItems?.[0]?.product?.owner?.firstName || ""} ${order?.orderItems?.[0]?.product?.owner?.lastName || ""}`.trim() || "-";
        const itemType = order?.orderItems?.[0]?.product?.type ? formatItemType(order.orderItems[0].product.type) : "Third Party";

        const totalQty = order.orderItems?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
        const orderType = order?.orderItems?.[0]?.product?.category?.name || "Home Delivery";

        return [
          order.id,
          order.orderTrackingId || "-",
          orderType,
          totalQty.toString(),
          customerName,
          supplierName,
          itemType,
          order.status,
          `$${parseFloat(order.amount || 0).toFixed(2)}`,
        ];
      });

      const tableStartY = metaY + 4;
      autoTable(doc, {
        ...pdfAutoTableBase,
        startY: tableStartY,
        head: [["Order ID", "Order #", "Type", "Items", "Customer", "Supplier", "Item Type", "Status", "Amount"]],
        body: tableData,
        styles: {
          ...pdfAutoTableBase.styles,
          overflow: "linebreak",
        },
        columnStyles: {
          0: { cellWidth: 28 },
          1: { cellWidth: 24 },
          2: { cellWidth: 35 },
          3: { cellWidth: 18, halign: "center" },
          4: { cellWidth: 40 },
          5: { cellWidth: 35 },
          6: { cellWidth: 32 },
          7: { cellWidth: 28 },
          8: { cellWidth: 25, halign: "right" },
        },
        tableWidth: "auto",
      });

      // Add summary
      const finalY = doc.lastAutoTable.finalY + 10;
      const totalOrders = ordersData.length;
      const totalAmount = ordersData.reduce((sum, order) => sum + parseFloat(order.amount || 0), 0);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...pdfBrand.text);
      doc.text(`Total Orders: ${totalOrders}`, margin, finalY);
      doc.setTextColor(...pdfBrand.primary);
      doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, margin, finalY + 6);
      doc.setTextColor(...pdfBrand.text);

      // Save PDF
      doc.save(`Orders_Report_${Date.now()}.pdf`);
      message.success("Orders exported successfully");
    } catch (error) {
      console.error("PDF export error:", error);
      message.error("Failed to export orders");
    }
  };


  return (
    <MainContainer>
      <MainHeading>Orders</MainHeading>
      <ProductsHeader>
        <SearchRow>
          <Search
            placeholder="Search"
            value={searchInput}
            onSearch={(value) => setSearchFilter(value.trim())}
            onChange={handleSearch}
          />
        </SearchRow>
        {/* <ActionsRow>
          <StyledButton onClick={handleAddOrderClick}>{`Add Order`}</StyledButton>
        </ActionsRow> */}
      </ProductsHeader>
      <ToolbarRow>
        <Space size="middle" wrap>
          <Button icon={<ExportOutlined />} onClick={handleExportOrders}>
            Export
          </Button>
          <RangePicker
            placeholder={["Start Date", "End Date"]}
            suffixIcon={<CalendarOutlined />}
            format="YYYY-MM-DD"
            onChange={handleDateChange}
            style={{ height: "32px" }}
          />
          <FilterDrawer
            visible={filterVisible}
            onClose={() => setFilterVisible(false)}
            onApplyFilter={handleApplyFilter}
          >
            <Button
              icon={<FilterOutlined />}
              onClick={() => setFilterVisible(!filterVisible)}
            >
              Filters
            </Button>
          </FilterDrawer>
        </Space>
      </ToolbarRow>
      <OrdersListing
        searchFilter={searchFilter}
        startDate={startDate}
        endDate={endDate}
        appliedFilters={appliedFilters}
        onEditOrder={onEditOrder}
        onViewOrder={onViewOrder}
        onDataChange={setOrdersData}
      />
    </MainContainer>
  );
};

export default OrdersComponent;