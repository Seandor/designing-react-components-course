
import ThemeContextProvider, { useThemeContext } from '../context/ThemeContext';

function BaseLayout({ children }) {
  const { theme } = useThemeContext();
  return (
    <div className={theme === 'light' ? 'container-fluid light' : 'container-fluid dark'}>
      {children}
    </div>
  );
}

function Layout({ startingTheme, children }) {
  return (
    <ThemeContextProvider startingTheme={startingTheme}>
      <BaseLayout>{children}</BaseLayout>
    </ThemeContextProvider>
  );
}

export default Layout;
