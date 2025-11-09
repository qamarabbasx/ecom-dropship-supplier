import React, { useState } from "react";
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
import { useAddProductMutation } from "../../../api/productApi";
import { ADD_PRODUCT_PAYLOAD } from "../../../utils/constants";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = StyledSelect;

const PREDEFINED_CATEGORIES = [
  "Electronics",
  "Home & Kitchen",
  "Beauty",
  "Sports",
  "Toys",
  "others",
];

const ProductForm = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    ...ADD_PRODUCT_PAYLOAD,
    type: "THIRD_PARTY",
    category: "",
  });
  const [addProduct, { isLoading }] = useAddProductMutation();
  const [customCategory, setCustomCategory] = useState("");
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [isMetaDataExpanded, setIsMetaDataExpanded] = useState(false);

  const handleInputField = (key, value) => {
    if (key === "category") {
      if (value === "others") {
        setIsCustomCategory(true);
        setCustomCategory("");
        setPayload({ ...payload, category: "" });
      } else if (PREDEFINED_CATEGORIES.includes(value)) {
        setIsCustomCategory(false);
        setPayload({ ...payload, category: value });
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
    formData.append(
      "product",
      JSON.stringify({
        name: payload.name,
        description: payload.description,
        category: payload.category,
        type: payload.type,
        price: payload.price,
        MSRP: payload.MSRP,
        badge: payload.badge,
        sku: payload.sku,
        stock_status: payload.stock_status,
        options: payload.options.map(({ name, values }) => ({ name, values })),
        variants: payload.variants.map((variant) => ({
          name: variant.name,
          sku: variant.sku,
          price: variant.price,
          MSRP: variant.MSRP,
          totalStock: variant.totalStock,
          lowStockThreshold: variant.lowStockThreshold,
          ...(variant.s3Key && { s3Key: variant.s3Key, image: variant.image }),
        })),
        metaData: payload.meta,
      })
    );
    console.log("Form Data Product:", formData.get("product"));

    // Append product images
    payload.images.forEach((file, index) => {
      formData.append("images", file);
    });

    // Append variant images
    payload.variants.forEach((variant, index) => {
      if (variant.image) {
        formData.append(`variant_image_${index}`, variant.image);
      }
    });
    try {
      const response = await addProduct(formData);
      console.log("Add Product Response:", response);
      if (response?.data) {
        message.success("Product Added");
        navigate("/dashboard", { state: { selectedKey: "products" } });
      } else if (response?.error) {
        console.log("Add Product Response:response?.error", response?.error);
        message.error("Failed to add product: " + (response.error.data?.message || response.error.message));
      }
    } catch (err) {
      console.log("Error adding product:", err);
      message.error("Failed to add product.");
    }
  };

  return (
    <MainContainer>
      <FirstRow>
        <InputWrapper>
          <StyledLabel>{`Product Title`}</StyledLabel>
          <StyledInput
            placeholder="Enter Product Name"
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
              value={PREDEFINED_CATEGORIES.includes(payload.category) ? payload.category : undefined}
            >
              <Option value="Electronics">Electronics</Option>
              <Option value="Home & Kitchen">Home & Kitchen</Option>
              <Option value="Beauty">Beauty</Option>
              <Option value="Sports">Sports</Option>
              <Option value="Toys">Toys</Option>
              <Option value="others">Others</Option>
            </StyledSelect>
          )}
        </InputWrapper>
        <InputWrapper>
          <StyledLabel>{`Product Price`}</StyledLabel>
          <StyledInput
            type="number"
            placeholder="$90"
            onChange={(e) =>
              handleInputField("price", parseInt(e.target.value))
            }
          />
        </InputWrapper>
        <InputWrapper>
          <StyledLabel>{`MSRP`}</StyledLabel>
          <StyledInput
            type="number"
            placeholder="$90"
            onChange={(e) => handleInputField("MSRP", parseInt(e.target.value))}
          />
        </InputWrapper>
      </FirstRow>

      <ImagesWrapper>
        <StyledLabel>{`Product Images`}</StyledLabel>
        <UploadImages handleProductImages={handleProductImages} />
      </ImagesWrapper>

      <DescriptionWrapper>
        <StyledLabel>{`Product Description `}</StyledLabel>
        <StyledTextArea
          rows={8}
          placeholder="Type Description"
          onChange={(e) => handleInputField("description", e.target.value)}
        />
      </DescriptionWrapper>

      <BottomContainer>
        <LeftCol>
          <StyledLabel>{`Product Variants`}</StyledLabel>
          <ProductOptions payload={payload} setPayload={setPayload} />
          <br />
          <StyledLabel>{`Metadata`}</StyledLabel>
          <ProductMetaData>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                // padding: "0px 0",
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
                  onChange={(e) => handleMeta("totalSales", e.target.value)}
                />
                <StyledLabel>{`GMV`}</StyledLabel>
                <StyledInput
                  type="number"
                  placeholder="Enter GMV ( $ )"
                  onChange={(e) => handleMeta("GMV", e.target.value)}
                />
                <StyledLabel>{`Total Influencers`}</StyledLabel>
                <StyledInput
                  type="number"
                  placeholder="Enter Total Influencers"
                  onChange={(e) => handleMeta("totalInfluencers", e.target.value)}
                />
                <StyledLabel>{`Total Videos`}</StyledLabel>
                <StyledInput
                  type="number"
                  placeholder="Enter Total Videos"
                  onChange={(e) => handleMeta("totalVideos", e.target.value)}
                />
                <StyledLabel>{`Total Comments`}</StyledLabel>
                <StyledInput
                  type="number"
                  placeholder="Enter Total Comments"
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
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Adding Product..." : "Add Product"}
            </StyledSaveButton>
          </div>
        </LeftCol>
        <RightCol>
          <StyledLabel>{`Product Organization`}</StyledLabel>
          <ProductOrganization>
            <StyledLabel>{`Product Badge`}</StyledLabel>
            <StyledSelect
              placeholder="Enter Product Badge"
              onChange={(value) => handleInputField("badge", value)}
            >
              <Option value="SOLD">Sold</Option>
              <Option value="NEW">New</Option>
              <Option value="INCOMMING">Incomming</Option>
              {/* <Option value="TICK_TOK_VERIFIED">Tiktok Verified </Option> */} 
            </StyledSelect>
            <StyledLabel>{`Vendors`}</StyledLabel>
            <StyledInput
              placeholder="Vendor Name"
              onChange={(e) => handleInputField("vendor", e.target.value)}
            />
            <StyledLabel>{`Stock Status`}</StyledLabel>
            <StyledSelect
              placeholder="Select Status"
              onChange={(value) => handleInputField("stock_status", value)}
            >
              <Option value="IN_STOCK">IN STOCK</Option>
              <Option value="OUT_OF_STOCK">OUT OF STOCK</Option>
              <Option value="BACK_ORDER">BACK ORDER</Option>
            </StyledSelect>
            {/* <StyledLabel>{`Product Type`}</StyledLabel> */}
            {/* <StyledSelect
              placeholder="Enter Product Type"
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
              onChange={(e) => handleInputField("sku", e.target.value)}
            />
          </ProductOrganization>
          {/* <StyledLabel>{`Product Meta Data`}</StyledLabel>
          <ProductMetaData>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                // padding: "0px 0",
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
                  placeholder="Enter Total Sales"
                  onChange={(e) => handleMeta("totalSales", e.target.value)}
                />
                <StyledLabel>{`GMV`}</StyledLabel>
                <StyledInput
                  placeholder="Enter GMV"
                  onChange={(e) => handleMeta("GMV", e.target.value)}
                />
                <StyledLabel>{`Total Influencers`}</StyledLabel>
                <StyledInput
                  placeholder="Enter Total Influencers"
                  onChange={(e) => handleMeta("totalInfluencers", e.target.value)}
                />
                <StyledLabel>{`Total Videos`}</StyledLabel>
                <StyledInput
                  placeholder="Enter Total Videos"
                  onChange={(e) => handleMeta("totalVideos", e.target.value)}
                />
                <StyledLabel>{`Total Comments`}</StyledLabel>
                <StyledInput
                  placeholder="Enter Total Comments"
                  onChange={(e) => handleMeta("totalComments", e.target.value)}
                />
              </div>
            )}
          </ProductMetaData> */}
        </RightCol>
      </BottomContainer>
    </MainContainer>
  );
};

export default ProductForm;
