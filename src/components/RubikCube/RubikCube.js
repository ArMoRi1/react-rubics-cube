import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import './RubikCube.css';

const RubikCube = ({ onGameStart }) => {
    const mountRef = useRef();
    const sceneRef = useRef();
    const rendererRef = useRef();
    const cubeGroupRef = useRef();
    const cameraRef = useRef();

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

        // Робимо квадратний canvas що поміщається в контейнер
        const size = Math.min(containerWidth - 20, containerHeight - 20, 500);

        return {
            width: size,
            height: size
        };
    }, []);

    // Функція налаштування сцени
    const setupScene = useCallback(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x222222);

        const { width, height } = getCanvasSize();

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.set(4, 4, 4);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);

        // Світло
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);

        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        scene.add(ambientLight);

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
        };

        const onMouseDown = (event) => {
            isMouseDown = true;
            mouseX = event.clientX;
            mouseY = event.clientY;
            if (onGameStart) onGameStart();
        };

        const onMouseUp = () => {
            isMouseDown = false;
        };

        renderer.domElement.addEventListener('mousemove', onMouseMove);
        renderer.domElement.addEventListener('mousedown', onMouseDown);
        renderer.domElement.addEventListener('mouseup', onMouseUp);

        return () => {
            renderer.domElement.removeEventListener('mousemove', onMouseMove);
            renderer.domElement.removeEventListener('mousedown', onMouseDown);
            renderer.domElement.removeEventListener('mouseup', onMouseUp);
        };
    }, [onGameStart]);

    // Головний useEffect для ініціалізації
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

        // Обробник зміни розміру вікна
        window.addEventListener('resize', handleResize);

        // Рендер цикл
        let animationId;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // Покращений cleanup
        return () => {
            cancelAnimationFrame(animationId);
            removeMouseControls();
            window.removeEventListener('resize', handleResize);

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
    }, [setupScene, createRubikCube, addMouseControls, handleResize]);

    return (
        <div className="rubik-cube">
            {/* Головна сцена */}
            <div className="rubik-cube__main">
                <div className="rubik-cube__scene" ref={mountRef}></div>
            </div>

        </div>
    );
};

export default RubikCube;