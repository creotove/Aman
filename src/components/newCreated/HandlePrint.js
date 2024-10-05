import jsPDF from "jspdf";
import QRCode from "qrcode";

const handlePrint = async measurements => {
  const margin = 0.2; // 0.2 inches margin
  const pageWidth = 2.5;
  const pageHeight = 3;
  const contentWidth = pageWidth - 2 * margin;

  for (const [key, measurement] of Object.entries(measurements)) {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: [pageWidth, pageHeight],
    });

    // Add measurement type (key) at top left
    pdf.setFont("Poppins", "sans-serif");
    pdf.setFontSize(12);
    pdf.text(key, margin, margin + 0.2);

    // Generate QR code
    const qrCodeData = JSON.stringify(measurement);
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(qrCodeData, {width: 200});
      const qrSize = contentWidth * 0.9; // 90% of content width
      const qrX = margin + (contentWidth - qrSize) / 2;
      const qrY = margin + 0.3; // Slightly lower to accommodate the key text
      pdf.addImage(qrCodeDataUrl, "PNG", qrX, qrY, qrSize, qrSize);
    } catch (err) {
      console.error("Error generating QR code:", err);
    }

    // Add name and phone number
    pdf.setFont("Poppins", "sans-serif");
    pdf.setFontSize(10);
    pdf.text(`Name: ${measurement.name}`, margin, pageHeight - margin - 0.3);
    pdf.text(`Phone: ${measurement.phoneNumber}`, margin, pageHeight - margin - 0.15);

    // Generate and download PDF
    const pdfOutput = pdf.output("blob");
    const fileName = `${key}-${measurement.phoneNumber}.pdf`;

    const link = document.createElement("a");
    link.href = URL.createObjectURL(pdfOutput);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);

    await new Promise(resolve => setTimeout(resolve, 500));
  }
};

export default handlePrint;
