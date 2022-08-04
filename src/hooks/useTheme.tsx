import {
  createContext, ReactNode, useCallback, useContext, useMemo, useState,
} from "react";

interface ThemeProviderProps {
  children: ReactNode
}

export interface Theme {
  id: number
  name: string
  "background-color": string
  "primary-text-color": string
  "secondary-text-color": string
  "accent-color": string
}

export type NewTheme = Omit<Theme, "id">

interface ThemeContextData {
  themes: Theme[]
  addTheme: (theme: NewTheme) => void
  editTheme: (theme: Theme) => void
  removeTheme: (id: number) => void
  getTheme: (name: number) => Theme | undefined
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const [themes, setThemes] = useState<Theme[]>(() => {
    const storedThemes = localStorage.getItem("@Whatif.colors:themes");

    if (storedThemes) { return JSON.parse(storedThemes); }

    return [];
  });

  const updateLocalStorage = (updatedThemes: Theme[]): void => {
    localStorage.setItem("@Whatif.colors:themes", JSON.stringify(updatedThemes));
  };

  const getTheme = useCallback((id: number): Theme | undefined => {
    const selectedTheme = themes.find((theme) => theme.id === id);
    return selectedTheme;
  }, [themes]);

  const addTheme = useCallback((theme: NewTheme): void => {
    const id = Date.now();

    const currentThemes = [...themes];
    currentThemes.push({ ...theme, id });

    setThemes(currentThemes);
    updateLocalStorage(currentThemes);
  }, [themes]);

  const editTheme = useCallback((theme: Theme): void => {
    const currentThemes = [...themes];
    const modifiedThemes = currentThemes.map((currentTheme) => {
      if (currentTheme.id === theme.id) return theme;
      return currentTheme;
    });

    setThemes(modifiedThemes);
    updateLocalStorage(modifiedThemes);
  }, [themes]);

  const removeTheme = useCallback((themeId: number): void => {
    const currentThemes = [...themes];
    const themeIndex = currentThemes.findIndex((currentTheme) => currentTheme.id === themeId);

    currentThemes.splice(themeIndex, 1);

    setThemes(currentThemes);
    updateLocalStorage(currentThemes);
  }, [themes]);

  const value = useMemo(() => ({
    themes, addTheme, editTheme, removeTheme, getTheme,
  }), [addTheme, editTheme, removeTheme, themes, getTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);
  return context;
}
