import React, { useEffect, useState } from "react";
import { Table, Spin, message } from "antd";
import { columns } from "./columns";
import { TableWrapper, ActionIcons } from "./styles";
import img from "../../../assets/Images/Img.png";
import img1 from "../../../assets/Images/Img1.png";
import { useGetUserProductsQuery } from "../../../api/authApi";

const data = [
  {
    key: "1",
    product: {
      name: "Handmade Pouch",
      variants: "3 Variants",
      image: img,
    },
    sku: "302012",
    category: "Bag & Pouch",
    stock: 10,
    price: "$121.00",
    status: "Low Stock",
    added: "22 Oct, 2020",
  },
  {
    key: "2",
    product: {
      name: "Smartwatch E2",
      variants: "2 Variants",
      image: img1,
    },
    sku: "302012",
    category: "Watch",
    stock: 10,
    price: "$121.00",
    status: "Published",
    added: "21 Sep, 2020",
  },
  // Add more data items here
];

const ProductListing = ({
  searchFilter,
  selectedDate,
}) => {
  const [sortInfo, setSortInfo] = useState({ sortBy: "created", sortOrder: "DESC" });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const {
    data: productListingData,
    error,
    isLoading,
  } = useGetUserProductsQuery({
    searchFilter,
    sortBy: sortInfo.sortBy,
    sortOrder: sortInfo.sortOrder,
    selectedDate, 
    page,
    limit,
  });

  console.log('\n\n prodcutttttt \n\n', productListingData);

  const handleTableChange = (pagination, filters, sorter) => {
    
    const { field, order } = sorter;
    const newSortOrder = order === "ascend" ? "ASC" : "DESC";
    setSortInfo({ sortBy: field, sortOrder: newSortOrder });
    setPage(pagination.current);
    setLimit(pagination.pageSize);
  };

  useEffect(() => {
    if (error) {
      message.error("Failed to load products");
    }
  }, [error]);

  return (
    <TableWrapper>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={productListingData?.products || []}
          rowKey="id"
          onChange={handleTableChange}
          pagination={{
            current: page,
            pageSize: limit,
            total: productListingData?.total || 0,
            showTotal: (total) => `Total ${total} items`,
            showSizeChanger: true,
          }}
        />
      )}
    </TableWrapper>
  );
};

export default ProductListing;
