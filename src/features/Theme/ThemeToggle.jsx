import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const isDark = theme === 'dark';

  return (
    <button
      className={`theme-switch${isDark ? ' dark' : ''}`}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      type="button"
    >
      <span className="theme-switch-slider" />
      <span className="theme-switch-icon">{isDark ? '🌙' : '🔆'}</span>
    </button>
  );
};

export default ThemeToggle;
