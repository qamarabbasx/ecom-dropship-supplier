// import Layout from "layout";
import React from "react";
import { MainHeading } from "./styles";
import ProductFrom from "./ProductForm";

const AddProductPage = ({ ProductData }) => {
  return (
    <>
      {/* <StyledBreadCrumbs items={items} /> */}
      <MainHeading>
        {ProductData?.isEdit ? `Edit Product` : `Add New Product`}
      </MainHeading>
      <ProductFrom ProductData={ProductData} />
    </>
  );
};

export default AddProductPage;
