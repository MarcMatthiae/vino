import { ReactNode } from "react";

export const Headline = ({ children }: { children: ReactNode }) => {
  return <h2 className="text-3xl font-bold text-stone-700">{children}</h2>;
};
