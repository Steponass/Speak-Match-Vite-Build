import React from 'react';
import PhraseMatchingSystem from './Components/PhraseMatchingSystem';
import DarkModeToggle from './Components/DarkModeToggle';
import AboutButton from './Components/AboutButton';
import Introduction from './Components/Introduction';
import { ViewTransition } from './Components/ViewTransition';

function App() {
    return (
        <ViewTransition>
        <div className="App">
            <header>
                <DarkModeToggle />
                <h1 className='header-title fontsize-h4 txt-bold rubberBand'>Speak & Match</h1>
                <AboutButton />
            </header>

            <Introduction />

            <main className='slideInDown'>
                <PhraseMatchingSystem />
            </main>
        </div>
        </ViewTransition>
    );
}

export default App;

