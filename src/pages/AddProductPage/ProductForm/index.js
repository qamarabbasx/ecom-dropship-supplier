import React, { useState, useEffect } from "react";
import {
  DescriptionWrapper,
  FirstRow,
  ImagesWrapper,
  InputWrapper,
  MainContainer,
  StyledInput,
  StyledLabel,
  StyledSelect,
  StyledTextArea,
  BottomContainer,
  LeftCol,
  RightCol,
  ProductOrganization,
  ProductMetaData,
  StyledSaveButton,
} from "./styles";
import UploadImages from "../../UploadImages/Index";
import ProductOptions from "../ProductsVarients";
import {
  useAddProductMutation,
  useEditProductMutation,
  useGetCategoriesQuery,
} from "../../../api/productApi";
import { ADD_PRODUCT_PAYLOAD } from "../../../utils/constants";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = StyledSelect;

const ProductForm = ({ ProductData }) => {
  const navigate = useNavigate();
  const { data: categoriesData } = useGetCategoriesQuery();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const categories = categoriesData?.categories || [];

  const isEditMode = ProductData?.isEdit || false;
  const productInfo = ProductData?.product || null;

  const [payload, setPayload] = useState({
    ...ADD_PRODUCT_PAYLOAD,
    type: "THIRD_PARTY",
    category: "",
  });
  const [addProduct, { isLoading }] = useAddProductMutation();
  const [editProduct, { isLoading: isEditLoading }] = useEditProductMutation();
  const [customCategory, setCustomCategory] = useState("");
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [isMetaDataExpanded, setIsMetaDataExpanded] = useState(false);

  // Prefill form data when in edit mode
  useEffect(() => {
    if (isEditMode && productInfo) {
      // Check if category exists in categories list or is custom
      const categoryExists = categories.some(
        (cat) => cat.id === productInfo.category?.id
      );

      setPayload({
        id: productInfo.id || "",
        name: productInfo.name || "",
        description: productInfo.description || "",
        category: productInfo.category?.id || "",
        type: productInfo.type || "THIRD_PARTY",
        price: productInfo.price ? parseFloat(productInfo.price) : 0,
        MSRP: productInfo.MSRP ? parseFloat(productInfo.MSRP) : 0,
        badge: productInfo.badge || "",
        sku: productInfo.sku || "",
        stock_status: productInfo.stock_status || "",
        vendor: "", // Not in response, keep empty
        images: [], // Will be handled separately for existing images
        options:
          productInfo.options?.map((opt) => ({
            id: opt.id,
            name: opt.name,
            values: opt.values || [],
          })) || [],
        variants:
          productInfo.variants?.map((variant) => ({
            id: variant.id,
            name: variant.name,
            sku: variant.sku || "",
            price: variant.price || 0,
            MSRP: variant.MSRP || 0,
            totalStock: variant.totalStock || 0,
            lowStockThreshold: variant.lowStockThreshold || 10,
            image: variant.image || null,
            s3Key: variant.s3Key || null,
          })) || [],
        meta: {
          totalSales: productInfo.metaData?.totalSales || "",
          GMV: productInfo.metaData?.GMV || "",
          totalInfluencers: productInfo.metaData?.totalInfluencers || "",
          totalComments: productInfo.metaData?.totalComments || "",
        },
        existingImages: productInfo.images || [], // Keep track of existing images
      });

      // Handle custom category
      if (!categoryExists && productInfo.category?.name) {
        setIsCustomCategory(true);
        setCustomCategory(productInfo.category.name);
      }

      // Expand metadata if it exists
      if (productInfo.metaData) {
        setIsMetaDataExpanded(true);
      }
    }
  }, [isEditMode, productInfo, categories]);

  const handleInputField = (key, value) => {
    if (key === "category") {
      if (value === "others") {
        setIsCustomCategory(true);
        setCustomCategory("");
        setPayload({ ...payload, category: "" });
      } else if (
        Array.isArray(categories) &&
        categories.some((cat) => cat.id === value)
      ) {
        setIsCustomCategory(false);
        setPayload({ ...payload, category: value }); // value is the id
        setCustomCategory("");
      } else {
        setCustomCategory(value);
        setPayload({ ...payload, category: value });
      }
    } else {
      setPayload({ ...payload, [key]: value });
    }
  };

  const handleProductImages = (images) => {
    setPayload({ ...payload, images });
  };

  const handleMeta = (key, value) => {
    setPayload((prevPayload) => ({
      ...prevPayload,
      meta: {
        ...prevPayload.meta,
        [key]: value,
      },
    }));
  };

  const handleAddProduct = async () => {
    let formData = new FormData();

    const productPayload = {
      name: payload.name,
      description: payload.description,
      product_category: payload.category,
      type: payload.type,
      price: payload.price !== "" ? parseFloat(payload.price) : 0,
      MSRP: payload.MSRP !== "" ? parseFloat(payload.MSRP) : 0,
      badge: payload.badge,
      sku: payload.sku,
      stock_status: payload.stock_status,
      options: payload.options.map(({ name, values }) => ({ name, values })),
      variants: payload.variants.map((variant) => ({
        ...(isEditMode && variant.id && { id: variant.id }),
        name: variant.name,
        sku: variant.sku,
        price: variant.price !== "" ? parseFloat(variant.price) : 0,
        MSRP: variant.MSRP !== "" ? parseFloat(variant.MSRP) : 0,
        totalStock: variant.totalStock,
        lowStockThreshold: variant.lowStockThreshold,
        ...(variant.s3Key && { s3Key: variant.s3Key, image: variant.image }),
      })),
      // Remove totalVideos from metaData before sending
      metaData: (({ totalVideos, ...rest }) => rest)(payload.meta),
    };

    formData.append("product", JSON.stringify(productPayload));
    console.log("Form Data Product:", formData.get("product"));

    // Append product images (only new images)
    payload.images.forEach((file, index) => {
      formData.append("images", file);
    });

    // Append variant images
    payload.variants.forEach((variant, index) => {
      if (variant.image && typeof variant.image !== "string") {
        // Only append if it's a File object (new image), not a URL string
        formData.append(`variant_image_${index}`, variant.image);
      }
    });

    try {
      let response;

      if (isEditMode && payload.id) {
        // Call edit API with product ID
        response = await editProduct({ id: payload.id, formData });
      } else {
        // Call add API
        response = await addProduct(formData);
      }

      console.log(`${isEditMode ? "Edit" : "Add"} Product Response:`, response);

      if (response?.data) {
        message.success(
          isEditMode
            ? "Product Updated Successfully"
            : "Product Added Successfully"
        );
        navigate("/dashboard", { state: { selectedKey: "products" } });
      } else if (response?.error) {
        console.log("Product Response Error:", response?.error);
        message.error(
          `Failed to ${isEditMode ? "update" : "add"} product: ` +
            (response.error.data?.message || response.error.message)
        );
      }
    } catch (err) {
      console.log("Error with product:", err);
      message.error(`Failed to ${isEditMode ? "update" : "add"} product.`);
    }
  };

  return (
    <MainContainer>
      <FirstRow>
        <InputWrapper>
          <StyledLabel>{`Product Title`}</StyledLabel>
          <StyledInput
            placeholder="Enter Product Name"
            value={payload.name}
            onChange={(e) => handleInputField("name", e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <StyledLabel>{`Product Category`}</StyledLabel>
          {isCustomCategory ? (
            <StyledInput
              placeholder="Enter Category"
              value={customCategory}
              onChange={(e) => {
                setCustomCategory(e.target.value);
                setPayload({ ...payload, category: e.target.value });
              }}
            />
          ) : (
            <StyledSelect
              placeholder="Select Category"
              onChange={(value) => handleInputField("category", value)}
              value={payload.category || undefined}
            >
              {Array.isArray(categories) &&
                categories.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              <Option value="others">Others</Option>
            </StyledSelect>
          )}
        </InputWrapper>
        <InputWrapper>
          <StyledLabel>{`Product Price`}</StyledLabel>
          <StyledInput
            type="number"
            placeholder="$90"
            value={payload.price || ""}
            step="0.01"
            onChange={(e) =>
              handleInputField(
                "price",
                e.target.value === "" ? "" : parseFloat(e.target.value)
              )
            }
          />
        </InputWrapper>
        <InputWrapper>
          <StyledLabel>{`MSRP`}</StyledLabel>
          <StyledInput
            type="number"
            placeholder="$90"
            step="0.01"
            value={payload.MSRP || ""}
            onChange={(e) =>
              handleInputField(
                "MSRP",
                e.target.value === "" ? "" : parseFloat(e.target.value)
              )
            }
          />
        </InputWrapper>
      </FirstRow>

      <ImagesWrapper>
        <StyledLabel>{`Product Images`}</StyledLabel>
        <UploadImages
          handleProductImages={handleProductImages}
          existingImages={isEditMode ? payload.existingImages : []}
        />
      </ImagesWrapper>

      <DescriptionWrapper>
        <StyledLabel>{`Product Description `}</StyledLabel>
        <StyledTextArea
          rows={8}
          placeholder="Type Description"
          value={payload.description}
          onChange={(e) => handleInputField("description", e.target.value)}
        />
      </DescriptionWrapper>

      <BottomContainer>
        <LeftCol>
          <StyledLabel>{`Product Variants`}</StyledLabel>
          <ProductOptions payload={payload} setPayload={setPayload} />
          <ProductMetaData>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => setIsMetaDataExpanded(!isMetaDataExpanded)}
            >
              <StyledLabel style={{ margin: 0 }}>{`Add Metadata`}</StyledLabel>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#f88e48",
                }}
              >
                {isMetaDataExpanded ? "−" : "+"}
              </span>
            </div>
            {isMetaDataExpanded && (
              <div style={{ marginTop: "20px" }}>
                <StyledLabel>{`Product Total Sales`}</StyledLabel>
                <StyledInput
                  type="number"
                  placeholder="Enter Total Sales"
                  value={payload.meta.totalSales}
                  onChange={(e) => handleMeta("totalSales", e.target.value)}
                />
                <StyledLabel>{`GMV`}</StyledLabel>
                <StyledInput
                  type="number"
                  placeholder="Enter GMV ( $ )"
                  value={payload.meta.GMV}
                  onChange={(e) => handleMeta("GMV", e.target.value)}
                />
                <StyledLabel>{`Total Influencers`}</StyledLabel>
                <StyledInput
                  type="number"
                  placeholder="Enter Total Influencers"
                  value={payload.meta.totalInfluencers}
                  onChange={(e) =>
                    handleMeta("totalInfluencers", e.target.value)
                  }
                />
                {/* Removed Total Videos field as it does not exist in backend */}
                <StyledLabel>{`Total Comments`}</StyledLabel>
                <StyledInput
                  type="number"
                  placeholder="Enter Total Comments"
                  value={payload.meta.totalComments}
                  onChange={(e) => handleMeta("totalComments", e.target.value)}
                />
              </div>
            )}
          </ProductMetaData>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <StyledSaveButton
              size="large"
              onClick={handleAddProduct}
              loading={isLoading || isEditLoading}
              disabled={isLoading || isEditLoading}
            >
              {isLoading || isEditLoading
                ? isEditMode
                  ? "Updating Product..."
                  : "Adding Product..."
                : isEditMode
                ? "Update Product"
                : "Add Product"}
            </StyledSaveButton>
          </div>
        </LeftCol>
        <RightCol>
          <StyledLabel>{`Product Organization`}</StyledLabel>
          <ProductOrganization>
            <StyledLabel>{`Product Badge`}</StyledLabel>
            <StyledSelect
              placeholder="Enter Product Badge"
              value={payload.badge || undefined}
              onChange={(value) => handleInputField("badge", value)}
            >
              <Option value="SOLD">Sold</Option>
              <Option value="NEW">New</Option>
              <Option value="INCOMMING">Incomming</Option>
            </StyledSelect>
            <StyledLabel>{`Vendors`}</StyledLabel>
            <StyledInput
              placeholder="Vendor Name"
              value={payload.vendor || ""}
              onChange={(e) => handleInputField("vendor", e.target.value)}
            />
            <StyledLabel>{`Stock Status`}</StyledLabel>
            <StyledSelect
              placeholder="Select Status"
              value={payload.stock_status || undefined}
              onChange={(value) => handleInputField("stock_status", value)}
            >
              <Option value="IN_STOCK">IN STOCK</Option>
              <Option value="OUT_OF_STOCK">OUT OF STOCK</Option>
              <Option value="BACK_ORDER">BACK ORDER</Option>
            </StyledSelect>
            {/* <StyledLabel>{`Product Type`}</StyledLabel>
            <StyledSelect
              placeholder="Enter Product Type"
              value={payload.type || undefined}
              onChange={(value) => handleInputField("type", value)}
            >
              <Option value="BEST_SELLING">Best Selling</Option>
              <Option value="REQUESTED">Requested</Option>
              <Option value="PRIVATE_SOURCE">Private Sourcing</Option>
              <Option value="THIRD_PARTY">Third Party</Option>
            </StyledSelect> */}
            <StyledLabel>{`Product SKU`}</StyledLabel>
            <StyledInput
              placeholder="Enter Product SKU"
              value={payload.sku || ""}
              onChange={(e) => handleInputField("sku", e.target.value)}
            />
          </ProductOrganization>
        </RightCol>
      </BottomContainer>
    </MainContainer>
  );
};

export default ProductForm;
