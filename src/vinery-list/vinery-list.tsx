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
    <ul className="vinery-list">
      {vineries.map((vinery) => (
        <li key={vinery.id} className="vinery">
          <div className="name">
            <h2>{vinery.name}</h2>
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
