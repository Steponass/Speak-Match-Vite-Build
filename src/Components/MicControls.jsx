import React from 'react';
import SpeechRecognition from 'react-speech-recognition';

const MicControls = ({
    listening,
    transcript,
    setShowResults,
    resetTranscript,
    setStep,
    setContext,
    setPhraseFunction,
    setSelectedPhrases,
    setMatchedPhrases
}) => {
    return (
        <div className="mic-controls-container">
            <div className="mic-control">
                <button className='mic-button'
                    aria-label='Turn on microphone'
                    onClick={() => {
                        if (listening) {
                            SpeechRecognition.stopListening();
                            setShowResults(false);
                        } else {
                            SpeechRecognition.startListening({ continuous: true, lang: "en-US", interimResults: true });
                        }
                    }}
                >🎤</button>
                <label className="mic-label">{listening ? 'Stop Listening' : 'Start Listening'}</label>
            </div>
            {!listening && transcript && (
                <div className="mic-control">
                    <button className='mic-button' onClick={() => setShowResults(prev => !prev)}>
                        📊
                    </button>
                    <label className="mic-label">{setShowResults ? 'Show Phrases' : 'Show Results'}</label>
                </div>
            )}
            <div className="mic-control">
                <button className='mic-button'
                    onClick={() => {
                        SpeechRecognition.stopListening();
                        setStep(1);
                        setContext(null);
                        setPhraseFunction(null);
                        setSelectedPhrases([]);
                        setMatchedPhrases(new Set());
                        setShowResults(false);
                        resetTranscript();
                    }}>
                    ↺
                </button>
                <label className="mic-label">Start Over</label>
            </div>
        </div>
    );
};

export default MicControls; 