import { useParams } from "react-router";

export interface WineProps {
  wines: Wine[];
  showOverlay: (imgSrc: string) => void;
}

export interface Wine {
  id: number;
  name: string;
  bottle_image: string;
  description: string;
  quickfacts: {
    label: string;
    value: string;
  }[];
  year: string;
}

export const Wine = ({ wines, showOverlay }: WineProps) => {
  const { wineId = "" } = useParams();
  const wine = wines.find((wine) => wine.id === Number(wineId));

  return (
    wine && (
      <div className="wine @[1024px]/main:w-11/12 w-full m-auto bg-stone-200 text-stone-700 wine p-4 list-none grid grid-cols-12 gap-2 shadow-slate-500 shadow-sm rounded-md mb-2 last:mb-0">
        <div className="flex flex-col justify-start items-start col-span-9">
          <h2 className="text-left text-xl text-stone-700 font-extralight mb-4">
            {wine.name}
          </h2>
          <p className="text-left text-[16px]  mb-4">{wine.description}</p>
          <ul className="w-6/12 border ">
            {wine.quickfacts?.map((quickfact) => {
              return (
                <li className="grid grid-cols-12 border-b border-stone-700 p-4">
                  <div className="col-span-3">{quickfact.label}</div>
                  <div className="col-span-9 text-right">{quickfact.value}</div>
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
            onClick={() => showOverlay("/assets/" + wine.bottle_image)}
          />
        </div>
      </div>
    )
  );
};
