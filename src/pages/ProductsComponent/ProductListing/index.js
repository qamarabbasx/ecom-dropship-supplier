import React, { useEffect, useState } from "react";
import { Table, message, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getColumns } from "./columns";
import DeleteProductModal from "./DeleteModal";
import { TableWrapper, ExpandedRowWrapper } from "./styles";
import {
  useGetUserProductsQuery,
  useDeleteProductsMutation,
} from "../../../api/authApi";
import ProductPreviewModal from "./ProductPreviewModal";
import { useNavigate } from "react-router-dom";

const ProductListing = ({
  searchFilter,
  startDate,
  endDate,
  onAddProduct,
  onDataChange,
  filters = {},
}) => {
  const navigate = useNavigate();
  // Use onAddProduct for edit
  const handleEdit = (record) => {
    if (typeof onAddProduct === "function") {
      onAddProduct({ product: record, isEdit: true });
    }
  };
  const [sortInfo, setSortInfo] = useState({
    sortBy: "created",
    sortOrder: "DESC",
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const {
    data: productListingData,
    error,
    isLoading,
    refetch,
  } = useGetUserProductsQuery({
    searchFilter,
    sortBy: sortInfo.sortBy,
    sortOrder: sortInfo.sortOrder,
    startDate,
    endDate,
    page,
    limit,
    status:
      filters?.status && filters.status !== "All" ? filters.status : undefined,
    owner: filters?.owner && filters.owner.length > 0 ? filters.owner.join(",") : undefined,
  });
  const handleTableChange = (pagination, filters, sorter) => {
    const { field, order } = sorter;
    const newSortOrder = order === "ascend" ? "ASC" : "DESC";
    setSortInfo({ sortBy: field, sortOrder: newSortOrder });
    setPage(pagination.current);
    setLimit(pagination.pageSize);
  };

  // Delete modal state
  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDeleteClick = (record) => {
    setSelectedProduct(record);
    setOpen(true);
  };
  const handlePreview = (record) => {
    setSelectedProduct(record);
    setPreviewOpen(true);
  };

  const [deleteProducts, { isLoading: isDeleting }] =
    useDeleteProductsMutation();

  const handleConfirmDelete = async () => {
    if (!selectedProduct?.id) {
      message.error("No product selected");
      return;
    }
    try {
      const res = await deleteProducts([selectedProduct.id]).unwrap();
      const successMsg =
        typeof res?.message === "string"
          ? res.message
          : res?.message?.message || "Product deleted!";
      message.success(successMsg);
      setOpen(false);
      setSelectedProduct(null);
      navigate("/dashboard", { state: { selectedKey: "products" } });
      // Refresh list
      refetch();
    } catch (e) {
      const errorMsg =
        typeof e?.data?.message === "string"
          ? e.data.message
          : e?.data?.message?.message || "Failed to delete product";
      message.error(errorMsg);
    }
  };

  const handleCancelDelete = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const expandedRowRender = (record) => (
    <ExpandedRowWrapper>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 200px",
          gap: 40,
          alignItems: "flex-start",
        }}
      >
        <div>
          <strong
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#1f1f1f",
              display: "block",
              marginBottom: 8,
            }}
          >
            Description
          </strong>
          <p
            style={{ margin: 0, color: "#666", fontSize: 13, lineHeight: 1.6 }}
          >
            {record.description || "No description available"}
          </p>
        </div>
        <div>
          <strong
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#1f1f1f",
              display: "block",
              marginBottom: 8,
            }}
          >
            MSRP
          </strong>
          <p style={{ margin: 0, color: "#666", fontSize: 13 }}>
            ${(record.MSRP || 0).toFixed(2)}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 8,
          marginTop: 16,
          justifyContent: "flex-end",
        }}
      >
        <Button
          type="text"
          size="small"
          icon={<EditOutlined />}
          style={{ color: "#666", fontSize: 14 }}
        />
        <Button
          type="text"
          size="small"
          icon={<DeleteOutlined />}
          style={{ color: "#ff4d4f", fontSize: 14 }}
        />
      </div>
    </ExpandedRowWrapper>
  );

  useEffect(() => {
    if (error) {
      message.error("Failed to load products");
    }
  }, [error]);

  useEffect(() => {
    if (productListingData?.products && onDataChange) {
      onDataChange(productListingData.products);
    }
  }, [productListingData, onDataChange]);

  // Reset to first page when filters change (so user sees filtered results from page 1)
  useEffect(() => {
    if (filters) {
      setPage(1);
    }
  }, [filters]);

  // Reset to first page when date range changes
  useEffect(() => {
    setPage(1);
  }, [startDate, endDate]);
  console.log(productListingData?.products)
  return (
    <TableWrapper>
      <Table
        columns={getColumns({
          onDelete: handleDeleteClick,
          onView: handlePreview,
          onEdit: handleEdit,
        })}
        dataSource={productListingData?.products || []}
        rowKey="id"
        onChange={handleTableChange}
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: limit,
          total: productListingData?.total || 0,
          onChange: (newPage, newPageSize) => {
            setPage(newPage);
            setLimit(newPageSize);
          },
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
        expandable={{
          expandedRowRender,
          expandedRowKeys,
          onExpandedRowsChange: setExpandedRowKeys,
          expandIcon: () => null,
          columnWidth: 0,
        }}
        rowSelection={{
          type: "checkbox",
        }}
      />
      <DeleteProductModal
        open={open}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
      />
      <ProductPreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        product={selectedProduct}
        onDelete={handleDeleteClick}
        onEdit={handleEdit}
      />
    </TableWrapper>
  );
};

export default ProductListing;
