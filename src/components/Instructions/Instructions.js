import React, { useState } from 'react';
import './Instructions.css';

const Instructions = ({ isCollapsed, onToggle }) => {
    return (
        <div className={`instructions ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="instructions__toggle-btn" onClick={onToggle}>
                <span className={`toggle-icon ${isCollapsed ? 'collapsed' : ''}`}>
                    {isCollapsed ? '▶️' : '◀️'}
                </span>
                {!isCollapsed && <span className="toggle-text">Згорнути</span>}
            </div>

            <div className="instructions__content">
                <div className="instructions__header">
                    <h3>📋 Інструкції</h3>
                </div>

                <div className="instructions__sections">
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
                        <h4>💡 Поради</h4>
                        <ul>
                            <li>Починай з вивчення базових алгоритмів</li>
                            <li>Спочатку розв'яжи одну сторону</li>
                            <li>Використовуй таймер для відстеження прогресу</li>
                            <li>Практикуйся регулярно для покращення часу</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instructions;