import * as THREE from 'three';

// Кольори граней кубика
export const CUBE_COLORS = {
    front: 0xff0000,   // червоний
    back: 0xff8000,    // помаранчевий
    right: 0x00ff00,   // зелений
    left: 0x0000ff,    // синій
    top: 0xffffff,     // білий
    bottom: 0xffff00   // жовтий
};

// Функція створення одного маленького кубика
export const createSmallCube = (x, y, z) => {
    const geometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);

    // Матеріали для 6 граней
    const materials = [
        new THREE.MeshLambertMaterial({ color: x === 1 ? CUBE_COLORS.right : 0x333333 }),
        new THREE.MeshLambertMaterial({ color: x === -1 ? CUBE_COLORS.left : 0x333333 }),
        new THREE.MeshLambertMaterial({ color: y === 1 ? CUBE_COLORS.top : 0x333333 }),
        new THREE.MeshLambertMaterial({ color: y === -1 ? CUBE_COLORS.bottom : 0x333333 }),
        new THREE.MeshLambertMaterial({ color: z === 1 ? CUBE_COLORS.front : 0x333333 }),
        new THREE.MeshLambertMaterial({ color: z === -1 ? CUBE_COLORS.back : 0x333333 })
    ];

    const cube = new THREE.Mesh(geometry, materials);
    cube.position.set(x, y, z);

    // Чорні лінії між кубиками
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
    cube.add(line);

    return cube;
};

// Функція створення всього кубика Рубика
export const createRubikCube = () => {
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
};

// Функція налаштування сцени
export const setupScene = () => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);

    const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(800, 600);

    // Світло
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    return { scene, camera, renderer };
};