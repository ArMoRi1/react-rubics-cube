import React from 'react';
import './Controls.css';

const Controls = ({
                      moves = 0,
                      isRotating = false,
                      onShuffle,
                      onReset,
                      onRotateX,
                      onRotateY,
                      onRotateZ,
                      onFaceRotate,
                      onCameraMove,
                      onFrontFaceChange
                  }) => {
    return (
        <div className="controls">
            <div className="controls__header">
                <h3>🎮 Контроли</h3>
            </div>

            <div className="controls__content">
                <div className="function-group">
                    <h4>🎯 Основні дії</h4>
                    <button
                        className="controls__button shuffle"
                        onClick={onShuffle}
                        disabled={isRotating}
                        title="Перемішати кубик"
                    >
                        🔀 Перемішати
                    </button>
                    <button
                        className="controls__button reset"
                        onClick={onReset}
                        title="Скинути кубик"
                    >
                        🔄 Скинути
                    </button>
                </div>

                <div className="function-group">
                    <h4>🔄 Повороти граней</h4>
                    <div className="keyboard-controls">
                        <div className="key-row">
                            <div className="key-item" onClick={() => onFaceRotate?.('U')}>
                                <kbd>1</kbd>
                                <span>U (Верх)</span>
                            </div>
                            <div className="key-item" onClick={() => onFaceRotate?.('R')}>
                                <kbd>2</kbd>
                                <span>R (Право)</span>
                            </div>
                        </div>
                        <div className="key-row">
                            <div className="key-item" onClick={() => onFaceRotate?.('L')}>
                                <kbd>3</kbd>
                                <span>L (Ліво)</span>
                            </div>
                            <div className="key-item" onClick={() => onFaceRotate?.('F')}>
                                <kbd>4</kbd>
                                <span>F (Перед)</span>
                            </div>
                        </div>
                        <div className="key-row">
                            <div className="key-item" onClick={() => onFaceRotate?.('D')}>
                                <kbd>5</kbd>
                                <span>D (Низ)</span>
                            </div>
                            <div className="key-item" onClick={() => onFaceRotate?.('B')}>
                                <kbd>6</kbd>
                                <span>B (Зад)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="function-group">
                    <h4>↩️ Повороти назад</h4>
                    <div className="keyboard-controls">
                        <div className="key-row">
                            <div className="key-item" onClick={() => onFaceRotate?.('U\'')}>
                                <kbd>Alt+1</kbd>
                                <span>U'</span>
                            </div>
                            <div className="key-item" onClick={() => onFaceRotate?.('R\'')}>
                                <kbd>Alt+2</kbd>
                                <span>R'</span>
                            </div>
                        </div>
                        <div className="key-row">
                            <div className="key-item" onClick={() => onFaceRotate?.('L\'')}>
                                <kbd>Alt+3</kbd>
                                <span>L'</span>
                            </div>
                            <div className="key-item" onClick={() => onFaceRotate?.('F\'')}>
                                <kbd>Alt+4</kbd>
                                <span>F'</span>
                            </div>
                        </div>
                        <div className="key-row">
                            <div className="key-item" onClick={() => onFaceRotate?.('D\'')}>
                                <kbd>Alt+5</kbd>
                                <span>D'</span>
                            </div>
                            <div className="key-item" onClick={() => onFaceRotate?.('B\'')}>
                                <kbd>Alt+6</kbd>
                                <span>B'</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="function-group">
                    <h4>🔄 Фронтальна грань</h4>
                    <div className="keyboard-controls">
                        <div className="key-row single-key">
                            <div className="key-item" onClick={() => onFrontFaceChange?.('up')}>
                                <kbd>W</kbd>
                                <span>Вгору</span>
                            </div>
                        </div>
                        <div className="key-row">
                            <div className="key-item" onClick={() => onFrontFaceChange?.('left')}>
                                <kbd>A</kbd>
                                <span>Ліворуч</span>
                            </div>
                            <div className="key-item" onClick={() => onFrontFaceChange?.('right')}>
                                <kbd>D</kbd>
                                <span>Праворуч</span>
                            </div>
                        </div>
                        <div className="key-row single-key">
                            <div className="key-item" onClick={() => onFrontFaceChange?.('down')}>
                                <kbd>S</kbd>
                                <span>Вниз</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="function-group">
                    <h4>📹 Камера</h4>
                    <div className="keyboard-controls">
                        <div className="key-row single-key">
                            <div className="key-item" onClick={() => onCameraMove?.('up')}>
                                <kbd>↑</kbd>
                                <span>Вгору</span>
                            </div>
                        </div>
                        <div className="key-row">
                            <div className="key-item" onClick={() => onCameraMove?.('left')}>
                                <kbd>←</kbd>
                                <span>Ліворуч</span>
                            </div>
                            <div className="key-item" onClick={() => onCameraMove?.('right')}>
                                <kbd>→</kbd>
                                <span>Праворуч</span>
                            </div>
                        </div>
                        <div className="key-row single-key">
                            <div className="key-item" onClick={() => onCameraMove?.('down')}>
                                <kbd>↓</kbd>
                                <span>Вниз</span>
                            </div>
                        </div>
                        <div className="camera-note">
                            <span>🖱️ Або використовуйте мишу для обертання</span>
                        </div>
                    </div>
                </div>

                <div className="function-group">
                    <h4>🔄 Повороти осей</h4>
                    <button
                        className="controls__button"
                        onClick={onRotateX}
                        disabled={isRotating}
                        title="Поворот навколо осі X"
                    >
                        ↕️ Поворот X
                    </button>
                    <button
                        className="controls__button"
                        onClick={onRotateY}
                        disabled={isRotating}
                        title="Поворот навколо осі Y"
                    >
                        ↔️ Поворот Y
                    </button>
                    <button
                        className="controls__button"
                        onClick={onRotateZ}
                        disabled={isRotating}
                        title="Поворот навколо осі Z"
                    >
                        🔄 Поворот Z
                    </button>
                </div>

                <div className="moves-counter">
                    <span className="counter-label">Кількість ходів</span>
                    <div className="counter-value">{moves}</div>
                </div>
            </div>
        </div>
    );
};

export default Controls;