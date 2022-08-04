import { List, Palette } from "phosphor-react";
import { Control, useWatch } from "react-hook-form";
import { FormValues } from "../../pages/CreateUpdate";

interface ThemeDisplayProps {
  control: Control<FormValues>
}

export function ThemeDisplayEditable({ control }: ThemeDisplayProps): JSX.Element {
  const {
    name, backgroundColor, primaryTextColor, secondaryTextColor, accentColor,
  } = useWatch({ control });

  return (
    <div
      className="w-full bg-secondary-900 rounded-lg shadow-lg p-6 max-w-[350px] h-[550px]"
      style={{
        background: backgroundColor,
      }}>
      <div className="flex items-center text-base" style={{ color: primaryTextColor }}>
        <div className="flex items-center gap-2 font-bold flex-1">
          <Palette />
          <div className="truncate max-w-[170px]" data-testid="theme-title">{name === "" ? "Whatif.colors" : name}</div>
        </div>
        <List style={{ color: secondaryTextColor }} />
      </div>
      <div className="flex items-center h-[80%]">
        <div>
          <h2
            style={{
              color: primaryTextColor,
            }}
            className="font-black text-5xl">
            Everything is a &#34;What if&#34;, so {" "}
            <span style={{ color: accentColor }}>
              don&#39;t be afraid to try
            </span>
            {" "} something new today.
          </h2>
          <p style={{ color: secondaryTextColor }}>You can see themes or create your own!</p>
        </div>
      </div>
      <div
        className="py-3 px-9 rounded-md w-40"
        style={{
          background: accentColor,
          color: primaryTextColor,
        }}>
        Not a button
      </div>
    </div>
  );
}
