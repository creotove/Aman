import html2canvas from "html2canvas";
import jsPDF from "jspdf";


const handlePrint = (measurements) => {
    Object.keys(measurements).forEach((key) => {
        const element = document.getElementById(`print-${key}`);
        html2canvas(element, { scale: 2, logging: true }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png", 1.0);
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "in",
                format: [2.5, 3],
            });
            pdf.addImage(imgData, "PNG", 0, 0, 2.5, 3);
            pdf.save(`${key}-${measurements[key].phoneNumber}.pdf`); // Save with key and customer's name
        });
    });
};

export default handlePrint;