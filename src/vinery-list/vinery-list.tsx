import "./vinery-list.css";

export interface VineryListProps {
  vineries: Vinery[];
  showOverlay: (imgSrc: string) => void;
}

export interface Vinery {
  id: number;
  key: string;
  name: string;
  logo: string;
  vinery: string;
  country: string;
  country_name: string;
}

export const VineryList = ({ vineries, showOverlay }: VineryListProps) => {
  return (
    <ul className="vinery-list @[1024px]/main:w-2/3 w-full">
      {vineries.map((vinery) => (
        <li
          key={vinery.id}
          className="bg-white vinery p-4 list-none flex flex-col gap-2 shadow-slate-500 shadow-sm rounded-md"
        >
          <div className="name border-b-2">
            <h2 className="font-neutral-700">{vinery.name}</h2>
            <img
              src={"./assets/" + vinery.logo}
              alt={`${vinery.name} Logo`}
              className="logo"
            />
            <div className="country">
              <div className={`fi fib fi-${vinery.country}`}></div>
              <div>{vinery.country_name}</div>
            </div>
          </div>
          <div className="impressions">
            <img
              src={"./assets/" + vinery.vinery}
              alt={`${vinery.name} Vinery`}
              onClick={() => showOverlay("./assets/" + vinery.vinery)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};
