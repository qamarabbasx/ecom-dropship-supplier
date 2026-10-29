import React, { useEffect, useState } from "react";
import { Modal, Radio, InputNumber, Input, message } from "antd";
import { useRefundOrderMutation } from "../../api/authApi";

const toCents = (value) => Math.round(Number(value || 0) * 100);
const formatMoney = (cents) => `$${(Math.max(cents, 0) / 100).toFixed(2)}`;

/**
 * What is still refundable on an order, mirroring the backend's limits: the
 * whole order can go back as credits, but only the card-paid part can go back
 * to the card.
 */
export const getRefundableCents = (order) => {
  const totalCents = toCents(order?.amount);
  const refundedCents =
    Number(order?.refundedCreditsCents || 0) + Number(order?.refundedStripeCents || 0);
  const remainingCents = Math.max(totalCents - refundedCents, 0);
  const paidByCard = String(order?.stripePaymentIntentId || "").startsWith("pi_");
  const cardPaidCents = paidByCard
    ? Math.max(totalCents - Number(order?.creditsAppliedCents || 0), 0)
    : 0;
  const cardRemainingCents = Math.min(
    remainingCents,
    Math.max(cardPaidCents - Number(order?.refundedStripeCents || 0), 0)
  );
  return { totalCents, refundedCents, remainingCents, cardRemainingCents };
};

const RefundOrderModal = ({ open, order, onClose, onSuccess }) => {
  const [refundOrder, { isLoading }] = useRefundOrderMutation();
  const [method, setMethod] = useState("CREDITS");
  const [amount, setAmount] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (open) {
      setMethod("CREDITS");
      setAmount(null);
      setReason("");
    }
  }, [open]);

  if (!order) return null;

  const { totalCents, refundedCents, remainingCents, cardRemainingCents } =
    getRefundableCents(order);
  const maxCents = method === "STRIPE" ? cardRemainingCents : remainingCents;

  const handleSubmit = async () => {
    const amountCents = amount == null ? maxCents : toCents(amount);
    if (amountCents <= 0) {
      message.error("Nothing left to refund with this method");
      return;
    }
    if (amountCents > maxCents) {
      message.error(`At most ${formatMoney(maxCents)} can be refunded this way`);
      return;
    }
    try {
      const result = await refundOrder({
        orderId: order.id,
        method,
        amount: amountCents / 100,
        reason: reason.trim() || undefined,
      }).unwrap();
      message.success(result?.message || "Order refunded");
      onSuccess?.();
      onClose();
    } catch (error) {
      message.error(error?.data?.message || "Failed to refund order");
    }
  };

  return (
    <Modal
      title="Refund order"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Refund"
      okButtonProps={{ loading: isLoading, disabled: maxCents <= 0 }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ color: "#595959", fontSize: 13, lineHeight: 1.8 }}>
          <div>Order total: {formatMoney(totalCents)}</div>
          <div>Already refunded: {formatMoney(refundedCents)}</div>
          <div style={{ fontWeight: 600, color: "#262626" }}>
            Left to refund: {formatMoney(remainingCents)}
          </div>
        </div>

        <div>
          <div style={{ marginBottom: 8, fontWeight: 500 }}>Refund to</div>
          <Radio.Group
            value={method}
            onChange={(e) => {
              setMethod(e.target.value);
              setAmount(null);
            }}
            style={{ display: "flex", flexDirection: "column", gap: 8 }}
          >
            <Radio value="CREDITS">
              Store credits (up to {formatMoney(remainingCents)}, added to the dropshipper's wallet)
            </Radio>
            <Radio value="STRIPE" disabled={cardRemainingCents <= 0}>
              Card via Stripe (up to {formatMoney(cardRemainingCents)}, only what the card paid)
            </Radio>
          </Radio.Group>
        </div>

        <div>
          <div style={{ marginBottom: 8, fontWeight: 500 }}>Amount</div>
          <InputNumber
            style={{ width: "100%" }}
            min={0.01}
            max={maxCents / 100}
            step={0.01}
            precision={2}
            prefix="$"
            value={amount}
            onChange={setAmount}
            placeholder={`Leave empty to refund ${formatMoney(maxCents)}`}
          />
        </div>

        <div>
          <div style={{ marginBottom: 8, fontWeight: 500 }}>Reason (optional)</div>
          <Input.TextArea
            rows={3}
            maxLength={500}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Shown in the dropshipper's credit history"
          />
        </div>

        <div style={{ color: "#8c8c8c", fontSize: 12 }}>
          The platform covers refunds; the supplier payout is not changed.
        </div>
      </div>
    </Modal>
  );
};

export default RefundOrderModal;
