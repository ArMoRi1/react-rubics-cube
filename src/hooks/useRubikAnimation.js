import { useState, useCallback } from 'react';

export const useRubikAnimation = () => {
    const [isRotating, setIsRotating] = useState(false);
    const [moves, setMoves] = useState(0);

    // Функція анімації повороту
    const animateRotation = useCallback((cubeGroup, axis, targetRotation) => {
        return new Promise((resolve) => {
            setIsRotating(true);
            setMoves(prev => prev + 1);

            const startRotation = cubeGroup.rotation[axis];
            const duration = 500;
            const startTime = Date.now();

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Плавна анімація з easing
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                cubeGroup.rotation[axis] = startRotation + (targetRotation - startRotation) * easeProgress;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setIsRotating(false);
                    resolve();
                }
            };

            animate();
        });
    }, []);

    // Функції поворотів
    const rotateX = useCallback((cubeGroup) => {
        if (isRotating || !cubeGroup) return;
        const targetRotation = cubeGroup.rotation.x + Math.PI / 2;
        return animateRotation(cubeGroup, 'x', targetRotation);
    }, [isRotating, animateRotation]);

    const rotateY = useCallback((cubeGroup) => {
        if (isRotating || !cubeGroup) return;
        const targetRotation = cubeGroup.rotation.y + Math.PI / 2;
        return animateRotation(cubeGroup, 'y', targetRotation);
    }, [isRotating, animateRotation]);

    const rotateZ = useCallback((cubeGroup) => {
        if (isRotating || !cubeGroup) return;
        const targetRotation = cubeGroup.rotation.z + Math.PI / 2;
        return animateRotation(cubeGroup, 'z', targetRotation);
    }, [isRotating, animateRotation]);

    // Функція перемішування
    const shuffle = useCallback((cubeGroup) => {
        if (isRotating || !cubeGroup) return;

        const rotateFunctions = [
            () => rotateX(cubeGroup),
            () => rotateY(cubeGroup),
            () => rotateZ(cubeGroup)
        ];
        let delay = 0;

        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const randomRotate = rotateFunctions[Math.floor(Math.random() * 3)];
                randomRotate();
            }, delay);
            delay += 600;
        }
    }, [isRotating, rotateX, rotateY, rotateZ]);

    // Функція скидання
    const reset = useCallback((cubeGroup) => {
        setMoves(0);
        if (cubeGroup) {
            cubeGroup.rotation.set(0, 0, 0);
        }
    }, []);

    return {
        moves,
        isRotating,
        animateRotation,
        rotateX,
        rotateY,
        rotateZ,
        shuffle,
        reset
    };
};