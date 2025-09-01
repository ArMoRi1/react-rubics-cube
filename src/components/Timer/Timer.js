import React, { useState, useEffect, useCallback } from 'react';
import './Timer.css';

const Timer = ({ isActive, onReset }) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // Запуск/зупинка таймера
    useEffect(() => {
        let interval;
        if (isActive && isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 10); // Оновлення кожні 10мс для точності
        }
        return () => clearInterval(interval);
    }, [isActive, isRunning]);

    // Форматування часу
    const formatTime = useCallback((centiseconds) => {
        const minutes = Math.floor(centiseconds / 6000);
        const seconds = Math.floor((centiseconds % 6000) / 100);
        const cs = centiseconds % 100;

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
    }, []);

    // Контроль таймера
    const startStop = useCallback(() => {
        setIsRunning(!isRunning);
    }, [isRunning]);

    const resetTimer = useCallback(() => {
        setTime(0);
        setIsRunning(false);
        if (onReset) onReset();
    }, [onReset]);

    return (
        <div className="timer">
            <div className="timer__display">
                {formatTime(time)}
            </div>
            <div className="timer__controls">
                <button
                    onClick={startStop}
                    className={`timer__button ${isRunning ? 'stop' : 'start'}`}
                >
                    {isRunning ? 'Стоп' : 'Старт'}
                </button>
                <button
                    onClick={resetTimer}
                    className="timer__button reset"
                >
                    Скинути
                </button>
            </div>
        </div>
    );
};

export default Timer;