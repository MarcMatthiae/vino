import data from "./data/vineries.json"; // Assuming the file is in `src/`

import "./App.css";
import { useState } from "react";
import { VineryList } from "./vinery-list/vinery-list";

function App() {
  const vineryArray = data.vineries;
  // State to track overlay visibility and image
  const [overlayImage, setOverlayImage] = useState<string | null>();

  // Function to show the overlay
  const showOverlay = (imageSrc: string) => {
    setOverlayImage(imageSrc);
    document.body.classList.add("no-scroll"); // Prevent scrolling
  };

  // Function to hide the overlay
  const hideOverlay = () => {
    setOverlayImage(null);
    document.body.classList.remove("no-scroll");
  };

  return (
    <div className="vinery-app">
      <VineryList
        vineries={vineryArray}
        showOverlay={(imgSrc) => showOverlay(imgSrc)}
      ></VineryList>
      {overlayImage && (
        <div className="overlay visible" onClick={hideOverlay}>
          <img src={overlayImage} alt="Larger view" />
        </div>
      )}
    </div>
  );
}

export default App;
