import { ReactNode } from "react";
import { Topbar } from "../Topbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div>
      <Topbar className="mb-10" />
      <div className="max-w-5xl mx-auto px-10">
        {children}
      </div>
    </div>
  );
}
