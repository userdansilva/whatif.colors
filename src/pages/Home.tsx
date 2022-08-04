import { MagnifyingGlass, Plus } from "phosphor-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { ThemeDisplayReadOnly } from "../components/ThemeDisplay/ReadOnly";
import { useTheme } from "../hooks/useTheme";

export function Home(): JSX.Element {
  const [search, setSearch] = useState<string>("");

  const normalizeString = (value: string): string => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const { themes } = useTheme();

  const thereIsTheme = themes.length > 0;
  const isThemeMathesSearch = themes.filter((theme) => normalizeString(theme.name)
    .includes(normalizeString(search))).length > 0;

  return (
    <Layout>
      <div className="flex items-center mb-10">
        <div className="flex-1 h-10 relative">
          <input
            type="text"
            className={`
              h-10 bg-secondary-100 w-full max-w-md rounded-md pl-10 pr-4 placeholder:text-secondary-400
              outline-none focus:ring-2 focus:ring-primary-600
            `}
            placeholder="Search by name..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <MagnifyingGlass
            className={`absolute left-4 top-0 bottom-0 my-auto mx-0 ${search !== "" ? "text-primary-600" : ""}`}
            weight={`${search !== "" ? "fill" : "regular"}`}
            size={18}
          />
        </div>
        <Link to="/create" className="btn">
          <Plus />Create
        </Link>
      </div>

      {!thereIsTheme && search === "" && (
        <div className="h-[calc(100vh-500px)] flex items-center justify-center flex-col gap-4">
          <h1 className="font-bold text-2xl">Lucks like you don&#39;t have any theme yet! 😕</h1>
          <p>
            <Link to="/create" className="text-primary-600">
              Clique here
            </Link>{" "}
            to create your first
          </p>
        </div>
      )}

      {!isThemeMathesSearch && search !== "" && (
        <div className="h-[calc(100vh-500px)] flex items-center justify-center">
          <h1 className="font-bold text-2xl">There is no theme that matches your search! 😕</h1>
        </div>
      )}

      <div className="grid justify-between grid-cols-4 gap-6 mb-10">

        {themes.filter((theme) => normalizeString(theme.name)
          .includes(normalizeString(search)))
          .sort((a, b) => b.id - a.id).map((theme) => (
            <ThemeDisplayReadOnly
              key={theme.id}
              id={theme.id}
              name={theme.name}
              background={theme["background-color"]}
              primaryText={theme["primary-text-color"]}
              secondaryText={theme["secondary-text-color"]}
              accentColor={theme["accent-color"]}
            />
          ))}
      </div>
    </Layout>
  );
}
