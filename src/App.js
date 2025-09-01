import React, { useState } from 'react';
import RubikCube from './components/RubikCube/RubikCube';
import Timer from './components/Timer/Timer';
import Controls from './components/Controls/Controls';
import Instructions from './components/Instructions/Instructions';
import './App.css';

function App() {
    const [isGameActive, setIsGameActive] = useState(false);
    const [isInstructionsCollapsed, setIsInstructionsCollapsed] = useState(false);

    const handleGameStart = () => {
        setIsGameActive(true);
    };

    const handleGameReset = () => {
        setIsGameActive(false);
    };

    const toggleInstructions = () => {
        setIsInstructionsCollapsed(!isInstructionsCollapsed);
    };

    return (
        <div className="app">
            <main className="app__main">
                <div className={`app__layout ${isInstructionsCollapsed ? 'instructions-collapsed' : ''}`}>
                    {/* Instructions */}
                    <Instructions
                        isCollapsed={isInstructionsCollapsed}
                        onToggle={toggleInstructions}
                    />

                    {/* Cube */}
                    <section className="game-area">
                        <RubikCube onGameStart={handleGameStart} />
                    </section>

                    {/* Controls */}
                    <div className="sidebar">
                        <Controls />
                        <Timer
                            isActive={isGameActive}
                            onReset={handleGameReset}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;