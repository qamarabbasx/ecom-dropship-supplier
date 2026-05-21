import { Modal, Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";

const DeleteProductModal = ({ open, onCancel, onConfirm, loading }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={400}
      closeIcon={<span style={{ fontSize: "18px", color: "#999" }}>×</span>}
      bodyStyle={{
        padding: "30px 20px",
        textAlign: "center",
        borderRadius: "12px",
      }}
    >
      {/* Icon Circle */}
      <div
        style={{
          width: 80,
          height: 80,
          margin: "0 auto",
          background: "#ffecec",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <DeleteFilled style={{ fontSize: 36, color: "#ff4d4f" }} />
      </div>

      {/* Title */}
      <h2 style={{ marginBottom: 10, fontSize: 20, fontWeight: 600 }}>
        Delete Product
      </h2>

      {/* Description */}
      <p style={{ marginBottom: 30, color: "#7d7d7d" }}>
        Do you want to delete this product?
      </p>

      {/* Footer Buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: 15 }}>
        <Button
          onClick={onCancel}
          style={{
            height: 40,
            padding: "0 22px",
            borderRadius: 8,
          }}
        >
          Cancel
        </Button>

        <Button
          type="primary"
          danger
          onClick={onConfirm}
          loading={loading}
          disabled={loading}
          style={{
            height: 40,
            padding: "0 22px",
            borderRadius: 8,
            background: "#ff6b00",
            borderColor: "#ff6b00",
          }}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteProductModal;
