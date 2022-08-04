import {
  List, Palette, PencilSimple, Trash,
} from "phosphor-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

interface ThemeDisplayProps {
  id: number
  name: string
  background: string
  primaryText: string
  secondaryText: string
  accentColor: string
}

export function ThemeDisplayReadOnly(props: ThemeDisplayProps): JSX.Element {
  const {
    id, name, background, primaryText, secondaryText, accentColor,
  } = props;

  const { removeTheme } = useTheme();

  return (
    <div
      className={`
        w-full bg-secondary-900 rounded-lg shadow-lg p-6 max-w-[250px] 
        h-96 relative group overflow-hidden hover:shadow-2xl
      `}
      data-testid="theme-container"
      style={{ background }}>
      <div className="flex items-center text-base" style={{ color: primaryText }}>
        <div className="flex items-center gap-2 font-bold flex-1">
          <Palette />
          <div className="truncate max-w-[170px]" data-testid="theme-title">{name}</div>
        </div>
        <List style={{ color: secondaryText }} />
      </div>
      <div className="flex items-center h-[80%]">
        <div>
          <h2
            style={{
              color: primaryText,
            }}
            className="font-black text-2xl">
            Everything is a &#34;What if&#34;, so {" "}
            <span style={{ color: accentColor }}>
              don&#39;t be afraid to try
            </span>
            {" "} something new today.
          </h2>
          <p style={{ color: secondaryText }}>You can see themes or create your own!</p>
        </div>
      </div>
      <div
        className="py-3 px-9 rounded-md w-40"
        style={{
          background: accentColor,
          color: primaryText,
        }}>
        Not a button
      </div>

      <div className={`
        absolute inset-0 bg-secondary-900 opacity-0 group-hover:opacity-90 transition-opacity
        flex items-center justify-center gap-4
      `}>
        <Link
          to={`/edit/${id}`}
          data-testId="theme-edit"
          className="btnAction border-warning-600 text-warning-600">
          <PencilSimple weight="fill" />
        </Link>
        <button
          type="button"
          data-testId="theme-remove"
          className="btnAction border-danger-600 text-danger-600"
          onClick={() => removeTheme(id)}>
          <Trash weight="fill" />
        </button>
      </div>
    </div>
  );
}
