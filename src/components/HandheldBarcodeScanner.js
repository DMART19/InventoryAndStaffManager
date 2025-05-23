import React, { useState } from "react";

const HandheldBarcodeScanner = ({ onScanComplete }) => {
  const [barcode, setBarcode] = useState("");

  const handleScan = (event) => {
    if (event.key === "Enter") {
      console.log("Scanned Barcode:", barcode);
      onScanComplete(barcode); // Pass the scanned barcode to the parent
      setBarcode(""); // Reset after scan
    } else {
      setBarcode((prev) => prev + event.key);
    }
  };

  return (
    <div className="handheld-scanner">
      <input
        type="text"
        value={barcode}
        onKeyDown={handleScan}
        placeholder="Scan barcode here"
        autoFocus
      />
    </div>
  );
};

export default HandheldBarcodeScanner;