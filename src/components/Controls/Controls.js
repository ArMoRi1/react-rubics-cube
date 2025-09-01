import React from 'react';
import './Controls.css';

const Controls = ({
                      moves,
                      isRotating,
                      onShuffle,
                      onReset,
                      onRotateX,
                      onRotateY,
                      onRotateZ
                  }) => {
    return (
        <div className="rubik-cube__sidebar">
            <div className="function-item">
                <h3>Додаткові функції</h3>
                <button onClick={onShuffle} disabled={isRotating}>
                    Перемішати
                </button>
                <button onClick={onReset}>
                    Скинути
                </button>
                <button onClick={onRotateX} disabled={isRotating}>
                    Поворот X
                </button>
                <button onClick={onRotateY} disabled={isRotating}>
                    Поворот Y
                </button>
                <button onClick={onRotateZ} disabled={isRotating}>
                    Поворот Z
                </button>
            </div>


        </div>
    );
};

export default Controls;


