import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import PhrasesArray from './PhrasesArray';
import MicControls from './MicControls';

function PhraseMatchingSystem() {
    // Speech Recognition setup - move this to the top
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({
        commands: [] // Initialize with empty commands array
    });

    // Phrase Selection states
    const [step, setStep] = useState(1);
    const [context, setContext] = useState(null);
    const [phraseFunction, setPhraseFunction] = useState(null);
    const [selectedPhrases, setSelectedPhrases] = useState([]);
    const [matchedPhrases, setMatchedPhrases] = useState(new Set());
    const [showResults, setShowResults] = useState(false);
    const [phrasesTitle, setPhrasesTitle] = useState('Selected Phrases');

    // Handle phrase selection steps
    const handleSelect = (selected, nextStep) => {
        if (step === 1) setContext(selected);
        if (step === 2) setPhraseFunction(selected);
        setStep(nextStep);
    };


    // Phrase selection 
    const handlePhraseSelect = (phraseId) => {
        const selectedItem = PhrasesArray.find(item => item.id === phraseId);
        const selectedPhrases = {
            phrases: [
                { category: selectedItem?.targetPhrases1?.category, phrases: selectedItem?.targetPhrases1?.phrases || [] },
                { category: selectedItem?.targetPhrases2?.category, phrases: selectedItem?.targetPhrases2?.phrases || [] },
                { category: selectedItem?.targetPhrases3?.category, phrases: selectedItem?.targetPhrases3?.phrases || [] },
            ],
        };
        setSelectedPhrases(selectedPhrases); // Store phrases with categories
        setPhrasesTitle(`${selectedItem?.category || ''}: ${selectedItem?.function || ''}`);
        setStep(4);
    };

    // Allow user to check off the phrases manually
    const handlePhraseClick = (phrase) => {
        setMatchedPhrases(prev => {
            const newMatchedPhrases = new Set(prev);
            if (newMatchedPhrases.has(phrase)) {
                newMatchedPhrases.delete(phrase); // Remove if already matched
            } else {
                newMatchedPhrases.add(phrase); // Add if not matched
            }
            return newMatchedPhrases;
        });
    };

    // Check for matches in transcript
    React.useEffect(() => {
        if (transcript && selectedPhrases) {
            selectedPhrases.phrases.forEach(group => {
                group.phrases.forEach(phrase => {
                    // Ensure phrase is a string before calling replace
                    if (typeof phrase === 'string') {
                        // Remove ALL punctuation (including apostrophes) and convert to lowercase for comparison
                        const cleanPhrase = phrase.replace(/[.,/#!$%^&*;:{}=-_`~()']/g, "").toLowerCase();
                        const cleanTranscript = transcript.replace(/[.,/#!$%^&*;:{}=\-_`~()']/g, "").toLowerCase();

                        // Map of contractions to their non-contracted forms
                        const contractionMap = {
                            "im": "i am",
                            "youre": "you are",
                            "were": "we are",
                            "theyre": "they are",
                            "hes": "he is",
                            "shes": "she is",
                            "id": "i would",
                            "Im": "I am",
                            "Youre": "You are",
                            "Were": "We are",
                            "Theyre": "They are",
                            "Hes": "He is",
                            "Shes": "She is",
                            "Id": "I would"
                        };

                        // Check for both contracted and non-contracted forms
                        let matchFound = cleanTranscript.includes(cleanPhrase);
                        if (!matchFound) {
                            Object.entries(contractionMap).forEach(([contraction, nonContraction]) => {
                                if (cleanPhrase.includes(contraction)) {
                                    const nonContractedPhrase = cleanPhrase.replace(contraction, nonContraction);
                                    if (cleanTranscript.includes(nonContractedPhrase)) {
                                        matchFound = true;
                                    }
                                }
                            });
                        }

                        if (matchFound) {
                            setMatchedPhrases(prev => new Set([...prev, phrase]));
                        }
                    }
                });
            });
        }
    }, [transcript, selectedPhrases]);

    // Helper function to determine color based on category
    // function getColorForCategory(category) {
    //     switch (category) {
    //         case 'Intro':
    //             return 'disc';
    //         case 'Transition':
    //             return 'circle';
    //         case 'End':
    //             return 'square';
    //         default:
    //             return 'none';
    //     }
    // }

    // Handle breadcrumb navigation
    const handleBreadcrumbClick = (stepToGoBack) => {
        setStep(stepToGoBack);
        setShowResults(false);
        if (stepToGoBack === 1) {
            setContext(null);
            setPhraseFunction(null);
            setSelectedPhrases([]);
            setMatchedPhrases(new Set());
        } else if (stepToGoBack === 2) {
            setPhraseFunction(null);
            setSelectedPhrases([]);
            setMatchedPhrases(new Set());
        } else if (stepToGoBack === 3) {
            setSelectedPhrases([]);
            setMatchedPhrases(new Set());
        }
    };

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <section className="select-phrases-section">
            {/* Breadcrumbs - always present but only visible on step 2 */}
            <div className="breadcrumbs" style={{ visibility: step >= 2 ? 'visible' : 'hidden' }}>
                <span onClick={() => handleBreadcrumbClick(1)} style={{ cursor: 'pointer' }}>Home</span>
                {context && (
                    <>
                        {' > '}
                        <span onClick={() => handleBreadcrumbClick(2)} style={{ cursor: 'pointer' }}>{context}</span>
                    </>
                )}
                {phraseFunction && (
                    <>
                        {' > '}
                        <span onClick={() => handleBreadcrumbClick(3)} style={{ cursor: 'pointer' }}>{phraseFunction}</span>
                    </>
                )}
            </div>

            {/* Phrase Selection UI */}
            {step !== 4 && (
                <div className='select-phrases-button-container'>
                    {step === 1 && (
                        <>
                            <h2 className='fontsize-h4'>What's the context?</h2>
                            <button className='button' onClick={() => handleSelect('Professional', 2)}>Professional</button>
                            <button className='button' onClick={() => handleSelect('Academic', 2)}>Academic</button>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h2 className='fontsize-h4'>What's the situation?</h2>
                            {context === 'Professional' ? (
                                <>
                                    <button className='button' onClick={() => handleSelect('Speech', 3)}>Speech</button>
                                    <button className='button' onClick={() => handleSelect('Presentation', 3)}>Presentation</button>
                                    <button className='button' onClick={() => handleSelect('Meeting', 3)}>Meeting</button>
                                </>
                            ) : (
                                <>
                                    <button className='button' onClick={() => handleSelect('IELTS', 3)}>IELTS</button>
                                    <button className='button' onClick={() => handleSelect('Cambridge', 3)}>Cambridge</button>
                                    <button className='button' onClick={() => handleSelect('TBD', 3)}>TBD</button>
                                </>
                            )}
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <h2 className='fontsize-h4'>What type?</h2>
                            {phraseFunction === 'Speech' && (
                                <>
                                    <button className='button' onClick={() => handlePhraseSelect(0)}>Persuasive</button>
                                    <button className='button' onClick={() => handlePhraseSelect(1)}>Informative</button>
                                </>
                            )}
                            {phraseFunction === 'Presentation' && (
                                <>
                                    <button className='button' onClick={() => handlePhraseSelect('presentation-general')}>General</button>
                                    <button className='button' onClick={() => handlePhraseSelect(3)}>Persuasive</button>
                                    <button className='button' onClick={() => handlePhraseSelect(4)}>Informative</button>
                                </>
                            )}
                            {phraseFunction === 'Meeting' && (
                                <>
                                    <button className='button' onClick={() => handlePhraseSelect('meeting-discussion')}>Discussion</button>
                                    <button className='button' onClick={() => handlePhraseSelect('meeting-leading')}>Leading</button>
                                </>
                            )}
                            {phraseFunction === 'IELTS' && (
                                <>
                                    <button className='button' onClick={() => handlePhraseSelect(6)}>Speaking Part 2</button>
                                    <button className='button' onClick={() => handlePhraseSelect(7)}>Speaking Part 3</button>
                                </>
                            )}
                            {phraseFunction === 'Cambridge' && (
                                <>
                                    <button className='button' onClick={() => handlePhraseSelect(8)}>FCE - N/A</button>
                                    <button className='button' onClick={() => handlePhraseSelect(9)}>CAE - N/A</button>
                                </>
                            )}
                            {phraseFunction === 'TBD' && (
                                <>
                                    <button className='button' onClick={() => handlePhraseSelect(10)}>Option A</button>
                                    <button className='button' onClick={() => handlePhraseSelect(11)}>Option B</button>
                                </>
                            )}
                        </>
                    )}
                </div>
            )}

            {/* Display Selected Phrases and Matching UI */}
            {step === 4 && selectedPhrases && (
                <>
                    <div className="display-phrases-container">
                        <h2 className='fontsize-h4 phrases-title'>{phrasesTitle}

                        </h2>
                        {!showResults ? (
                            // Original phrases display as unordered list
                            selectedPhrases.phrases.map((group, index) => (
                                <div className={`selected-phrases pastel-color-${index % 4}`} key={index}>
                                    <h5 className='phrase-category'>{group.category}</h5>
                                    <ul className='phrase-group'>
                                        {group.phrases.map((phrase, phraseIndex) => (
                                            <li
                                                key={phraseIndex}
                                                className={matchedPhrases.has(phrase) ? 'matched-phrases' : ''}
                                                onClick={() => handlePhraseClick(phrase)}
                                            >
                                                {phrase}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            // Results display
                            <>
                                <div className="matched-phrases">
                                    <h3 className='summary-heading fontsize-h5'>You used these phrases:</h3>
                                    <ul>
                                        {Array.from(matchedPhrases).map((phrase, index) => (
                                            <li key={index}>{phrase}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="unmatched-phrases">
                                    <h3 className='summary-heading fontsize-h5'>Next time, try these:</h3>
                                    <ul>{selectedPhrases.phrases
                                        .flatMap(group => group.phrases)
                                        .filter(phrase => !matchedPhrases.has(phrase))
                                        .map((phrase, index) => (
                                            <li key={index}>{phrase}</li>
                                        ))}</ul>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Speech Recognition Controls */}
                    <MicControls
                        listening={listening}
                        transcript={transcript}
                        setShowResults={setShowResults}
                        resetTranscript={resetTranscript}
                        setStep={setStep}
                        setContext={setContext}
                        setPhraseFunction={setPhraseFunction}
                        setSelectedPhrases={setSelectedPhrases}
                        setMatchedPhrases={setMatchedPhrases}
                    />
                    {/* End of Speech Recognition Controls */}
                </>
            )}
            <p>{transcript}</p>
        </section>

    );
}

export default PhraseMatchingSystem; 