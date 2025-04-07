import React, { useState, useEffect } from 'react';

export default function DarkModeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
    }, [isDarkMode]);

    const handleToggle = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <div id="dark-mode-toggle-container">
            <input 
                type="checkbox" 
                id="dark-mode-toggle" 
                role="switch" 
                aria-label="Toggle dark mode" 
                checked={isDarkMode} 
                onChange={handleToggle}
            />
            <label className='toggle' htmlFor="dark-mode-toggle"></label>
        </div>
    );
}


