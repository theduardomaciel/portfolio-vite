import React, { createContext, useContext, useEffect, useState } from 'react';
import updateVisual from '../utils/functions/updateVisual';

type ContextTypes = {
    switchTheme: () => void;
    theme: string;
    changeLanguage: () => void /* (language: string) => void */;
    language: string;
    changeLOD: () => void;
    LOD: string;
}

type ContextProviderProps = {
    children: React.ReactNode;
}

const Context = createContext({} as ContextTypes);

export function ContextProvider({ children }: ContextProviderProps) {
    const localStorageTheme = window.localStorage.getItem('currentTheme') as string;
    const [theme, setTheme] = useState(localStorageTheme ? localStorageTheme : "dark");

    function switchTheme() {
        const newTheme = theme === "dark" ? "light" : "dark"

        window.localStorage.setItem('currentTheme', newTheme)
        setTheme(newTheme)
    }

    useEffect(() => {
        updateVisual(theme)
    }, [theme])

    const localStorageLanguage = window.localStorage.getItem('language') as string;
    const [language, setLanguage] = useState(localStorageLanguage ? localStorageLanguage : "en")

    function changeLanguage() {
        const newLanguage = language === "pt" ? "en" : "pt"
        window.localStorage.setItem('language', newLanguage)
        setLanguage(newLanguage)
        console.log("Linguagem alterada para: ", newLanguage)
    }

    const localStorageLOD = window.localStorage.getItem('levelOfDetail') as string;
    const [LOD, setLOD] = useState(localStorageLOD ? localStorageLOD : "high")

    function changeLOD() {
        const newLOD = LOD === "high" ? "low" : "high"
        window.localStorage.setItem('levelOfDetail', newLOD)
        setLOD(newLOD)
        console.log("Nível de detalhe alterado para: ", newLOD)
    }

    const sharedState = {
        switchTheme,
        theme,
        changeLanguage,
        language,
        changeLOD,
        LOD
    };

    return (
        <Context.Provider value={sharedState}>
            {children}
        </Context.Provider>
    );
}

export function useAppContext() {
    return useContext(Context);
}