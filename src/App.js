import React, { useState } from 'react';
import RubikCube from './components/RubikCube/RubikCube';
import Timer from './components/Timer/Timer';
import Controls from './components/Controls/Controls';
import Instructions from './components/Instructions/Instructions';
import './App.css';

function App() {
    const [isGameActive, setIsGameActive] = useState(false);

    const handleGameStart = () => {
        setIsGameActive(true);
    };

    const handleGameReset = () => {
        setIsGameActive(false);
    };

    return (
        <div className="app">
            {/*<header className="app__header">*/}
            {/*    <h1>🎲 Кубик Рубика</h1>*/}
            {/* </header>*/}

            <main className="app__main">
                <div className="app__layout">
                    {/* Інструкції */}
                    <aside className="sidebar">
                        <Instructions />
                    </aside>

                    {/* Кубик */}
                    <section className="game-area">
                        <RubikCube onGameStart={handleGameStart} />
                    </section>

                    {/* Контроли */}
                    <aside className="sidebar">
                        <Controls />
                        <Timer
                            isActive={isGameActive}
                            onReset={handleGameReset}
                        />
                    </aside>
                </div>
            </main>
        </div>
    );
}

export default App;