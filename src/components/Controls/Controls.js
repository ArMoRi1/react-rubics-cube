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
                <h3>🎮 Controls</h3>
            </div>

            <div className="controls__content">
                <div className="function-group">
                    <h4>🎯 Basic actions</h4>
                    <button
                        className="controls__button shuffle"
                        onClick={onShuffle}
                        disabled={isRotating}
                        title="Перемішати кубик"
                    >
                        🔀 Scramble
                    </button>
                    <button
                        className="controls__button reset"
                        onClick={onReset}
                        title="Скинути кубик"
                    >
                        🔄 Reset
                    </button>
                </div>

                <div className="function-group">
                    <h4>🔄 Face rotations</h4>
                    <div className="keyboard-controls">
                        <div className="key-row">
                            <div className="key-item" onClick={() => onFaceRotate?.('U')}>
                                <kbd>1</kbd>
                                <span>U</span>
                            </div>
                            <div className="key-item" onClick={() => onFaceRotate?.('R')}>
                                <kbd>2</kbd>
                                <span>R</span>
                            </div>
                        </div>
                        <div className="key-row">
                            <div className="key-item" onClick={() => onFaceRotate?.('L')}>
                                <kbd>3</kbd>
                                <span>L</span>
                            </div>
                            <div className="key-item" onClick={() => onFaceRotate?.('F')}>
                                <kbd>4</kbd>
                                <span>F</span>
                            </div>
                        </div>
                        <div className="key-row">
                            <div className="key-item" onClick={() => onFaceRotate?.('D')}>
                                <kbd>5</kbd>
                                <span>D</span>
                            </div>
                            <div className="key-item" onClick={() => onFaceRotate?.('B')}>
                                <kbd>6</kbd>
                                <span>B</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="function-group">
                    <h4>↩️ Counter-clockwise rotation</h4>
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
                    <h4>🔄 Change front side</h4>
                    <div className="keyboard-controls">
                        <div className="key-row single-key">
                            <div className="key-item" onClick={() => onFrontFaceChange?.('up')}>
                                <kbd>W</kbd>
                                <span>move X`</span>
                            </div>
                        </div>
                        <div className="key-row single-key">
                            <div className="key-item" onClick={() => onFrontFaceChange?.('down')}>
                                <kbd>S</kbd>
                                <span>move X</span>
                            </div>
                        </div>
                        <div className="key-row single-key">
                            <div className="key-item" onClick={() => onFrontFaceChange?.('right')}>
                                <kbd>D</kbd>
                                <span>move Y`</span>
                            </div>
                        </div>
                        <div className="key-row single-key">
                            <div className="key-item" onClick={() => onFrontFaceChange?.('left')}>
                                <kbd>A</kbd>
                                <span>move Y</span>
                            </div>
                        </div>
                        <div className="key-row single-key">
                            <div className="key-item" onClick={() => onFrontFaceChange?.('right')}>
                                <kbd>Q</kbd>
                                <span>move Z`</span>
                            </div>
                        </div>
                        <div className="key-row single-key">
                            <div className="key-item" onClick={() => onFrontFaceChange?.('down')}>
                                <kbd>E</kbd>
                                <span>move Z</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="function-group">
                    <h4>📹 Camera position</h4>
                    <div className="keyboard-controls">
                        <div className="key-row single-key">
                            <div className="key-item" onClick={() => onCameraMove?.('up')}>
                                <kbd>↑</kbd>
                                <span>Up</span>
                            </div>
                        </div>
                        <div className="key-row single-key">
                            <div className="key-item" onClick={() => onCameraMove?.('left')}>
                                <kbd>←</kbd>
                                <span>Left</span>
                            </div>
                        </div>
                        <div className="key-row single-key">
                            <div className="key-item" onClick={() => onCameraMove?.('right')}>
                                <kbd>→</kbd>
                                <span>Right</span>
                            </div>
                        </div>
                        <div className="key-row single-key">
                            <div className="key-item" onClick={() => onCameraMove?.('down')}>
                                <kbd>↓</kbd>
                                <span>Down</span>
                            </div>
                        </div>
                        <div className="camera-note">
                            <span>🖱️ Or you can use your mouse to move the camera</span>
                        </div>
                    </div>
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