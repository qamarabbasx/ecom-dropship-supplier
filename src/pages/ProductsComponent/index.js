import { useState } from "react";
import {
  MainContainer,
  MainHeading,
  ProductsHeader,
  SearchRow,
  ActionsRow,
  ToolbarRow,
  StyledButton,
} from "./styles";
import { CalendarOutlined, ExportOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Space, message } from "antd";
import ProductListing from "./ProductListing";
import FilterDrawer from "../OredrsComponent/FilterDrawer";
import { STATUS_MAP } from "./ProductListing/statusUtils";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { pdfBrand, pdfAutoTableBase, drawExportReportHeader } from "../../theme/exportPdfTheme";
import logo from "../../assets/Images/logo.png";
const { Search } = Input;

const ProductsComponent = ({ onAddProduct }) => {
  const [searchFilter, setSearchFilter] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [productsData, setProductsData] = useState([]);

  const handleAddProductClick = (product) => {
    if (onAddProduct) {
      onAddProduct(product);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchFilter(value.trim());

    if (value.trim() === "") {
      setSearchFilter("");
    }
  };

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
  };

  const handleExportProducts = () => {
    try {
      if (!productsData || productsData.length === 0) {
        message.warning("No products to export");
        return;
      }

      const doc = new jsPDF();
      const margin = 14;

      let metaY = drawExportReportHeader(doc, {
        title: "Products Report",
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
      const tableData = productsData.map((product) => {
        const totalStock = product.variants?.reduce((sum, variant) => sum + (variant.totalStock || 0), 0) || 0;
        const categoryName = product.category?.name || "Uncategorized";
        const createdDate = product.created ? new Date(product.created).toLocaleDateString() : "-";

        return [
          product.id.substring(0, 8) + "...",
          product.name || "-",
          categoryName,
          totalStock.toString(),
          product.stock_status || "N/A",
          `$${parseFloat(product.price || 0).toFixed(2)}`,
          createdDate,
        ];
      });

      const tableStartY = metaY + 4;
      autoTable(doc, {
        ...pdfAutoTableBase,
        startY: tableStartY,
        head: [["Product ID", "Name", "Category", "Stock", "Status", "Price", "Created Date"]],
        body: tableData,
        columnStyles: {
          0: { cellWidth: 25 },
          1: { cellWidth: 35 },
          2: { cellWidth: 30 },
          3: { cellWidth: 15, halign: "center" },
          4: { cellWidth: 20 },
          5: { cellWidth: 20, halign: "right" },
          6: { cellWidth: 30 },
        },
      });

      // Add summary
      const finalY = doc.lastAutoTable.finalY + 10;
      const totalProducts = productsData.length;
      const totalStock = productsData.reduce((sum, product) => sum + (product.variants?.reduce((s, v) => s + (v.totalStock || 0), 0) || 0), 0);
      const totalValue = productsData.reduce((sum, product) => sum + parseFloat(product.price || 0), 0);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...pdfBrand.text);
      doc.text(`Total Products: ${totalProducts}`, margin, finalY);
      doc.text(`Total Stock: ${totalStock}`, margin, finalY + 6);
      doc.setTextColor(...pdfBrand.primary);
      doc.text(`Total Value: $${totalValue.toFixed(2)}`, margin, finalY + 12);
      doc.setTextColor(...pdfBrand.text);

      // Save PDF
      doc.save(`Products_Report_${Date.now()}.pdf`);
      message.success("Products exported successfully");
    } catch (error) {
      console.error("PDF export error:", error);
      message.error("Failed to export products");
    }
  };
  return (
    <MainContainer>
      <MainHeading>Products</MainHeading>
      <ProductsHeader>
        <SearchRow>
          <Search
            placeholder="Search products"
            onSearch={(value) => setSearchFilter(value)}
            onChange={handleSearch}
          />
        </SearchRow>
        <ActionsRow>
          <StyledButton onClick={handleAddProductClick}>Add Product</StyledButton>
        </ActionsRow>
      </ProductsHeader>
      <ToolbarRow>
        <Space size="middle" wrap>
          <Button icon={<ExportOutlined />} onClick={handleExportProducts}>
            Export
          </Button>
          <DatePicker.RangePicker
            placeholder={["Start Date", "End Date"]}
            suffixIcon={<CalendarOutlined />}
            format="YYYY-MM-DD"
            onChange={(dates, dateStrings) => handleDateChange(dates, dateStrings)}
            style={{ height: "32px" }}
          />
          <FilterDrawer
            visible={filterVisible}
            onClose={() => setFilterVisible(false)}
            onApplyFilter={handleApplyFilter}
            statusMap={STATUS_MAP}
            ownerType="product"
            ownerLabel="Owner"
            ownerKey="owner"
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
      <ProductListing
        searchFilter={searchFilter}
        startDate={startDate}
        endDate={endDate}
        onAddProduct={handleAddProductClick}
        onDataChange={setProductsData}
        filters={appliedFilters}
      />
    </MainContainer>
  );
};

export default ProductsComponent;
