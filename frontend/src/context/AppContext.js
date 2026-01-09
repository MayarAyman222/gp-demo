import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  useEffect(() => {
    localStorage.setItem("theme", theme);

    // نغير الـ class على body فورياً
    const body = document.body;
    body.classList.remove("theme-light", "theme-dark", "theme-high-contrast");
    body.classList.add(`theme-${theme}`);

    // نغير الـ CSS variables مباشرة كمان للتأكد
    const root = document.documentElement;
    if (theme === "light") {
      root.style.setProperty("--bg-color", "#ffffff");
      root.style.setProperty("--text-color", "#232323");
      root.style.setProperty("--card-bg", "#ffffff");
      root.style.setProperty("--header-bg", "#f0f0f0");
      root.style.setProperty("--link-color", "#1a73e8");
    } else if (theme === "dark") {
      root.style.setProperty("--bg-color", "#232323");
      root.style.setProperty("--text-color", "#f7f7f7");
      root.style.setProperty("--card-bg", "#2c2c2c");
      root.style.setProperty("--header-bg", "#282c34");
      root.style.setProperty("--link-color", "#61dafb");
    } else if (theme === "high-contrast") {
      root.style.setProperty("--bg-color", "#000000");
      root.style.setProperty("--text-color", "#ffff00");
      root.style.setProperty("--card-bg", "#000000");
      root.style.setProperty("--header-bg", "#000000");
      root.style.setProperty("--link-color", "#ff00ff");
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <AppContext.Provider value={{ theme, setTheme, language, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
};
