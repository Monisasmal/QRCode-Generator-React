import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import download from "downloadjs";
import "./App.css";

function App() {
  const [text, setText] = useState("Hello Manu");
  const [isEdited, setIsEdited] = useState(false);
  const qrRef = useRef();

  const handleFocus = () => {
    if (!isEdited) {
      setText("");         
      setIsEdited(true);   
    }
  };

  const downloadQR = () => {
    if (qrRef.current === null) return;
    toPng(qrRef.current)
      .then((dataUrl) => {
        download(dataUrl, "qr-code.png");
      })
      .catch((err) => console.error("Download Failed", err));
  };

  return (
    <div className="container">
      <h1>🙂 QR Code Generator 😊</h1>
      <input
        type="text"
        placeholder="Enter text here"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={handleFocus} 
      />
      <div className="qr-code" ref={qrRef}>
        <QRCode value={text || " "} size={256} />
      </div>
      <button onClick={downloadQR}>Download QR Code</button>
    </div>
  );
}

export default App;
