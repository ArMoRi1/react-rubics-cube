import React from 'react';
import './Instructions.css';

const Instructions = ({ isCollapsed, onToggle }) => {
    return (
        <div className={`instructions ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="instructions__toggle-btn" onClick={onToggle}>
                <span className={`toggle-icon ${isCollapsed ? 'collapsed' : ''}`}>
                    {isCollapsed ? '▶️' : '◀️'}
                </span>
                {!isCollapsed && <span className="toggle-text">Collapse</span>}
            </div>

            <div className="instructions__content">
                <div className="instructions__header">
                    <h3>📋 Instructions</h3>
                </div>

                <div className="instructions__sections">
                    <div className="instructions__section">
                        <h4>📚 Notation</h4>
                        <p><strong>Basic notation:</strong></p>
                        <ul>
                            <li><strong>U</strong> - Up (Top face)</li>
                            <li><strong>D</strong> - Down (Bottom face)</li>
                            <li><strong>R</strong> - Right (Right face)</li>
                            <li><strong>L</strong> - Left (Left face)</li>
                            <li><strong>F</strong> - Front (Front face)</li>
                            <li><strong>B</strong> - Back (Back face)</li>
                            <li><strong>'</strong> - means counter-clockwise rotation</li>
                        </ul>
                    </div>

                    <div className="instructions__section">
                        <h4>🎮 Controls</h4>

                        <div className="control-group">
                            <h5>🔄 Face Rotations</h5>
                            <ul>
                                <li><kbd>1</kbd> - U (Up face)</li>
                                <li><kbd>2</kbd> - R (Right face)</li>
                                <li><kbd>3</kbd> - L (Left face)</li>
                                <li><kbd>4</kbd> - F (Front face)</li>
                                <li><kbd>5</kbd> - D (Down face)</li>
                                <li><kbd>6</kbd> - B (Back face)</li>
                            </ul>
                        </div>

                        <div className="control-group">
                            <h5>↩️ Reverse Rotations</h5>
                            <ul>
                                <li><kbd>Alt+1</kbd> - U' (Up counter-clockwise)</li>
                                <li><kbd>Alt+2</kbd> - R' (Right counter-clockwise)</li>
                                <li><kbd>Alt+3</kbd> - L' (Left counter-clockwise)</li>
                                <li><kbd>Alt+4</kbd> - F' (Front counter-clockwise)</li>
                                <li><kbd>Alt+5</kbd> - D' (Down counter-clockwise)</li>
                                <li><kbd>Alt+6</kbd> - B' (Back counter-clockwise)</li>
                            </ul>
                        </div>

                        <div className="control-group">
                            <h5>🔄 Change Front Side</h5>
                            <ul>
                                <li><kbd>W</kbd> - move X' (rotate around X backwards)</li>
                                <li><kbd>S</kbd> - move X (rotate around X forward)</li>
                                <li><kbd>A</kbd> - move Y (rotate around Y left)</li>
                                <li><kbd>D</kbd> - move Y' (rotate around Y right)</li>
                                <li><kbd>Q</kbd> - move Z' (rotate around Z)</li>
                                <li><kbd>E</kbd> - move Z (rotate around Z backwards)</li>
                            </ul>
                        </div>

                        <div className="control-group">
                            <h5>📹 Camera Position</h5>
                            <ul>
                                <li><kbd>↑</kbd> - Camera up</li>
                                <li><kbd>↓</kbd> - Camera down</li>
                                <li><kbd>←</kbd> - Camera left</li>
                                <li><kbd>→</kbd> - Camera right</li>
                                <li><strong>Mouse:</strong> Drag to rotate camera</li>
                            </ul>
                        </div>

                        <div className="control-group">
                            <h5>🎯 Basic Actions</h5>
                            <ul>
                                <li><strong>Scramble:</strong> Random cube rotations</li>
                                <li><strong>Reset:</strong> Return to initial position</li>
                            </ul>
                        </div>
                    </div>

                    <div className="instructions__section">
                        <h4>💡 Tips</h4>
                        <ul>
                            <li>Learn basic algorithms for solving</li>
                            <li>Start by solving one color on one side</li>
                            <li>Use R U R' U' notation for basic moves</li>
                            <li>Apostrophe (') means counter-clockwise rotation</li>
                            <li>Practice regularly to improve your speed</li>
                            <li>Use move commands to change cube orientation</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instructions;