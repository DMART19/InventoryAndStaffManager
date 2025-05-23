import React, { useEffect, useRef } from "react";
import Quagga from "quagga";
import "./CameraBarcodeScanner.css"; // Add styling as needed

const CameraBarcodeScanner = ({ showBarcodeScanner, setShowBarcodeScanner, scannedData, setScannedData }) => (
    <>
      {showBarcodeScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-[90%] max-w-lg">
            <h2 className="text-lg font-semibold mb-3">Scan a Barcode</h2>
            <p className="text-sm text-gray-600 mb-4">
              Align the barcode within the frame below.
            </p>
            <div className="border-2 border-gray-300 rounded-lg overflow-hidden shadow-md">
              <BarcodeScannerComponent
                width={400}
                height={300}
                onUpdate={(err, result) => {
                  if (err) return;
                  if (result?.text && result.text !== scannedData) {
                    setScannedData(result.text);
                  }
                }}
              />
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-700 font-medium">
                {scannedData ? `Scanned: ${scannedData}` : "Waiting for scan..."}
              </p>
            </div>
            <button
              onClick={() => setShowBarcodeScanner(false)}
              className="mt-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
            >
              Close Scanner
            </button>
          </div>
        </div>
      )}
    </>
  );
  
export default CameraBarcodeScanner;