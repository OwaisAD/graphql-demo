import { createContext, useState } from "react";
import { Theme } from "../utils/types";

const myTheme: Theme = {
  isLight: true,
  light: {
    text: "#000",
    ui: "#DDD",
    bg: "#EEE",
  },
  dark: {
    text: "#FFF",
    ui: "#333",
    bg: "#555",
  },
};

export const ThemeContext = createContext<Theme>(myTheme);

const ThemeContextProvider = (props: { children: JSX.Element }) => {
  const [theme, setTheme] = useState(myTheme);
  return (
    <ThemeContext.Provider value={{ ...theme }}>
      <button onClick={() => setTheme({ ...theme, isLight: !theme.isLight })}>Toggle theme</button>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
