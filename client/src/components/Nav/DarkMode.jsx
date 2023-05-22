import { forwardRef, useContext } from 'react';
import DarkModeIcon from '../svg/DarkModeIcon';
import LightModeIcon from '../svg/LightModeIcon';
import { ThemeContext } from 'src/hooks/ThemeContext';

const DarkMode = forwardRef(() => {
  const { theme, setTheme } = useContext(ThemeContext);

  const clickHandler = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const mode = theme === 'dark' ? 'Light mode' : 'Dark mode';

  return (
    <button
      className="flex w-full cursor-pointer items-center gap-3 px-3 py-3 text-sm text-white transition-colors duration-200 hover:bg-gray-700"
      onClick={clickHandler}
    >
      {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      {mode}
    </button>
  );
});

export default DarkMode;
