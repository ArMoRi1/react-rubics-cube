import React, { useRef, useEffect, useCallback, useMemo, useState } from 'react';
import * as THREE from 'three';
import './RubikCube.css';

const RubikCube = ({ onGameStart }) => {
    const mountRef = useRef();
    const sceneRef = useRef();
    const rendererRef = useRef();
    const cubeGroupRef = useRef();
    const cameraRef = useRef();
    const animationIdRef = useRef();
    const cleanupRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [isInteracting, setIsInteracting] = useState(false);

    // Кольори граней кубика - мемоізовані
    const colors = useMemo(() => ({
        front: 0xff0000,   // червоний
        back: 0xff8000,    // помаранчевий
        right: 0x00ff00,   // зелений
        left: 0x0000ff,    // синій
        top: 0xffffff,     // білий
        bottom: 0xffff00   // жовтий
    }), []);

    // Функція створення одного кубика
    const createSmallCube = useCallback((x, y, z) => {
        const geometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);

        // Матеріали для 6 граней
        const materials = [
            new THREE.MeshLambertMaterial({ color: x === 1 ? colors.right : 0x333333 }),
            new THREE.MeshLambertMaterial({ color: x === -1 ? colors.left : 0x333333 }),
            new THREE.MeshLambertMaterial({ color: y === 1 ? colors.top : 0x333333 }),
            new THREE.MeshLambertMaterial({ color: y === -1 ? colors.bottom : 0x333333 }),
            new THREE.MeshLambertMaterial({ color: z === 1 ? colors.front : 0x333333 }),
            new THREE.MeshLambertMaterial({ color: z === -1 ? colors.back : 0x333333 })
        ];

        const cube = new THREE.Mesh(geometry, materials);
        cube.position.set(x, y, z);

        // Чорні лінії між кубиками
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
        cube.add(line);

        return cube;
    }, [colors]);

    // Функція створення всього кубика Рубика
    const createRubikCube = useCallback(() => {
        const cubeGroup = new THREE.Group();

        // Створюємо 3x3x3 = 27 маленьких кубиків
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    const smallCube = createSmallCube(x, y, z);
                    cubeGroup.add(smallCube);
                }
            }
        }

        return cubeGroup;
    }, [createSmallCube]);

    // Функція обчислення розміру canvas
    const getCanvasSize = useCallback(() => {
        if (!mountRef.current) return { width: 400, height: 400 };

        const container = mountRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // Використовуємо весь доступний простір з невеликим відступом
        const width = containerWidth - 20;
        const height = containerHeight - 20;

        return { width, height };
    }, []);

    // Функція налаштування сцени
    const setupScene = useCallback(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x2c3e50);

        const { width, height } = getCanvasSize();

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.set(4, 4, 4);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Покращене освітлення
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        light.castShadow = true;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        scene.add(light);

        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);

        // Підсвічування
        const pointLight = new THREE.PointLight(0x00cec9, 0.5, 100);
        pointLight.position.set(-5, 5, 5);
        scene.add(pointLight);

        return { scene, camera, renderer };
    }, [getCanvasSize]);

    // Функція зміни розміру
    const handleResize = useCallback(() => {
        if (!rendererRef.current || !cameraRef.current) return;

        const { width, height } = getCanvasSize();

        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();

        rendererRef.current.setSize(width, height);
    }, [getCanvasSize]);

    // Додавання контролів миші
    const addMouseControls = useCallback((renderer, cubeGroup) => {
        let mouseX = 0, mouseY = 0;
        let isMouseDown = false;

        const onMouseMove = (event) => {
            if (!isMouseDown) return;

            const deltaX = event.clientX - mouseX;
            const deltaY = event.clientY - mouseY;

            cubeGroup.rotation.y += deltaX * 0.01;
            cubeGroup.rotation.x += deltaY * 0.01;

            mouseX = event.clientX;
            mouseY = event.clientY;

            setIsInteracting(true);
        };

        const onMouseDown = (event) => {
            isMouseDown = true;
            mouseX = event.clientX;
            mouseY = event.clientY;
            setIsInteracting(true);
            if (onGameStart) onGameStart();
        };

        const onMouseUp = () => {
            isMouseDown = false;
            setTimeout(() => setIsInteracting(false), 500);
        };

        renderer.domElement.addEventListener('mousemove', onMouseMove);
        renderer.domElement.addEventListener('mousedown', onMouseDown);
        renderer.domElement.addEventListener('mouseup', onMouseUp);
        renderer.domElement.addEventListener('mouseleave', onMouseUp);

        return () => {
            renderer.domElement.removeEventListener('mousemove', onMouseMove);
            renderer.domElement.removeEventListener('mousedown', onMouseDown);
            renderer.domElement.removeEventListener('mouseup', onMouseUp);
            renderer.domElement.removeEventListener('mouseleave', onMouseUp);
        };
    }, [onGameStart]);

    // Функція очищення
    const cleanup = useCallback(() => {
        // Зупиняємо анімацію
        if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
            animationIdRef.current = null;
        }

        // Видаляємо обробники подій
        if (cleanupRef.current) {
            cleanupRef.current();
            cleanupRef.current = null;
        }

        // Видаляємо обробник resize
        window.removeEventListener('resize', handleResize);

        // Видаляємо canvas з DOM
        if (rendererRef.current && rendererRef.current.domElement) {
            const canvas = rendererRef.current.domElement;
            if (canvas.parentNode === mountRef.current) {
                mountRef.current.removeChild(canvas);
            }
        }

        // Очищуємо Three.js ресурси
        if (rendererRef.current) {
            rendererRef.current.dispose();
            rendererRef.current = null;
        }

        // Очищуємо сцену
        if (sceneRef.current) {
            while(sceneRef.current.children.length > 0) {
                const child = sceneRef.current.children[0];
                sceneRef.current.remove(child);

                // Очищуємо geometry та material
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(material => material.dispose());
                    } else {
                        child.material.dispose();
                    }
                }
            }
            sceneRef.current = null;
        }

        // Очищуємо референси
        cameraRef.current = null;
        cubeGroupRef.current = null;
    }, [handleResize]);

    // Головний useEffect для ініціалізації
    useEffect(() => {
        if (!mountRef.current) return;

        // Очищуємо попередню сцену перед створенням нової
        cleanup();

        // Показуємо індикатор завантаження
        setIsLoading(true);

        // Затримка для плавного ефекту
        const initTimeout = setTimeout(() => {
            try {
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
                if (mountRef.current && !mountRef.current.contains(renderer.domElement)) {
                    mountRef.current.appendChild(renderer.domElement);
                }

                // Додавання контролів миші
                const removeMouseControls = addMouseControls(renderer, cubeGroup);
                cleanupRef.current = removeMouseControls;

                // Обробник зміни розміру вікна
                window.addEventListener('resize', handleResize);

                // Рендер цикл з легким автообертанням
                const animate = () => {
                    animationIdRef.current = requestAnimationFrame(animate);

                    // Легке автообертання коли не взаємодіють
                    if (!isInteracting && cubeGroupRef.current) {
                        cubeGroupRef.current.rotation.y += 0.002;
                    }

                    if (rendererRef.current && sceneRef.current && cameraRef.current) {
                        rendererRef.current.render(sceneRef.current, cameraRef.current);
                    }
                };
                animate();

                setIsLoading(false);
            } catch (error) {
                console.error('Error initializing Three.js scene:', error);
                setIsLoading(false);
            }
        }, 100);

        return () => {
            clearTimeout(initTimeout);
            cleanup();
        };
    }, []); // Порожній масив залежностей!

    // Окремий useEffect для resize
    useEffect(() => {
        const resizeHandler = () => {
            handleResize();
        };

        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    }, [handleResize]);

    return (
        <div className="rubik-cube">
            {/* Головна сцена */}
            <div
                className={`rubik-scene ${isInteracting ? 'interacting' : ''}`}
                ref={mountRef}
            >
                {isLoading && (
                    <div className="scene-loading">
                        <div className="spinner"></div>
                        Завантаження...
                    </div>
                )}
            </div>
        </div>
    );
};

export default RubikCube;