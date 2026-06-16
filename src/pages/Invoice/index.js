import React from "react";
import { useParams } from "react-router-dom";
import { Table, Spin, message } from "antd";
import {
  FilePdfOutlined,
  MailOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useGetInvoiceByIdQuery } from "../../api/authApi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../assets/Images/logo.png";
import { pdfBrand, pdfAutoTableBase, drawExportReportHeaderPt } from "../../theme/exportPdfTheme";

const InvoiceContainer = styled.div`
  padding: 0;
  background: #fff;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const InvoiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px 60px;
  border-bottom: 1px solid #e8e8e8;

  @media (max-width: 768px) {
    padding: 20px 16px;
    flex-direction: column;
    gap: 12px;
  }
`;

const LogoSection = styled.div`
  img {
    width: 130px;
    height: auto;
  }
`;

const CompanyInfoRight = styled.div`
  text-align: right;

  .company-name {
    font-size: 14px;
    font-weight: 600;
    color: #000;
    margin-bottom: 4px;
  }

  .company-detail {
    font-size: 12px;
    color: #666;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const ActionButtonsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 60px;
  border-bottom: 1px solid #e8e8e8;

  @media (max-width: 768px) {
    padding: 12px 16px;
    justify-content: flex-start;
  }
`;

const IconButton = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #1890ff;
    color: #1890ff;
  }

  svg {
    font-size: 18px;
  }
`;

const InvoiceContent = styled.div`
  padding: 40px 60px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const InvoiceTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  .invoice-label {
    font-size: 16px;
    font-weight: 600;
    color: #000;
  }

  .invoice-number {
    font-size: 16px;
    font-weight: 600;
    color: #000;
  }

  .invoice-date {
    font-size: 14px;
    color: #666;
    margin-top: 4px;
  }

  @media (max-width: 768px) {
    margin-bottom: 24px;
    align-items: flex-start;
    gap: 8px;
  }
`;

const AddressContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 24px;
  }
`;

const AddressBlock = styled.div`
  .label {
    font-size: 14px;
    font-weight: 600;
    color: #000;
    margin-bottom: 12px;
  }

  .name {
    font-size: 14px;
    font-weight: 600;
    color: #000;
    margin-bottom: 6px;
  }

  .detail {
    font-size: 13px;
    color: #666;
    line-height: 1.8;
  }
`;

const AmountDueBox = styled.div`
  background: #fff1f0;
  border: 1px solid #ffa39e;
  border-radius: 8px;
  padding: 20px 24px;
  margin-bottom: 40px;

  .amount {
    font-size: 32px;
    font-weight: 700;
    color: #ff4d4f;
    margin-bottom: 4px;
  }

  .due-text {
    font-size: 14px;
    color: #595959;
  }

  @media (max-width: 768px) {
    padding: 16px;
    margin-bottom: 24px;

    .amount {
      font-size: 34px;
    }
  }
`;

const StyledTable = styled(Table)`
  .ant-table-wrapper {
    overflow-x: auto;
  }

  .ant-table {
    font-size: 13px;
  }

  .ant-table-thead > tr > th {
    background: #fafafa;
    font-weight: 600;
    color: #000;
    border-bottom: 1px solid #e8e8e8;
    padding: 16px;
  }

  .ant-table-tbody > tr > td {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
  }

  @media (max-width: 768px) {
    .ant-table {
      min-width: 560px;
      font-size: 12px;
    }

    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      padding: 10px;
    }
  }
`;

