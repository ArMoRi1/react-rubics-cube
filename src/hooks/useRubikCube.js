import { useRef, useEffect } from 'react';
import { setupScene, createRubikCube } from '../utils/cubeUtils';
import { useMouseControls } from './useMouseControls';

export const useRubikCube = (isRotating) => {
    const mountRef = useRef();
    const sceneRef = useRef();
    const rendererRef = useRef();
    const cubeGroupRef = useRef();
    const cameraRef = useRef();

    const { addMouseControls } = useMouseControls(isRotating);

    // Головний useEffect для ініціалізації Three.js сцени
    useEffect(() => {
        if (!mountRef.current) return;

        // Налаштування сцени
        const { scene, camera, renderer } = setupScene();
        sceneRef.current = scene;
        rendererRef.current = renderer;
        cameraRef.current = camera;

        // Створення кубика
        const cubeGroup = createRubikCube();
        cubeGroupRef.current = cubeGroup;
        scene.add(cubeGroup);

        // Додавання до DOM
        mountRef.current.appendChild(renderer.domElement);

        // Додавання контролів миші
        const removeMouseControls = addMouseControls(renderer, cubeGroup);

        // Рендер цикл
        let animationId;
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            // Автоматичне обертання можна увімкнути тут
            // if (!isRotating) {
            //     cubeGroup.rotation.y += 0.005;
            // }

            renderer.render(scene, camera);
        };
        animate();

        // Cleanup функція
        return () => {
            cancelAnimationFrame(animationId);
            removeMouseControls();

            // Більш надійне видалення canvas
            const canvas = renderer.domElement;
            if (canvas && canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }

            renderer.dispose();

            // Очищення сцени
            while(scene.children.length > 0) {
                scene.remove(scene.children[0]);
            }
        };
    }, [addMouseControls, isRotating]);

    return {
        mountRef,
        sceneRef,
        rendererRef,
        cubeGroupRef,
        cameraRef
    };
};