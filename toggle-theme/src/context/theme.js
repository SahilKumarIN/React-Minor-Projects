import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  themeMode: "light",
  darktheme: () => {},
  lightheme: () => {},
});

export const ThemeProvider = ThemeContext.Provider;

export default function useTheme(){
    return useContext(ThemeContext)
}