const SummarySection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;

  .summary-content {
    width: 350px;
  }

  @media (max-width: 768px) {
    justify-content: stretch;
    margin-top: 16px;

    .summary-content {
      width: 100%;
    }
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  font-size: 14px;
  color: #000;
  border-bottom: 1px solid #f0f0f0;

  &.no-border {
    border-bottom: none;
  }

  &.total {
    font-weight: 600;
    font-size: 15px;
    padding-top: 16px;
    border-top: 2px solid #e8e8e8;
  }

  &.amount-due {
    font-weight: 700;
    font-size: 16px;
    color: #ff4d4f;
    padding-top: 12px;
  }
`;

const InvoiceDetail = ({ invoiceId: propInvoiceId }) => {
  const { id: paramInvoiceId } = useParams();
  const invoiceId = propInvoiceId || paramInvoiceId;
  const {
    data: invoiceData,
    isLoading,
    error,
  } = useGetInvoiceByIdQuery(invoiceId);

  React.useEffect(() => {
    if (error) {
      message.error(error?.data?.message || "Failed to load invoice");
    }
  }, [error]);

  const handleExportPDF = () => {
    if (!invoiceData) return;

    const doc = new jsPDF("p", "pt", "a4");
    const invoice = invoiceData;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 60;

    const subtotal = parseFloat(
      invoice.grossAmount || invoice.order?.amount || 0
    );
    const taxString = invoice.tax || "0%";
    const taxPercentage = parseFloat(taxString.replace("%", "")) || 0;
    const tax = (subtotal * taxPercentage) / 100;
    const total = subtotal + tax;

    let yPos = drawExportReportHeaderPt(doc, {
      title: "Invoice",
      subtitle: "ECOM",
      logoSrc: logo,
      margin,
    });

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...pdfBrand.text);
    doc.text(
      invoice.supplier?.companyName || "Company Name",
      pageWidth - margin,
      yPos,
      { align: "right" }
    );
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...pdfBrand.textMuted);
    const compAddressLine1 = invoice.supplier?.address || "Company address";
    const compAddressLine2 = `${invoice.supplier?.city || "City"}, ${invoice.supplier?.country || "Country"
      } - ${invoice.supplier?.zipCode || "00000"}`;
    const compPhone = invoice.supplier?.phone || "+0 (000) 123-4567";
    doc.text(compAddressLine1, pageWidth - margin, yPos + 15, {
      align: "right",
    });
    doc.text(compAddressLine2, pageWidth - margin, yPos + 28, {
      align: "right",
    });
    doc.text(compPhone, pageWidth - margin, yPos + 41, {
      align: "right",
    });

    yPos += 55;
    doc.setDrawColor(...pdfBrand.border);
    doc.line(margin, yPos, pageWidth - margin, yPos);

    yPos += 40;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...pdfBrand.text);
    doc.text(`Invoice #${invoice.invoiceNumber || invoice.id}`, margin, yPos);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...pdfBrand.textMuted);
    const invoiceDate = new Date(invoice.created).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    doc.text(`Date ${invoiceDate}`, pageWidth - margin, yPos, {
      align: "right",
    });

    // To and From sections (aligned to UI data)
    yPos += 35;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...pdfBrand.text);
    const leftX = margin;
    const rightX = pageWidth / 2 + 30;
    doc.text("To", leftX, yPos);
    doc.text("From", rightX, yPos);

    // Names
    yPos += 18;
    doc.setFont("helvetica", "bold");
    const toName = invoice.customer
      ? `${invoice.customer.firstName} ${invoice.customer.lastName}`
      : invoice.supplier?.companyName || "Company Name";
    const fromName = invoice.customer
      ? `${invoice.customer.firstName} ${invoice.customer.lastName}`
      : invoice.supplier?.companyName || "Company Name";
    doc.text(toName, leftX, yPos);
    doc.text(fromName, rightX, yPos);

    // Details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...pdfBrand.textMuted);

    // Left (To)
    let toY = yPos + 15;
    if (invoice.customer?.shippingAddress) {
      const address = invoice.customer.shippingAddress?.streetAddress || "";
      const apt = invoice.customer.shippingAddress.apartmentNumber
        ? `, ${invoice.customer.shippingAddress.apartmentNumber}`
        : "";
      doc.text(`${address}${apt}`, leftX, toY);
      toY += 13;
      doc.text(
        `${invoice.customer.shippingAddress.state || ""} - ${invoice.customer.shippingAddress.zip || ""
        }`,
        leftX,
        toY
      );
      toY += 13;
      if (invoice.customer.phoneNumber) {
        doc.text(invoice.customer.phoneNumber, leftX, toY);
        toY += 13;
      }
      if (invoice.customer.email) {
        doc.text(invoice.customer.email, leftX, toY);
      }
    } else {
      const sAddr1 = invoice.supplier?.address || "Company address";
      const sAddr2 = `${invoice.supplier?.city || "City"}, ${invoice.supplier?.country || "Country"
        } - ${invoice.supplier?.zipCode || "00000"}`;
      const sPhone = invoice.supplier?.phone || "+0 (000) 123-4567";
      doc.text(sAddr1, leftX, toY);
      toY += 13;
      doc.text(sAddr2, leftX, toY);
      toY += 13;
      doc.text(sPhone, leftX, toY);
    }

    // Right (From)
    let fromY = yPos + 15;
    const fromEmail = invoice.customer?.email || invoice.supplier?.email || "email@example.com";
    const fromPhone = invoice.customer?.phoneNumber || invoice.supplier?.phone || "+0 (000) 123-4567";
    doc.text(fromEmail, rightX, fromY);
    fromY += 13;
    doc.text(fromPhone, rightX, fromY);

    // Align next section
    yPos = Math.max(toY, fromY) + 35;

    doc.setFillColor(...pdfBrand.primarySoft);
    doc.setDrawColor(...pdfBrand.primary);
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 60, 5, 5, "FD");

    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...pdfBrand.primary);
    doc.text(`$${total.toFixed(2)}`, margin + 20, yPos + 32);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...pdfBrand.textMuted);
    const dueDate = new Date(
      invoice.dueDate ||
      new Date(invoice.created).setDate(
        new Date(invoice.created).getDate() + 15
      )
    ).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    doc.text(`dues on ${dueDate}`, margin + 20, yPos + 48);

    // Products table
    yPos += 85;
    const products =
      invoice.order?.orderItems?.map((item) => [
        item.product?.name || item.variant?.name || "Product",
        (item.quantity || 1).toString(),
        `$${parseFloat(item.price || item.variant?.price || 0).toFixed(2)}`,
        `$${(
          parseFloat(item.price || item.variant?.price || 0) *
          (item.quantity || 1)
        ).toFixed(2)}`,
      ]) || [];

    autoTable(doc, {
      ...pdfAutoTableBase,
      startY: yPos,
      head: [["Products", "Qty", "Rate", "Line total"]],
      body: products,
      headStyles: {
        ...pdfAutoTableBase.headStyles,
        fontSize: 10,
        cellPadding: 12,
      },
      styles: {
        ...pdfAutoTableBase.styles,
        fontSize: 9,
        cellPadding: 12,
      },
      alternateRowStyles: pdfAutoTableBase.alternateRowStyles,
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: 60, halign: "center" },
        2: { cellWidth: 80, halign: "right" },
        3: { cellWidth: 80, halign: "right" },
      },
      margin: { left: margin, right: margin },
      tableLineColor: pdfBrand.border,
      tableLineWidth: 0.5,
    });

    // Summary section
    const finalY = doc.lastAutoTable.finalY + 25;
    const summaryX = pageWidth - margin - 200;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...pdfBrand.text);

    doc.text("Subtotal", summaryX, finalY);
    doc.text(
      `$${parseFloat(subtotal).toFixed(2)}`,
      pageWidth - margin,
      finalY,
      { align: "right" }
    );

    doc.setDrawColor(...pdfBrand.border);
    doc.line(summaryX, finalY + 5, pageWidth - margin, finalY + 5);

    doc.text(`Tax (${taxPercentage.toFixed(0)}%)`, summaryX, finalY + 20);
    doc.text(
      `$${parseFloat(tax).toFixed(2)}`,
      pageWidth - margin,
      finalY + 20,
      { align: "right" }
    );

    doc.setDrawColor(...pdfBrand.border);
    doc.setLineWidth(1.5);
    doc.line(summaryX, finalY + 35, pageWidth - margin, finalY + 35);

    doc.setFont("helvetica", "bold");
    doc.text("Total", summaryX, finalY + 52);
    doc.text(`$${total.toFixed(2)}`, pageWidth - margin, finalY + 52, {
      align: "right",
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...pdfBrand.primary);
    doc.text("Amount due", summaryX, finalY + 72);
    doc.text(`US$ ${total.toFixed(2)}`, pageWidth - margin, finalY + 72, {
      align: "right",
    });

    doc.save(`invoice-${invoice.invoiceNumber || invoice.id}.pdf`);
    message.success("PDF exported successfully");
  };

  const handlePrint = () => {
    window.print();
    message.success("Print dialog opened");
  };

  const handleEmail = () => {
    message.info("Email functionality coming soon");
  };

  if (isLoading) {
    return (
      <InvoiceContainer>
        <div style={{ textAlign: "center", padding: "100px 0" }}>
          <Spin size="large" />
        </div>
      </InvoiceContainer>
    );
  }

  if (!invoiceData) {
    return (
      <InvoiceContainer>
        <div style={{ padding: "40px", textAlign: "center" }}>
          <p>Invoice not found</p>
        </div>
      </InvoiceContainer>
    );
  }

  const invoice = invoiceData;
  const products =
    invoice.order?.orderItems?.map((item, index) => ({
      key: index,
      product: item.product?.name || item.variant?.name || "Product",
      qty: item.quantity || 1,
      rate: `$${parseFloat(item.price || item.variant?.price || 0).toFixed(2)}`,
      total: `$${(
        parseFloat(item.price || item.variant?.price || 0) *
        (item.quantity || 1)
      ).toFixed(2)}`,
    })) || [];

  const subtotal = parseFloat(
    invoice.grossAmount || invoice.order?.amount || 0
  );
  const taxString = invoice.tax || "0%";
  const taxPercentage = parseFloat(taxString.replace("%", "")) || 0;
  const tax = (subtotal * taxPercentage) / 100;
  const total = subtotal + tax;

  return (
    <InvoiceContainer>
      <InvoiceHeader>
        <LogoSection>
          <img src={logo} alt="ECOM Dropship" />
        </LogoSection>
        <CompanyInfoRight>
          <div className="company-name">
            {invoice.supplier?.companyName || "Company Name"}
          </div>
          <div className="company-detail">
            {invoice.supplier?.address || "Company address"}
          </div>
          <div className="company-detail">
            {invoice.supplier?.city || "City"},{" "}
            {invoice.supplier?.country || "Country"} -{" "}
            {invoice.supplier?.zipCode || "00000"}
          </div>
          <div className="company-detail">
            {invoice.supplier?.phone || "+0 (000) 123-4567"}
          </div>
        </CompanyInfoRight>
      </InvoiceHeader>

      <ActionButtonsRow>
        <IconButton onClick={handleExportPDF} title="Download PDF">
          <FilePdfOutlined />
        </IconButton>
        <IconButton onClick={handleEmail} title="Send Email">
          <MailOutlined />
        </IconButton>
        <IconButton onClick={handlePrint} title="Print">
          <PrinterOutlined />
        </IconButton>
      </ActionButtonsRow>

      <InvoiceContent>
        <InvoiceTitle>
          <div>
            <div className="invoice-label">
              Invoice #{invoice.invoiceNumber || invoice.id}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="invoice-date">
              Date{" "}
              {new Date(invoice.created).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
        </InvoiceTitle>

        <AddressContainer>
          <AddressBlock>
            <div className="label">To</div>
            <div className="name">
              {invoice.customer
                ? `${invoice.customer.firstName} ${invoice.customer.lastName}`
                : invoice.supplier?.companyName || "Company Name"}
            </div>
            {invoice.customer?.shippingAddress ? (
              <>
                <div className="detail">
                  {invoice.customer.shippingAddress?.streetAddress}
                  {invoice.customer.shippingAddress?.apartmentNumber &&
                    `, ${invoice.customer.shippingAddress?.apartmentNumber}`}
                </div>
                <div className="detail">
                  {invoice.customer.shippingAddress?.state} -{" "}
                  {invoice.customer.shippingAddress?.zip}
                </div>
                {invoice.customer.phoneNumber && (
                  <div className="detail">{invoice.customer.phoneNumber}</div>
                )}
              </>
            ) : (
              <>
                <div className="detail">
                  {invoice.supplier?.address || "Company address"}
                </div>
                <div className="detail">
                  {invoice.supplier?.city || "City"},{" "}
                  {invoice.supplier?.country || "Country"} -{" "}
                  {invoice.supplier?.zipCode || "00000"}
                </div>
                <div className="detail">
                  {invoice.supplier?.phone || "+0 (000) 123-4567"}
                </div>
              </>
            )}
          </AddressBlock>

          <AddressBlock>
            <div className="label">From</div>
            <div className="name">{invoice.customer
              ? `${invoice.customer.firstName} ${invoice.customer.lastName}`
              : invoice.supplier?.companyName || "Company Name"}</div>
            <div className="email">{invoice.customer?.email || invoice.supplier?.email || "email@example.com"}</div>
            <div className="phoneNumber">{invoice.customer?.phoneNumber || invoice.supplier?.phone || "+0 (000) 123-4567"}</div>
          </AddressBlock>
        </AddressContainer>

        <AmountDueBox>
          <div className="amount">${total.toFixed(2)}</div>
          <div className="due-text">
            dues on{" "}
            {new Date(
              invoice.dueDate ||
              new Date(invoice.created).setDate(
                new Date(invoice.created).getDate() + 15
              )
            ).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
        </AmountDueBox>

        <StyledTable
          dataSource={products}
          pagination={false}
          columns={[
            {
              title: "Products",
              dataIndex: "product",
              key: "product",
            },
            {
              title: "Qty",
              dataIndex: "qty",
              key: "qty",
              width: 100,
              align: "center",
            },
            {
              title: "Rate",
              dataIndex: "rate",
              key: "rate",
              width: 150,
              align: "right",
            },
            {
              title: "Line total",
              dataIndex: "total",
              key: "total",
              width: 150,
              align: "right",
            },
          ]}
        />

        <SummarySection>
          <div className="summary-content">
            <SummaryRow>
              <span>Subtotal</span>
              <span>${parseFloat(subtotal).toFixed(2)}</span>
            </SummaryRow>
            <SummaryRow className="no-border">
              <span>Tax ({taxPercentage}%)</span>
              <span>${parseFloat(tax).toFixed(2)}</span>
            </SummaryRow>
            <SummaryRow className="total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </SummaryRow>
            <SummaryRow className="amount-due">
              <span>Amount due</span>
              <span>US$ {total.toFixed(2)}</span>
            </SummaryRow>
          </div>
        </SummarySection>
      </InvoiceContent>
    </InvoiceContainer>
  );
};

export default InvoiceDetail;
