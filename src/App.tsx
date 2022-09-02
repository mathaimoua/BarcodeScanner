import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { FaCamera } from "react-icons/fa";

import "./styles.css";

export default function App() {
  const [scan, setScan] = useState(false);
  const [logs, setLog] = useState<Array<string>>([]);
  const [input1, setInput1] = useState("");

  const input1Change = (event: any) => {
    setInput1(event.target.value);
  };

  const submitCode = () => {
      setLog([...logs, input1]);
      setInput1('');
  };

  const barcodeScannerComponentHandleUpdate = (error: any, result: any) => {
    if (result) {
      setInput1(result.text);
      setScan(false);
    }
  };

  return (
    <div className="App">
      <h1>BARCODE SCANNER TEST</h1>
      <br></br>
      <input
        type="text"
        placeholder="barcode number"
        value={input1}
        onChange={input1Change}
      />
      <button className="scanButton" onClick={() => setScan(true)}>
        <FaCamera />
      </button>
      {scan && (
        <div className="cameraDiv">
          <BarcodeScannerComponent
            height={200}
            width={200}
            onUpdate={barcodeScannerComponentHandleUpdate}
          />
          <button className="cancelScan" onClick={() => setScan(false)}>
            X
          </button>
        </div>
    
      )}
      <br></br>
      <button 
        className="submitCodes" 
        onClick={submitCode}
      >Submit Current Barcode</button>
      <br></br>
      <div className="barcodesDiv">
        <h2>Submitted Barcodes:</h2>
        {logs.map((log) => (
          <div key={log}>{log}</div>
        ))}

        <button className="clearButton" onClick={() => setLog([])}>
          Clear List
        </button>
      </div>
    </div>
  );
}
