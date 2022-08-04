import { renderHook, act } from "@testing-library/react-hooks";
import { useTheme, ThemeProvider } from "../../hooks/useTheme";

const mockedSetItemLocalStorage = jest.spyOn(Storage.prototype, "setItem");
const initialStoragedData = [
  {
    id: 1,
    name: "Dark",
    "background-color": "#030D16",
    "primary-text-color": "#FFFFFF",
    "secondary-text-color": "#624B7E",
    "accent-color": "#7C3AED",
  },
  {
    id: 2,
    name: "Blue",
    "background-color": "#1600db",
    "primary-text-color": "#cec10e",
    "secondary-text-color": "#534b7e",
    "accent-color": "#463aed",
  },
];

describe("useTheme", () => {
  beforeEach(() => {
    jest
      .spyOn(Storage.prototype, "getItem")
      .mockReturnValueOnce(JSON.stringify(initialStoragedData));
  });

  it("should be able to initialize with localstorage", () => {
    const { result } = renderHook(useTheme, {
      wrapper: ThemeProvider,
    });

    expect(result.current.themes).toEqual(
      expect.arrayContaining([...initialStoragedData]),
    );
  });

  it("should be able to get theme by id", () => {
    const { result } = renderHook(useTheme, {
      wrapper: ThemeProvider,
    });

    expect(result.current.getTheme(2)).toEqual(
      {
        id: 2,
        name: "Blue",
        "background-color": "#1600db",
        "primary-text-color": "#cec10e",
        "secondary-text-color": "#534b7e",
        "accent-color": "#463aed",
      },
    );
  });

  it("should be able to add new theme", () => {
    const { result } = renderHook(useTheme, {
      wrapper: ThemeProvider,
    });

    const newTheme = {
      name: "Light",
      "background-color": "#ffffff",
      "primary-text-color": "#030D16",
      "secondary-text-color": "#624B7E",
      "accent-color": "#7C3AED",
    };

    act(() => {
      result.current.addTheme(newTheme);
    });

    expect(result.current.themes).toEqual([
      ...initialStoragedData,
      {
        id: expect.any(Number),
        name: "Light",
        "background-color": "#ffffff",
        "primary-text-color": "#030D16",
        "secondary-text-color": "#624B7E",
        "accent-color": "#7C3AED",
      },
    ]);

    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      "@Whatif.colors:themes",
      JSON.stringify(result.current.themes),
    );
  });

  it("should be able to update a theme", () => {
    const { result } = renderHook(useTheme, {
      wrapper: ThemeProvider,
    });

    const modifiedTheme = {
      id: 1,
      name: "New Light",
      "background-color": "#ffffff",
      "primary-text-color": "#030D16",
      "secondary-text-color": "#624B7E",
      "accent-color": "#7C3AED",
    };

    act(() => {
      result.current.editTheme(modifiedTheme);
    });

    expect(result.current.themes).toEqual([
      {
        id: 1,
        name: "New Light",
        "background-color": "#ffffff",
        "primary-text-color": "#030D16",
        "secondary-text-color": "#624B7E",
        "accent-color": "#7C3AED",
      },
      {
        id: 2,
        name: "Blue",
        "background-color": "#1600db",
        "primary-text-color": "#cec10e",
        "secondary-text-color": "#534b7e",
        "accent-color": "#463aed",
      },
    ]);

    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      "@Whatif.colors:themes",
      JSON.stringify(result.current.themes),
    );
  });

  it("should be able to remove a theme", () => {
    const { result } = renderHook(useTheme, {
      wrapper: ThemeProvider,
    });

    act(() => {
      result.current.removeTheme(1);
    });

    expect(result.current.themes).toEqual([
      {
        id: 2,
        name: "Blue",
        "background-color": "#1600db",
        "primary-text-color": "#cec10e",
        "secondary-text-color": "#534b7e",
        "accent-color": "#463aed",
      },
    ]);

    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      "@Whatif.colors:themes",
      JSON.stringify(result.current.themes),
    );
  });
});
