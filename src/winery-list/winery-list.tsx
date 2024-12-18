import "./winery-list.css";

export interface WineryListProps {
  wineries: Winery[];
  showOverlay: (imgSrc: string) => void;
}

export interface Winery {
  id: number;
  key: string;
  name: string;
  logo: string;
  winery: string;
  country: string;
  country_name: string;
}

export const WineryList = ({ wineries, showOverlay }: WineryListProps) => {
  return (
    <ul className="winery-list @[1024px]/main:w-2/3 w-full">
      {wineries.map((winery) => (
        <li
          key={winery.id}
          className="bg-white winery p-4 list-none flex flex-col gap-2 shadow-slate-500 shadow-sm rounded-md"
        >
          <div className="name">
            <h2 className="font-neutral-700">{winery.name}</h2>
            <img
              src={"/assets/" + winery.logo}
              alt={`${winery.name} Logo`}
              className="logo"
            />
            <div className="country">
              <div className={`fi fib fi-${winery.country}`}></div>
            </div>
          </div>
          <div className="impressions">
            <img
              src={"/assets/" + winery.winery}
              alt={`${winery.name} winery`}
              onClick={() => showOverlay("./assets/" + winery.winery)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};
