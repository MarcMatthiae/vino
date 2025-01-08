import { useParams } from "react-router";
import { Winery, WineryData } from "../winery/winery";
import { CountryLogo } from "../ui-components/country-logo";
import { HorizontalList } from "../ui-components/horizontal-list";
import { useState } from "react";

export interface WineProps {
  wines: Wine[];
  wineries: WineryData[];
  showOverlay: (imgSrc: string) => void;
}

export interface Wine {
  id: number;
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

  return (
    wine && (
      <div className="wine-portrait bg-stone-400 bg-no-repeat bg-cover w-full h-full px-2 py-8 min-h-dvh">
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
          <div className="flex flex-col justify-start items-start col-span-9 gap-4">
            <p className="text-left text-[16px]">{wine.description}</p>
            <ul className="w-4/5">
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
                <div className="@[1024px]/main:col-span-3 col-span-12 font-bold">
                  Geschmack
                </div>
                {tastesVisible ? (
                  <div className="@[1024px]/main:col-span-9 col-span-12 flex @[1024px]/main:flex-row flex-col gap-3 justify-end items-center">
                    <HorizontalList items={wine.tastes}></HorizontalList>
                    <button
                      className="bg-orange-200 p-2 rounded-md border-stone-700 border"
                      onClick={() => handleOnClick()}
                    >
                      Ausblenden
                    </button>
                  </div>
                ) : (
                  <div className="@[1024px]/main:col-span-9 col-span-12 flex @[1024px]/main:flex-row flex-col gap-3 justify-end  items-center">
                    <div className="flex">
                      {[...Array(wine.tastes?.length).keys()]?.map((index) => {
                        return (
                          <img className="h-8" src="/assets/favicon.png"></img>
                        );
                      })}
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
                  <HorizontalList items={wine.besonderheiten}></HorizontalList>
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

          <div className="col-span-3 flex justify-center">
            <img
              className="@[1024px]/main:max-h-[800px] @[1024px]/main:h-[800px] max-h-[200px] h-[200px] object-contain col-span-3"
              src={"/assets/wines/" + wine.key + "/bottle.png"}
              alt={`${wine.name} wine`}
            />
          </div>
        </div>
        {winery && <Winery winery={winery} showOverlay={showOverlay}></Winery>}
      </div>
    )
  );
};
