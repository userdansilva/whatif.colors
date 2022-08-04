import { Palette } from "phosphor-react";
import { Link } from "react-router-dom";

interface TopbarProps {
  className?: string
}

export function Topbar({ className = "" }: TopbarProps): JSX.Element {
  return (
    <div className={`
      h-24 max-w-5xl mx-auto text-primary-600 px-10 flex items-center
      ${className}
    `}>
      <Link to="/" className="flex items-center gap-2">
        <Palette size={46} />
        <span className="text-xl font-bold">Whatif.colors</span>
      </Link>
    </div>
  );
}
