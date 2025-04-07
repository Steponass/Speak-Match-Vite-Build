import React, { useState } from 'react';

export default function AboutButton() {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <button className='about-button'
                aria-label='About this app'
                onClick={openModal}
            >  
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="oklch(var(--clr-about-button))"  viewBox="0 0 16 16">
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
</svg>
            </button>

            {isModalOpen && (
                <div className='modal about-modal' onClick={closeModal}>
                    <div className='modal-content' onClick={e => e.stopPropagation()}>
                        <h2 className=''>About This App</h2>
                        <p>This is a tool to practice using common English phrases when presenting, giving a short speech, or participating in a meeting.</p>
                        <h3>How to use it?</h3>
                        <ul>
                            <li>Choose your context ➡️ situation ➡️ type;</li>
                            <li>Read aloud the given phrases;</li>
                            <li>Press the 🎤 button;</li>
                        </ul>
                        <p>This is tool works on most Chrome-based browsers on Windows and Mac, but not on Android, sorry 😔.</p>
                        <button className='button' onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
}