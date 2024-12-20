import { useParams } from "react-router";
import { Winery, WineryData } from "../winery/winery";
import { CountryLogo } from "../ui-components/country-logo";

export interface WineProps {
  wines: Wine[];
  wineries: WineryData[];
  showOverlay: (imgSrc: string) => void;
}

export interface Wine {
  id: number;
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
}

export const Wine = ({ wines, wineries, showOverlay }: WineProps) => {
  const { wineId = "" } = useParams();
  const wine = wines.find((wine) => wine.id === Number(wineId));
  const winery = wineries.find(
    (winery) => winery.id === Number(wine?.winery_id)
  );

  return (
    wine && (
      <div
        style={{
          backgroundImage: `url('/assets/${
            wine.background_image || "grapes-background.jpg"
          }')`,
        }}
        className="wine-portrait bg-repeat bg-cover w-full h-full px-2 py-8 min-h-dvh"
      >
        <div className="wine @[1024px]/main:w-11/12 w-full m-auto bg-stone-200 bg-opacity-75 text-stone-700 wine p-4 list-none grid grid-cols-12 gap-2 shadow-slate-500 shadow-sm rounded-md mb-2 last:mb-0">
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
          <div className="flex flex-col justify-start items-start col-span-9">
            <p className="text-left text-[16px]  mb-4">{wine.description}</p>
            <ul className="@[1024px]/main:w-2/5 w-4/5">
              {wine.quickfacts?.map((quickfact) => {
                return (
                  <li className="grid grid-cols-12 border-b border-stone-700 p-4">
                    <div className="col-span-3 font-bold">
                      {quickfact.label}
                    </div>
                    <div className="col-span-9 text-right">
                      {quickfact.value}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="col-span-3 flex justify-center">
            <img
              className="max-h-[800px] h-[800px] object-contain col-span-3"
              src={"/assets/" + wine.bottle_image}
              alt={`${wine.name} wine`}
            />
          </div>
        </div>
        {winery && <Winery winery={winery} showOverlay={showOverlay}></Winery>}
      </div>
    )
  );
};
