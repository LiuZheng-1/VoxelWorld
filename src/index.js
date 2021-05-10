import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Water } from 'three/examples/jsm/objects/Water2';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { skybox } from './skybox.js'
import { WaterCube } from './water_cube'
import { Mesh, Texture } from 'three';

var rollOverGeo, rollOverMaterial, rollOverMesh
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var objects = [];
var isShiftDown = false
var cubeGeo, cubeMaterial
var cube
var originCubePosition = [
    { x: -275, y: 25, z: 25 },
    { x: -125, y: 25, z: 75 },
    { x: -125, y: 25, z: 175 },
    { x: -325, y: 25, z: 175 },
    { x: 75, y: 25, z: 125 },
    { x: 25, y: 25, z: -25 },
    { x: -125, y: 25, z: -125 },
    { x: -25, y: 25, z: -175 },
    { x: 75, y: 25, z: 275 },
    { x: 25, y: 25, z: 175 },
    { x: 25, y: 75, z: 175 },
    { x: 25, y: 75, z: 225 },
    { x: -25, y: 25, z: 225 },
    { x: 175, y: 25, z: 275 },
    { x: 225, y: 25, z: 175 },
    { x: 225, y: 25, z: 75 },
    { x: 325, y: 25, z: 175 },
    { x: 175, y: 25, z: -275 },
    { x: 125, y: 25, z: -125 },
    { x: 125, y: 25, z: -25 },
    { x: 225, y: 25, z: -125 },
    { x: 25, y: 25, z: 25 },
    { x: -75, y: 25, z: -25 },
    { x: -125, y: 25, z: -25 },
    { x: -75, y: 25, z: -125 }
]

var createPreview = function () {
    rollOverGeo = new THREE.BoxGeometry(50, 50, 50);
    rollOverMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });
    rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
    scene.add(rollOverMesh);
}

var createWater = function () {
    createPreview();
    cubeGeo = new THREE.BoxGeometry(50, 50, 50);
    cubeMaterial = new THREE.MeshLambertMaterial( {map: new THREE.TextureLoader().load('../dist/textures/water/Water_2_M_Normal.jpg') } );
}

var createGrass = function () {
    createPreview();
    cubeGeo = new THREE.BoxGeometry(50, 50, 50);
    cubeMaterial = new THREE.MeshLambertMaterial( {map: new THREE.TextureLoader().load('../dist/textures/grass/grass.jpg') } );
}

var createBrick = function () {
    createPreview();
    cubeGeo = new THREE.BoxGeometry(50, 50, 50);
    cubeMaterial = new THREE.MeshLambertMaterial( {map: new THREE.TextureLoader().load('../dist/textures/brick/brick_diffuse.jpg') } );

}

// // init

// create box
var info = document.createElement('div');
document.body.appendChild(info)
info.style.position = 'absolute';
info.style.top = '10px';
info.style.width = '200px';
info.style.height = '50px'
info.style.background = '#ccc'
info.style.textAlign = 'center';
info.style.zIndex = 99;
var waterElement = document.createElement('button')
waterElement.id = 'waterCube'
waterElement.onclick = createWater
console.log(waterElement);
info.appendChild(waterElement);

var info = document.createElement('div');
document.body.appendChild(info)
info.style.position = 'absolute';
info.style.top = '70px';
info.style.width = '200px';
info.style.height = '50px'
info.style.background = '#ccc'
info.style.textAlign = 'center';
info.style.zIndex = 99;
var grassElement = document.createElement('button')
grassElement.id = 'grassCube'
grassElement.onclick = createGrass
console.log(grassElement);
info.appendChild(grassElement);

var info = document.createElement('div');
document.body.appendChild(info)
info.style.position = 'absolute';
info.style.top = '130px';
info.style.width = '200px';
info.style.height = '50px'
info.style.background = '#ccc'
info.style.textAlign = 'center';
info.style.zIndex = 99;
var brickElement = document.createElement('button')
brickElement.id = 'mcGrassCube'
brickElement.onclick = createBrick
console.log(brickElement);
info.appendChild(brickElement);

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);//设置透视投影的相机
camera.position.set(500, 800, 1300);//设置相机坐标
camera.lookAt(new THREE.Vector3());//设置视野的中心坐标

var scene = new THREE.Scene();
var ratio = window.innerWidth / window.innerHeight;
var renderer = new THREE.WebGLRenderer();
var controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xCCCCCC, 1.0);


var clock = new THREE.Clock();


// var material = new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.2, transparent: true });
// //创建一个线条材质，线条颜色黑色，透明度0.2
// var line = new THREE.LineSegments(geometry, material);
// scene.add(line);

const gui = new GUI();

var cameralight = new THREE.PointLight(new THREE.Color(1, 1, 1), 1);
camera.add(cameralight);
scene.add(camera);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(- 1, 1, 1);
scene.add(directionalLight);



//final update loop
var MyUpdateLoop = function () {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(MyUpdateLoop);
};
requestAnimationFrame(MyUpdateLoop);

