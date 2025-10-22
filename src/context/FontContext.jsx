import React, { createContext, useContext, useEffect, useState } from "react";

const FontContext = createContext();

export const useFont = () => useContext(FontContext);

export const fonts = [
    { name: "Inter", family: "'Inter', sans-serif" },
    { name: "Lato", family: "'Lato', sans-serif" },
    { name: "Roboto Mono", family: "'Roboto Mono', monospace" },
    { name: "Playfair Display", family: "'Playfair Display', serif" },
    { name: "Lora", family: "'Lora', serif" },
];

export const AppFontProvider = ({ children }) => {
    const [font, setFont] = useState(() => {
        return localStorage.getItem("font") || "'Inter', sans-serif";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.style.setProperty('--font-family', font);
        localStorage.setItem("font", font);
    }, [font]);

    const changeFont = (newFontFamily) => {
        setFont(newFontFamily);
    };

    return (
        <FontContext.Provider value={{ font, changeFont, fonts }}>
            {children}
        </FontContext.Provider>
    );
};