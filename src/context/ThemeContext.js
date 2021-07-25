
import { createContext, useContext } from 'react';
import useTheme from '../hooks/useTheme';

export const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

function ThemeContextProvider({
  children,
  startingTheme,
}) {
  const {theme, setTheme} = useTheme(startingTheme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
