import React, { useEffect, useState } from "react";
import { Modal, Spin } from "antd";
import getStatusInfo from "./statusUtils";
import { StarFilled } from "@ant-design/icons";
import "./productModal.css";
import { useGetProductByIdQuery } from "../../../api/authApi";

const ProductPreviewModal = ({ open, onClose, product, onDelete, onEdit }) => {
    console.log("🚀 ~ ProductPreviewModal ~ product:", product)
    const { data: freshProduct, isFetching } = useGetProductByIdQuery(product?.id, { skip: !product?.id });
    const mergedProduct = (freshProduct?.product) || product;
    const [selectedImage, setSelectedImage] = useState(mergedProduct?.images?.[0]?.url);
    const [showFull, setShowFull] = useState(false);
    useEffect(() => {
        setSelectedImage(mergedProduct?.images?.[0]?.url);
    }, [mergedProduct?.images]);

    if (!mergedProduct) return null;
    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width="min(1100px, calc(100vw - 32px))"
            centered
            className="product-preview-modal"
            destroyOnClose
        >
            {(isFetching) && (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px", width: "100%" }}>
                    <Spin spinning={isFetching} tip="Loading Product..." />
                </div>
            )}

            {/* Top actions across modal */}
            {!isFetching && (
                <>
                    <div className="modal-top-actions">
                        <div className="actions-right">
                            <button className="btn-danger" onClick={() => onDelete && onDelete(mergedProduct)}>Delete</button>
                            <button className="btn-outline" onClick={() => onEdit && onEdit(mergedProduct)}>Edit Product</button>
                        </div>
                    </div>
                    <div className="modal-top-divider" />
                </>
            )}

            <div className="modal-container">
                {!isFetching && (
                    <>
                        {/* LEFT IMAGES */}
                        <div className="left-images">
                            {mergedProduct.images?.map((img) => (
                                <div key={img.id} className="thumb-wrap" onClick={() => setSelectedImage(img.url)}>
                                    <img
                                        src={img.url}
                                        alt=""
                                        className={`side-thumb ${selectedImage === img.url ? 'active' : ''}`}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* CENTER MAIN IMAGE */}
                        <div className="main-image">
                            <div className="main-image-card">
                                <img
                                    src={selectedImage}
                                    alt={mergedProduct.name}
                                    className="large-img"
                                />
                            </div>
                        </div>

                        {/* RIGHT DETAILS */}
                        <div className="details-section">
                            <div className="top-actions">
                                {(() => {
                                    const info = getStatusInfo(mergedProduct.stock_status, mergedProduct);
                                    return <span style={info.style}>{info.text}</span>;
                                })()}
                            </div>
                            <h2 className="product-title">{mergedProduct.name}</h2>

                            {/* Rating + Reviews + Stock */}
                            <div className="rating-row">
                                <StarFilled style={{ color: "#faad14" }} />
                                <span style={{ marginLeft: 6, fontWeight: 500 }}>4.5</span>
                                <span style={{ marginLeft: 8, color: "#999" }}>
                                    ({mergedProduct.metaData?.totalComments || 0} Reviews)
                                </span>
                                {(() => {
                                    const info = getStatusInfo(mergedProduct.stock_status, mergedProduct);
                                    return (
                                        <span style={{ marginLeft: 12, color: info.style.color }}>
                                            ● {info.text}
                                        </span>
                                    );
                                })()}
                            </div>

                            <div className="divider" />

                            <div className="label-with-progress">
                                <p className="label" style={{ marginBottom: 6 }}>Dropship</p>
                                <div className="progress-track">
                                    <div className="progress-bar" style={{ width: '40%' }} />
                                </div>
                            </div>

                            {/* Prices */}
                            <div className="price-section">
                                <div>
                                    <p className="label">Price</p>
                                    <p className="value">${Number(mergedProduct.price || 0).toFixed(2)}</p>
                                </div>

                                <div>
                                    <p className="label">MSRP</p>
                                    <p className="value">${Number(mergedProduct.MSRP || 0).toFixed(2)}</p>
                                </div>
                            </div>

                            {/* Description */}
                            {/* <p className="description">{mergedProduct.description}</p> */}
                            <p className="description">
                                {showFull
                                    ? mergedProduct.description
                                    : mergedProduct.description.slice(0, 120) +
                                    (mergedProduct.description.length > 120 ? "..." : "")}

                                {mergedProduct.description.length > 120 && (
                                    <span
                                        onClick={() => setShowFull(!showFull)}
                                        style={{
                                            color: "#007bff",
                                            cursor: "pointer",
                                            marginLeft: "5px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {showFull ? "Read less" : "Read more"}
                                    </span>
                                )}
                            </p>
                            <div className="divider" />

                            {/* Variants Section */}
                            {mergedProduct.variants?.length > 0 && (
                                <>
                                    <p className="label" style={{ marginBottom: 8 }}>Variants</p>
                                    <div className="variant-grid">
                                        {mergedProduct.variants.map((v) => (
                                            <div key={v.id} className="variant-box">
                                                <img src={v.image} className="variant-img" alt="" />
                                                <p className="variant-name">{v.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}

            </div>
        </Modal>
    );
};

export default ProductPreviewModal;
