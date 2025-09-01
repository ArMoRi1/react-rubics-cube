import React, { useState } from 'react';
import './Instructions.css';

const Instructions = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleInstructions = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="instructions">
            <div className="instructions__header" onClick={toggleInstructions}>
                <h3>Інструкції</h3>
                <span className={`instructions__toggle ${isExpanded ? 'expanded' : ''}`}>
                    ▼
                </span>
            </div>

            {isExpanded && (
                <div className="instructions__content">
                    <div className="instructions__section">
                        <h4>🎯 Мета гри</h4>
                        <p>Розмістити всі кольори на відповідних сторонах кубика</p>
                    </div>

                    <div className="instructions__section">
                        <h4>🖱️ Керування</h4>
                        <ul>
                            <li><strong>Миша:</strong> Тягни для обертання кубика</li>
                            <li><strong>Кнопки:</strong> Поворот по осях X, Y, Z</li>
                            <li><strong>Перемішати:</strong> Випадкові повороти</li>
                            <li><strong>Скинути:</strong> Повернення в початкове положення</li>
                        </ul>
                    </div>

                    <div className="instructions__section">
                        <h4>🎨 Кольори граней</h4>
                        <div className="color-guide">
                            <div className="color-item">
                                <div className="color-box" style={{backgroundColor: '#ff0000'}}></div>
                                <span>Передня (Червона)</span>
                            </div>
                            <div className="color-item">
                                <div className="color-box" style={{backgroundColor: '#ff8000'}}></div>
                                <span>Задня (Помаранчева)</span>
                            </div>
                            <div className="color-item">
                                <div className="color-box" style={{backgroundColor: '#00ff00'}}></div>
                                <span>Права (Зелена)</span>
                            </div>
                            <div className="color-item">
                                <div className="color-box" style={{backgroundColor: '#0000ff'}}></div>
                                <span>Ліва (Синя)</span>
                            </div>
                            <div className="color-item">
                                <div className="color-box" style={{backgroundColor: '#ffffff'}}></div>
                                <span>Верхня (Біла)</span>
                            </div>
                            <div className="color-item">
                                <div className="color-box" style={{backgroundColor: '#ffff00'}}></div>
                                <span>Нижня (Жовта)</span>
                            </div>
                        </div>
                    </div>

                    <div className="instructions__section">
                        <h4>💡 Поради</h4>
                        <ul>
                            <li>Починай з вивчення базових алгоритмів</li>
                            <li>Спочатку розв'яжи одну сторону</li>
                            <li>Використовуй таймер для відстеження прогресу</li>
                            <li>Практикуйся регулярно для покращення часу</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Instructions;