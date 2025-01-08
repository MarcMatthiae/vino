import { useNavigate } from "react-router";
import { Wine } from "../wine/wine";
import "./wine-list.css";
import { useEffect, useState } from "react";

export interface WineListProps {
  wines: Wine[];
}

export const WineList = ({ wines }: WineListProps) => {
  const navigate = useNavigate();

  const [wineEvaluations, setWineEvaluations] = useState<
    Array<{ [key: string]: number }>
  >([]);

  // Load evaluations from localStorage
  useEffect(() => {
    const storedEvaluations = JSON.parse(
      localStorage.getItem("wineEvaluations") || "[]"
    );
    setWineEvaluations(storedEvaluations);
  }, []);

  // Helper to find evaluation for a specific wineId
  const getEvaluationForWine = (wineId: number) => {
    const evaluationEntry = wineEvaluations.find((entry) => entry[wineId]);
    return evaluationEntry ? evaluationEntry[wineId] : null;
  };

  return (
    <div className="wine-list">
      <ul className="@[1024px]/main:w-2/3 w-full m-auto">
        {wines.map((wine) => {
          const evaluation = getEvaluationForWine(wine.id); // Get evaluation for this wine

          return (
            <li
              onClick={() => navigate(`/wine/${wine.id}`)}
              key={wine.id}
              className="bg-stone-200 hover:bg-emerald-500 text-stone-700 bg-opacity-75 hover:text-stone-100 cursor-pointer p-4 list-none grid grid-cols-12 gap-2 shadow-slate-500 shadow-sm rounded-md mb-2 last:mb-0 items-center"
            >
              <div className="flex flex-col justify-start items-start col-span-2">
                {evaluation ? (
                  <div className="mt-1 text-sm text-stone-600 border border-stone-600 h-40 w-40 rounded-md flex items-center justify-center">
                    <p className="text-[50px]">
                      {evaluation === 6 && "\u{1F92E}"}
                      {evaluation === 5 && "\u{1F922}"}
                      {evaluation === 4 && "\u{1F974}"}
                      {evaluation === 3 && "\u{1F937}"}
                      {evaluation === 2 && "\u{1F60D}"}
                      {evaluation === 1 && "\u{1F680}"}
                    </p>
                  </div>
                ) : (
                  <div className="mt-1 text-sm text-stone-600 border border-stone-600 h-40 w-40 rounded-md flex items-center justify-center">
                    <p className="text-[14px] text-center">
                      Bewertung ausstehend
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-start items-start col-span-7">
                <h2 className="text-left text-xl font-extralight">
                  {wine.name}
                </h2>
              </div>
              <div className="col-span-3 flex justify-end">
                <img
                  className="max-h-[200px] h-[200px] object-contain"
                  src={"/assets/wines/" + wine.key + "/bottle.png"}
                  alt={`${wine.name} wine`}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
