import React from 'react';
import RubikCube from './components/RubikCube/RubikCube';
import './App.css';

function App() {
  return (
      <div className="app">
        <header className="app__header">
          <h1>3D Rubik`s Cube</h1>
        </header>
        <main className="app__main">
            {/*<Controlls/>*/}
            <RubikCube />
            {/*<Instructions/>*/}
            {/*<Timer/>*/}
        </main>
      </div>
  );
}

export default App;