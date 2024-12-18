import wineData from "./data/wines.json"; // Assuming the file is in `src/`
import wineryData from "./data/wineries.json"; // Assuming the file is in `src/`

import "./App.css";
import { useState } from "react";
import { WineList } from "./wine-list/wine-list";
import { BrowserRouter, Route, Routes } from "react-router";
import { Wine } from "./wine/wine";
import { WineryList } from "./winery-list/winery-list";

function App() {
  const wineArray = wineData.wines;
  const wineryArray = wineryData.wineries;
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
    <div className="@container/main winery-app">
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <WineList
                wines={wineArray}
                showOverlay={(imgSrc) => showOverlay(imgSrc)}
              />
            }
          />
          <Route
            path="wine/:wineId"
            element={
              <Wine
                wines={wineArray}
                wineries={wineryArray}
                showOverlay={(imgSrc) => showOverlay(imgSrc)}
              />
            }
          />
          <Route
            path="wineries"
            element={
              <WineryList
                wineries={wineryArray}
                showOverlay={(imgSrc) => showOverlay(imgSrc)}
              />
            }
          />
        </Routes>
      </BrowserRouter>
      {overlayImage && (
        <div className="overlay visible" onClick={hideOverlay}>
          <img src={overlayImage} alt="Larger view" />
        </div>
      )}
    </div>
  );
}

export default App;
