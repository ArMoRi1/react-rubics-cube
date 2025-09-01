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
            {/*    <h1>3D Rubik's Cube</h1>*/}
            {/*    <p>Інтерактивний кубик Рубика з Three.js</p>*/}
            {/*</header>*/}

            <main className="app__main">
                <div className="app__layout">
                    {/* Ліва колонка з інформацією */}
                    <aside className="app__sidebar">
                        <Instructions />
                    </aside>
                    {/* Основна область з кубиком */}
                    <section className="app__game-area">
                        <RubikCube onGameStart={handleGameStart} />
                    </section>
                    <aside>
                        <Controls/>
                    </aside>
                </div>
                    <Timer
                        isActive={isGameActive}
                        onReset={handleGameReset}
                    />
            </main>

        </div>
    );
}

export default App;