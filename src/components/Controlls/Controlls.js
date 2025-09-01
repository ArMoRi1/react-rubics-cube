import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import './Controlls.css';



const Controlls = () => {



    return(
        <div className="rubik-cube__sidebar">
            <div className="function-item">
                <h3>Додатк ові функції</h3>
                <button onClick={shuffle} disabled={isRotating}>
                    Перемішати
                </button>
                <button onClick={reset}>
                    Скинути
                </button>
                <button onClick={rotateX} disabled={isRotating}>
                    Поворот X
                </button>
                <button onClick={rotateY} disabled={isRotating}>
                    Поворот Y
                </button>
                <button onClick={rotateZ} disabled={isRotating}>
                    Поворот Z
                </button>
            </div>

            <div className="function-item">
                <div className="moves-counter">Ходи: {moves}</div>
            </div>
        </div>
    );
}

