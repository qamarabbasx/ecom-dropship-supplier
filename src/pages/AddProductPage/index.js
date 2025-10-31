// import Layout from "layout";
import React from "react";
import { MainHeading, StyledBreadCrumbs } from "./styles";
import ProductFrom from "./ProductForm";

const items = [
  {
    title: <a href="">Added Product</a>,
  },
  {
    title: <a href="">Add New Product</a>,
  },
];

const AddProductPage = () => {
  return (
    <>
      {/* <StyledBreadCrumbs items={items} /> */}
      <MainHeading>{`Add New Product`}</MainHeading>
      <ProductFrom />
    </>
  );
};

export default AddProductPage;
