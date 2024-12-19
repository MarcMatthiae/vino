export interface CountryLogoProps {
  countryIso2?: string;
  countryName?: string;
}

export const CountryLogo = ({ countryIso2, countryName }: CountryLogoProps) => {
  return (
    <div className="country">
      <div
        style={{ width: "64px" }}
        className={`fi fib fi-${countryIso2} p-0 w-16 h-16 bg-contain clip-circle-custom bg-center bg-no-repeat`}
        title={countryName}
      ></div>
    </div>
  );
};
