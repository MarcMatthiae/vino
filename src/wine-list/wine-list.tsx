import { useNavigate } from "react-router";
import { Wine } from "../wine/wine";

export interface WineListProps {
  wines: Wine[];
  showOverlay: (imgSrc: string) => void;
}

export const WineList = ({ wines, showOverlay }: WineListProps) => {
  const navigate = useNavigate();
  return (
    <ul className="wine-list @[1024px]/main:w-2/3 w-full m-auto">
      {wines.map((wine) => (
        <li
          onClick={() => navigate(`/wine/${wine.id}`)}
          key={wine.id}
          className="bg-stone-200  hover:bg-emerald-500 text-stone-700 hover:text-stone-100 cursor-pointer p-4 list-none grid grid-cols-12 gap-2 shadow-slate-500 shadow-sm rounded-md mb-2 last:mb-0"
        >
          <div className="flex justify-start items-center col-span-9">
            <h2 className="text-left text-xl font-extralight">{wine.name}</h2>
          </div>
          <div className="col-span-3 flex justify-end">
            <img
              className="max-h-[200px] h-[200px] object-contain"
              src={"/assets/" + wine.bottle_image}
              alt={`${wine.name} wine`}
              onClick={() => showOverlay("/assets/" + wine.bottle_image)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};
