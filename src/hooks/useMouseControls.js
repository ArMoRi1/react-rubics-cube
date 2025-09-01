import { useCallback } from 'react';

export const useMouseControls = (isRotating) => {
    // Додавання контролів миші
    const addMouseControls = useCallback((renderer, cubeGroup) => {
        let mouseX = 0, mouseY = 0;
        let isMouseDown = false;

        const onMouseMove = (event) => {
            if (!isMouseDown || isRotating) return;

            const deltaX = event.clientX - mouseX;
            const deltaY = event.clientY - mouseY;

            cubeGroup.rotation.y += deltaX * 0.01;
            cubeGroup.rotation.x += deltaY * 0.01;

            mouseX = event.clientX;
            mouseY = event.clientY;
        };

        const onMouseDown = (event) => {
            isMouseDown = true;
            mouseX = event.clientX;
            mouseY = event.clientY;
        };

        const onMouseUp = () => {
            isMouseDown = false;
        };

        // Додаємо обробники подій
        renderer.domElement.addEventListener('mousemove', onMouseMove);
        renderer.domElement.addEventListener('mousedown', onMouseDown);
        renderer.domElement.addEventListener('mouseup', onMouseUp);

        // Повертаємо функцію очищення
        return () => {
            renderer.domElement.removeEventListener('mousemove', onMouseMove);
            renderer.domElement.removeEventListener('mousedown', onMouseDown);
            renderer.domElement.removeEventListener('mouseup', onMouseUp);
        };
    }, [isRotating]);

    return { addMouseControls };
};