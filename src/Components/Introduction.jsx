import React, { useState, useEffect } from 'react';

export default function Introduction() {
    const [visibleDiv, setVisibleDiv] = useState(0);
    const [isModalOpen, setModalOpen] = useState(true); // Start with modal open
    const [isExiting, setIsExiting] = useState(false); // New state for exit animation

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleDiv((prev) => (prev < 3 ? prev + 1 : prev));
        }, 5000); // Show next div every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const closeModal = () => {
        setIsExiting(true); // Trigger exit animation
        setTimeout(() => setModalOpen(false), 300); // Adjust timeout to match exit animation duration
    };

    const renderContent = () => {
        if (visibleDiv === 0) {
            return <h3 key={0} className='flip-in-hor-top'>NNNeed to give a speech<br />or presentation?</h3>;
        } else if (visibleDiv === 1) {
            return <h3 key={1} className='flip-in-hor-top'>Managing a meeting<br />or a discussion...</h3>;
        } else if (visibleDiv === 2) {
            return <h3 key={2} className='flip-in-hor-top'>...and want to sound<br />more professional?</h3>;
        } else {
            return (
                <>
                    <h3 key={3} className='flip-in-hor-top'>This tool will:</h3>
                    <ol>
                        <li key={4} className='flip-in-hor-top'>Show you useful phrases</li>
                        <li key={5} className='flip-in-hor-top'>Listen to you speak</li>
                        <li key={6} className='flip-in-hor-top'>Mark the phrases you used!</li>
                    </ol>
                </>
            );
        }
    };

    return (
        <>
            {isModalOpen && (
                <div className={`modal ${isExiting ? 'exit-animation' : ''}`} onClick={closeModal}>
                    <div className='intro-container' onClick={e => e.stopPropagation()}>
                        <div className='intro-copy-container'>
                            <div>
                            {renderContent()}
                            </div>
                        </div>
                        <button className='button' onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
}