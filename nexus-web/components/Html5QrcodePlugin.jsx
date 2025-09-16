/** @format */

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

// Create scanner config
const createConfig = (props) => {
  let config = {};
  if (props.fps) config.fps = props.fps;
  if (props.qrbox) config.qrbox = props.qrbox;
  if (props.aspectRatio) config.aspectRatio = props.aspectRatio;
  if (props.disableFlip !== undefined) config.disableFlip = props.disableFlip;
  return config;
};

const Html5QrcodePlugin = (props) => {
  useEffect(() => {
    if (!props.qrCodeSuccessCallback) {
      throw new Error("qrCodeSuccessCallback is a required callback.");
    }

    const config = createConfig(props);
    const verbose = props.verbose === true;

    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );

    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback
    );

    // Cleanup on unmount
    return () => {
      html5QrcodeScanner
        .clear()
        .catch((error) =>
          console.error("Failed to clear html5QrcodeScanner:", error)
        );
    };
  }, [props]); // re-render if props change

  return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
