import React, { useEffect } from "react";
import { Appearance } from 'react-native';

const useDarkMode = () => {
    const mode = Appearance.getColorScheme();
    let isDarkMode = false;
    if (mode === 'dark') isDarkMode = true;
    const [darkMode, setDarkMode] = React.useState(isDarkMode);
    const toggle = () => setDarkMode(!darkMode);

    useEffect(() => {

        const updateMode = (mode: any) => {
            if (mode === 'dark') setDarkMode(true);
            else setDarkMode(false);
        };

        Appearance.addChangeListener(updateMode);

        return () => {
        };
    }, []);

    return { darkMode, toggle };
};

export default useDarkMode;