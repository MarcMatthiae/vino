import { Link, useParams } from "react-router";
import { Winery, WineryData } from "../winery/winery";
import { CountryLogo } from "../ui-components/country-logo";
import { HorizontalList } from "../ui-components/horizontal-list";
import { useEffect, useState } from "react";
import ImageModal from "../image-viewer/modal";

export interface WineProps {
  wines: Wine[];
  wineries: WineryData[];
  showOverlay: (imgSrc: string) => void;
}

export interface Wine {
  id: number;
  order: number;
  key: string;
  winery_id: number;
  name: string;
  bottle_image: string;
  background_image?: string;
  description: string;
  quickfacts?: {
    label: string;
    value: string;
  }[];
  year?: string;
  vinification?: string[];
  tastes?: string[];
  besonderheiten?: string[];
  besonderheiten_anbaugebiet?: string[];
}

export const Wine = ({ wines, wineries, showOverlay }: WineProps) => {
  const { wineId = "" } = useParams();
  const wine = wines.find((wine) => wine.id === Number(wineId));
  const winery = wineries.find(
    (winery) => winery.id === Number(wine?.winery_id)
  );

  const [tastesVisible, setTastesVisible] = useState(false);

  const backgroundImagePath = wine?.background_image
    ? "/assets/wines/" + wine?.key + "/" + wine.background_image
    : "/assets/grapes-background.jpg";

  const handleOnClick = () => {
    setTastesVisible((prevState) => !prevState);
  };

  const [selectedEvaluation, setSelectedEvaluation] = useState<number | null>(
    null
  );

  // Helper function to find an evaluation for the current wineId
  const getWineEvaluation = (
    wineEvaluations: Array<{ [key: string]: number }>,
    wineId: string
  ) => {
    const evaluationEntry = wineEvaluations.find(
      (entry) => entry[wineId] !== undefined
    );
    return evaluationEntry ? evaluationEntry[wineId] : null;
  };

  useEffect(() => {
    const storedEvaluations = JSON.parse(
      localStorage.getItem("wineEvaluations") || "[]"
    );
    const evaluation = getWineEvaluation(storedEvaluations, wineId);
    if (evaluation) {
      setSelectedEvaluation(evaluation);
    }
  }, [wineId]);

  const handleEvaluationClick = (evaluation: number) => {
    setSelectedEvaluation(evaluation);

    // Get existing evaluations or create a new array
    const storedEvaluations: Array<{ [key: string]: number }> = JSON.parse(
      localStorage.getItem("wineEvaluations") || "[]"
    );

    // Remove existing evaluation for this wineId
    const updatedEvaluations = storedEvaluations.filter(
      (entry) => !entry[wineId]
    );

    // Add the new evaluation
    updatedEvaluations.push({ [wineId]: evaluation });

    // Save back to localStorage
    localStorage.setItem("wineEvaluations", JSON.stringify(updatedEvaluations));
  };

  return (
    wine && (
      <>
        <div className="wine-portrait bg-stone-400 bg-no-repeat bg-cover w-full h-full px-2 py-8 min-h-dvh">
          <div className="@[1024px]/main:w-[95%] w-full m-auto bg-stone-100 bg-opacity-75 text-stone-700 wine p-4 flex gap-2 shadow-slate-500 shadow-sm rounded-md mb-2 last:mb-0">
            <Link to="/ ">{"Vino"}</Link>
            <div>{" > "}</div>
            <div className="text-emerald-700">{wine.name}</div>
          </div>
          <div className="wine @[1024px]/main:w-[95%] w-full m-auto bg-stone-100 bg-opacity-75 text-stone-700 wine p-4 list-none grid grid-cols-12 gap-2 shadow-slate-500 shadow-sm rounded-md mb-2 last:mb-0">
            <div className="flex flex-col justify-start items-start col-span-12">
              <div className="flex items-center mb-4 gap-4">
                <CountryLogo
                  countryIso2={winery?.country}
                  countryName={winery?.country_name}
                ></CountryLogo>
                <h2 className="text-left text-3xl font-bold text-stone-700">
                  {wine.name}
                </h2>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start @[1024px]/main:col-span-9 col-span-12 gap-4">
              <p className="text-left text-[16px]">{wine.description}</p>
              <ul className="@[1024px]/main:w-4/5 w-full">
                {wine.quickfacts?.map((quickfact) => {
                  return (
                    <li className="grid grid-cols-12 border-b border-stone-700 p-4">
                      <div className="@[1024px]/main:col-span-3 col-span-12 font-bold">
                        {quickfact.label}
                      </div>
                      <div className="@[1024px]/main:col-span-9 col-span-12 @[1024px]/main:text-right">
                        {quickfact.value}
                      </div>
                    </li>
                  );
                })}
                <li className="grid grid-cols-12 border-b border-stone-700 p-4">
                  <div className="@[1024px]/main:col-span-3 col-span-12 font-bold">
                    Vinifikation
                  </div>
                  <div className="@[1024px]/main:col-span-9 col-span-12 @[1024px]/main:text-right">
                    <HorizontalList items={wine.vinification}></HorizontalList>
                  </div>
                </li>
                <li className="grid grid-cols-12 border-b border-stone-700 p-4">
                  <div className="@[1024px]/main:col-span-3 col-span-12 font-bold @[1024px]/main:mb-0 mb-4">
                    Geschmack
                  </div>
                  {tastesVisible ? (
                    <div className="@[1024px]/main:col-span-9 col-span-12 flex @[1024px]/main:flex-row flex-col gap-3 @[1024px]/main:justify-end @[1024px]/main:items-center items-start">
                      <HorizontalList items={wine.tastes}></HorizontalList>
                      <button
                        className="bg-orange-200 p-2 rounded-md border-stone-700 border"
                        onClick={() => handleOnClick()}
                      >
                        Ausblenden
                      </button>
                    </div>
                  ) : (
                    <div className="@[1024px]/main:col-span-9 col-span-12 flex @[1024px]/main:flex-row flex-col gap-3 @[1024px]/main:justify-end @[1024px]/main:items-center items-start">
                      <div className="flex">
                        {[...Array(wine.tastes?.length).keys()]?.map(
                          (index) => {
                            return (
                              <img
                                className="h-8"
                                src="/assets/favicon.png"
                              ></img>
                            );
                          }
                        )}
                      </div>
                      <button
                        className="bg-emerald-300 p-2 rounded-md border-stone-700 border"
                        onClick={() => handleOnClick()}
                      >
                        Anzeigen ({wine.tastes?.length})
                      </button>
                    </div>
                  )}
                </li>
                <li className="grid grid-cols-12 border-b border-stone-700 p-4">
                  <div className="@[1024px]/main:col-span-3 col-span-12 font-bold">
                    Besonderheiten
                  </div>
                  <div className="@[1024px]/main:col-span-9 col-span-12 @[1024px]/main:text-right">
                    <HorizontalList
                      items={wine.besonderheiten}
                    ></HorizontalList>
                  </div>
                </li>
                <li className="grid grid-cols-12 border-b border-stone-700 p-4">
                  <div className="@[1024px]/main:col-span-3 col-span-12 font-bold">
                    Besonderheiten Anbaugebiet
                  </div>
                  <div className="@[1024px]/main:col-span-9 col-span-12 @[1024px]/main:text-right">
                    <HorizontalList
                      items={wine.besonderheiten_anbaugebiet}
                    ></HorizontalList>
                  </div>
                </li>
              </ul>
            </div>

            <div className="@[1024px]/main:col-span-3 col-span-12 flex justify-center">
              <img
                className="@[1024px]/main:max-h-[800px] @[1024px]/main:h-[800px] max-h-[300px] h-[300px] object-contain col-span-3"
                src={"/assets/wines/" + wine.key + "/bottle.png"}
                alt={`${wine.name} wine`}
              />
            </div>
          </div>
          {winery && (
            <Winery winery={winery} showOverlay={showOverlay}></Winery>
          )}
        </div>
        <div className="h-20 sticky bottom-0 box-border border-t z-50 w-full @[1024px]/main:px-16 flex justify-start items-center shadow-[0px_-4px_6px_rgba(0,0,0,0.1)] bg-stone-200 py-2">
          <div className="m-auto flex items-center gap-4">
            <div className="@[1024px]/main:block hidden">Jetzt bewerten:</div>
            <div className="m-auto flex items-center gap-2">
              {[6, 5, 4, 3, 2, 1].map((evaluation) => (
                <button
                  key={evaluation}
                  className={`p-2 w-12 h-12 rounded-md border-stone-700 border text-[30px] flex items-center justify-center ${
                    selectedEvaluation === evaluation
                      ? "bg-emerald-400 text-white"
                      : "hover:bg-emerald-400 hover:text-white"
                  }`}
                  onClick={() => handleEvaluationClick(evaluation)}
                >
                  <p>
                    {evaluation === 6 && "\u{1F92E}"}
                    {evaluation === 5 && "\u{1F922}"}
                    {evaluation === 4 && "\u{1F974}"}
                    {evaluation === 3 && "\u{1F937}"}
                    {evaluation === 2 && "\u{1F60D}"}
                    {evaluation === 1 && "\u{1F680}"}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  );
};