//this fucntion is called when the window is resized
var MyResize = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    console.log("resizing")
};
//link the resize of the window to the update of the camera
window.addEventListener('resize', MyResize);


// water
const water_params = {
    color: '#ffffff',
    scale: 0.5,
    flowX: 1,
    flowY: 1,
    cube_color: "#20a8e6",
    cube_opacity: 0.5,
};



// var water_cube = new THREE.Object3D();

// const waterGeometry = new THREE.PlaneGeometry( 1, 1 );
// var water = new Water( waterGeometry, {
//     color: water_params.color,
//     scale: water_params.scale,
//     flowDirection: new THREE.Vector2( water_params.flowX, water_params.flowY ),
//     textureWidth: 1024,
//     textureHeight: 1024
// } );

// water.position.y = 0.5;
// water.rotation.x = Math.PI * - 0.5;
// water_cube.add( water );

// var cube_geometry = new THREE.BoxGeometry(1,0.99,1);
// var cube_material = new THREE.MeshBasicMaterial( { 
//     color: water_params.cube_color,
//     transparent:true,
//     opacity:water_params.cube_opacity
// } );
// var cube = new THREE.Mesh( cube_geometry, cube_material );
// water_cube.add( cube );

// var water_cube = WaterCube(water_params);
// scene.add(water_cube)
// var water_cube_1 = WaterCube(water_params, 1, 0);
// scene.add(water_cube_1)

scene.background = skybox();

// gui.addColor( water_params, 'color' ).onChange( function ( value ) {
//     water.material.uniforms[ 'color' ].value.set( value );
// } );
// gui.add( water_params, 'scale', 0.01, 2 ).step( 0.01 ).onChange( function ( value ) {
//     water.material.uniforms[ 'config' ].value.w = value;
// } );
// gui.addColor( water_params, 'cube_color' ).onChange( function ( value ) {
//     cube.material.color.set(value);
//     console.log(value)
// } );
// gui.add( water_params, 'cube_opacity', 0,1 ).step( 0.01 ).onChange( function ( value ) {
//     cube.material.opacity = value;
// } );
// gui.open();


var groundGeometry = new THREE.PlaneBufferGeometry(1000, 1000);
groundGeometry.name = 'PlaneBufferGeometry'
var groundMaterial = new THREE.MeshStandardMaterial({ roughness: 0.8, metalness: 0.4 });
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
groundGeometry.rotateX(- Math.PI / 2);
// groundMaterial.wireframe = true
objects.push(ground);
scene.add(ground)

originCubePosition.forEach(position => {
    var cube_Geo = new THREE.BoxGeometry(50, 50, 50);
    var cube_Material = new THREE.MeshLambertMaterial({ color: 0xfeb74c });
    var cube = new THREE.Mesh(cube_Geo, cube_Material);
    cube.position.x = position.x
    cube.position.y = position.y
    cube.position.z = position.z
    objects.push(cube);

    scene.add(cube)
});
// const textureLoader = new THREE.TextureLoader();
// textureLoader.load('textures/Sand_01_basecolor.png', function (map) {
//     map.wrapS = THREE.RepeatWrapping;
//     map.wrapT = THREE.RepeatWrapping;
//     map.anisotropy = 16;
//     map.repeat.set(4, 4);
//     groundMaterial.map = map;
//     groundMaterial.needsUpdate = true;
// });
// textureLoader.load('textures/Sand_01_normal.png', function (map) {
//     map.wrapS = THREE.RepeatWrapping;
//     map.wrapT = THREE.RepeatWrapping;
//     map.anisotropy = 16;
//     map.repeat.set(4, 4);
//     groundMaterial.normalMap = map;
//     groundMaterial.needsUpdate = true;
// })
function onDocumentMouseMove(event) {
    event.preventDefault();//取消事件的默认动作
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0 && rollOverMesh) {
        var intersect = intersects[0];
        rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
        rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
    }
    render();

}

function onDocumentMouseDown(event) {
    event.preventDefault();
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
        var intersect = intersects[0];
        if (isShiftDown) {
            if (intersect.object != ground) {
                scene.remove(intersect.object);
                objects.splice(objects.indexOf(intersect.object), 1);
            }
        } else {
            var voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
            //var voxel = WaterCube(water_params);
            voxel.position.copy(intersect.point).add(intersect.face.normal);
            voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
            voxel.castShadow = true
            scene.add(voxel);
            objects.push(voxel);
            // originCubePosition.push(voxel.position)

        }
        // console.log(originCubePosition);
        render();

    }

}

function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 16: isShiftDown = true; break;

    }
}
function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 16: isShiftDown = false; break;

    }
}

function render() {

    renderer.render(scene, camera);


}


document.addEventListener('mousemove', onDocumentMouseMove, false);//鼠标移动事件
document.addEventListener('mousedown', onDocumentMouseDown, false);//鼠标点击事件
document.addEventListener('keydown', onDocumentKeyDown, false);//对shift按键的控制
document.addEventListener('keyup', onDocumentKeyUp, false);//对shift按键的控制
console.log("done");