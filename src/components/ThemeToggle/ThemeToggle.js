'use client';
import React from 'react';
import { Sun, Moon } from 'react-feather';
import VisuallyHidden from '../VisuallyHidden';
import styles from './ThemeToggle.module.css';
import Cookie from 'js-cookie';
import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants';

function ThemeToggle({ initialTheme }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function handleClick() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);

    // Write the cookie for future visits
    Cookie.set('color-theme', nextTheme, {
      expires: 1000,
    });

    // 3 — Update the DOM to present the new colors
    const root = document.documentElement;
    const colors = nextTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;

    // 3.1 — Edit the data-attribute, so that we can apply CSS
    // conditionally based on the theme.
    root.setAttribute('data-color-theme', nextTheme);

    // 3.2 — Swap out the actual colors on the <html> tag.
    //       We do this by iterating over each CSS variable
    //       and setting it as a new inline style.
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <button className={styles.action} onClick={handleClick}>
      {theme === 'dark' ? (
        <Sun size="1.5rem" />
      ) : (
        <Moon size="1.5rem" />
      )}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default ThemeToggle;
