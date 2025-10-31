import React, { useState, useEffect } from "react";
import { Table, Form, message, Spin } from "antd";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import PlusIcon from "../../../assets/Icons/plusIcon";
import DeleteIcon from "../../../assets/Icons/deleteIcon";
import { getColumns } from "./column";
import EditableCell from "./EditableCell";
import {
  FirstRow,
  IconWrapper,
  MainContainer,
  OptionForm,
  OptionNames,
  OptionValues,
  StyledButton,
  StyledHeading,
  StyledInput,
  StyledLabel,
  VariantsWrapper,
} from "./styles";
import uploadFileToS3 from "../../../utils/s3Upload";

const ProductOptions = ({ payload, setPayload }) => {
  const [options, setOptions] = useState([
    { id: Date.now(), name: "", values: [] },
  ]);
  const [variants, setVariants] = useState([]);
  const [form] = Form.useForm();

  const handleAddOption = () => {
    const newOption = { id: Date.now(), name: "", values: [] };
    const newOptions = [...options, newOption];
    setOptions(newOptions);
   setPayload((prevPayload) => ({
      ...prevPayload,
      options: newOptions,
    }));
  };

  const handleDeleteOption = (id) => {
    const updatedOptions = options.filter((option) => option.id !== id);
    setOptions(updatedOptions);
    setPayload((prevPayload) => ({
      ...prevPayload,
      options: updatedOptions,
    }));
  };

  const handleOptionNameChange = (id, newName) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, name: newName } : option
    );
    setOptions(updatedOptions);
    setPayload((prevPayload) => ({
      ...prevPayload,
      options: updatedOptions,
    }));
  };

  const handleTagChange = (id, newTags) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, values: newTags } : option
    );
    setOptions(updatedOptions);
    setPayload((prevPayload) => ({
      ...prevPayload,
      options: updatedOptions,
    }));
  };

  const cartesianProduct = (arrays) => {
    return arrays.reduce(
      (a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())),
      [[]]
    );
  };

  const generateVariants = () => {
    console.log("Generating variants with options:", options);
    if (options.length === 0) return [];
    const tagsArrays = options.map((option) => option.values);
    const newVariants = cartesianProduct(tagsArrays).map((variant, index) => ({
      key: index,
      name: variant.join(" / "),
      sku: "",
      MSRP: 0,
      price: 0,
      totalStock: 0,
      status: "OUT OF STOCK",
      image: "",
      imageKey: `variant_image_${index}`,
      uploading: false,
    }));
    setVariants(newVariants);
    setPayload((prevPayload) => ({
      ...prevPayload,
      variants: newVariants,
    }));
  };

  const handleSave = (updatedRow) => {
    const newVariants = variants.map((item) => {
      if (item.key === updatedRow.key) {
        return {
          ...item,
          ...updatedRow,
          status: updatedRow.totalStock > 0 ? "In Stock" : "Out of Stock",
        };
      }
      return item;
    });
    setVariants(newVariants);
    setPayload((prevPayload) => ({
      ...prevPayload,
      variants: newVariants,
    }));
  };

  const handleDelete = (key) => {
    const newVariants = variants.filter((item) => item.key !== key);
    setVariants(newVariants);
    setPayload((prevPayload) => ({
      ...prevPayload,
      variants: newVariants,
    }));
  };


  const handleImageChange = async (info, key) => {
    console.log("info object:", info);
    const fileObj = info.file;
    if (!fileObj) {
      console.error("No file object found");
      return;
    }
    console.log("File to be uploaded:", fileObj);
    const variantIndex = variants.findIndex((variant) => variant.key === key);
    if (variantIndex === -1) {
      console.error("Variant not found for key:", key);
      return;
    }
    let updatedVariants = [...variants];
    updatedVariants[variantIndex].uploading = true;
    setVariants(updatedVariants);
    setPayload((prevPayload) => ({ ...prevPayload, variants: updatedVariants }));
    try {
      const { url, key: s3Key } = await uploadFileToS3(fileObj);
      updatedVariants[variantIndex].image = url; 
      updatedVariants[variantIndex].s3Key = s3Key;
      updatedVariants[variantIndex].uploading = false;
      setVariants(updatedVariants);
      setPayload((prevPayload) => ({ ...prevPayload, variants: updatedVariants }));
      message.success("Variant image uploaded successfully");
    } catch (error) {
      updatedVariants[variantIndex].uploading = false;
      setVariants(updatedVariants);
      setPayload((prevPayload) => ({ ...prevPayload, variants: updatedVariants }));
      console.error("Error uploading variant image:", error);
      message.error("Error uploading variant image");
   }
  };

  const columns = getColumns(handleDelete, handleImageChange).map((col) => ({
    ...col,
    onCell: (record) => ({
      record,
      editable: col.editable,
      dataIndex: col.dataIndex,
      title: col.title,
      handleSave,
      form,
    }),
  }));

  return (
    <MainContainer>
      <FirstRow>
        <StyledHeading>Add Product Variant</StyledHeading>
        <span onClick={() => handleAddOption()}>
          <PlusIcon />
        </span>
      </FirstRow>
      {options.map((option) => (
        <OptionForm key={option.id}>
          <OptionNames>
            <StyledLabel>{`Option`}</StyledLabel>
            <StyledInput
              type="text"
              placeholder="Option title"
              value={option.name}
              onChange={(e) =>
                handleOptionNameChange(option.id, e.target.value)
              }
              required
            />
          </OptionNames>
          <OptionValues>
            <StyledLabel>{`Values`}</StyledLabel>
            <TagsInput
              value={option.values}
              onChange={(values) => handleTagChange(option.id, values)}
              inputProps={{ placeholder: "Values" }}
            />
          </OptionValues>
          <IconWrapper onClick={() => handleDeleteOption(option.id)}>
            <DeleteIcon />
          </IconWrapper>
        </OptionForm>
      ))}
      <VariantsWrapper>
        <StyledButton onClick={generateVariants}>
          Generate Variants
        </StyledButton>
        <div className="variants-list">
          <h2>Variants</h2>
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={variants}
              columns={columns}
              rowClassName="editable-row"
              pagination={false}
            />
          </Form>
        </div>
      </VariantsWrapper>
    </MainContainer>
  );
};

export default ProductOptions;

