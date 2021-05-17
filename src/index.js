import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Water } from 'three/examples/jsm/objects/Water2';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { skybox } from './objs/skybox.js'
import { jsonLoader } from './utils/json_loader'
import { CUBE_MANAGER } from './cubes/index'
import { WATER_MANAGER } from './cubes/water_cube'

var originCubePosition = {
    "brick": [], "water": [], "grass": [], "door": [], "glass": []
}

var rollOverGeo, rollOverMaterial, rollOverMesh
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var objects = [];
var isShiftDown = false
var gui

<<<<<<< Updated upstream
var cube_list = ["brick", "water", "grass", "door", "glass"]
var currentCube = cube_list[0]
=======
// var cube_list = [
//                 "brick", "water", "grass", "door", "glass", 
//                 "dirt", "wood", "sand", "stone","acacia_leaves",
//                 "oak_leaves","sandstone"
            // ]
const textured_cube_setting = {
    'brick': { texture: "../dist/textures/brick/brick_diffuse.jpg" },
    "water": { color: "#20a8e6", opacity: 0 },//占个位置不显示
    'grass': { texture: '../dist/textures/grass/grass.jpg' },
    'glass': { color: "#ffffff", opacity: 0.3 },
    'dirt': { texture: "../dist/textures/minecraft_dirt.jpg" },
    'wood': { texture: "../dist/textures/wood.jpg" },
    'sand': { texture: "../dist/textures/minecraft_sand.jpg" },
    'stone': { texture: "../dist/textures/minecraft_stone.jpg" },
    'door': { texture: "../dist/textures/minecraft/door_spruce_lower.png" },
}

var currentCube = null
var currentFile = null
>>>>>>> Stashed changes
/*
 * Setting the basic conponents
 *
 */
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(5, 8, 13);
camera.lookAt(new THREE.Vector3());

var scene = new THREE.Scene();
var ratio = window.innerWidth / window.innerHeight;
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;


var controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xCCCCCC, 1.0);
var clock = new THREE.Clock();


var cube_manager = new CUBE_MANAGER(scene);
const water_params = {
    color: '#ffffff',
    scale: 0.8,
    flowX: 1,
    flowY: 1,
    cube_color: "#20a8e6",
    cube_opacity: 0.5,
};
var cube_list = cube_manager.getCubeList()
var water_manager = new WATER_MANAGER(scene, water_params);




var cameralight = new THREE.PointLight(new THREE.Color(1, 1, 1), 1);
camera.add(cameralight);
scene.add(camera);
const directionalLight = new THREE.DirectionalLight(0xcccccc, 0.6);
directionalLight.position.set(- 1, 1, 1);
scene.add(directionalLight);

var spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(-25, 450, 25);
spotLight.castShadow = true;
spotLight.distance = 2000
scene.add(spotLight);

var createPreview = function () {
    scene.remove(rollOverMesh)
    rollOverGeo = new THREE.BoxGeometry(1, 1, 1);
    rollOverMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });
    rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
    scene.add(rollOverMesh);
}
createPreview();

// // init

// create box
var info = document.createElement('div');
document.body.appendChild(info)
info.class = 'info'
info.style.display = 'flex'
info.style.position = 'absolute';
info.style.top = '10px';
info.style.width = '200px';
info.style.height = '50px'
info.style.background = '#ccc'
info.style.textAlign = 'center';
info.style.zIndex = 99;

// 加载cube的选项按钮

cube_list.forEach(cube_name => {
    var element = document.createElement('button');
    element.id = cube_name;
    element.innerHTML = cube_name;
    element.onclick = () => {
        currentCube = cube_name; // setting the current cube to allow other function to get it
    }
<<<<<<< Updated upstream
    info.appendChild(element);
=======
    // const url = textured_cube_setting[cube_name]
    // console.log(cube_name, url);
    // const url = 
    var url = cube_manager.getTexture(cube_name);
    if(url==null){
        element.style = 'background: #cccccc'
    }else if(url[0]=="#"){// color
        element.style = 'background:' + url
    }else{
        element.style = 'background:url(' + url + ');background-size:50px 50px'
    }
    // if(url==undefined){
    //     element.style = 'background: #cccccc'
    // }else if (cube_name === 'water' || cube_name === 'glass') {
    //     element.style = 'background:' + url.color
    // } else {
    //     element.style = 'background:url(' + url.texture + ');background-size:50px 50px'
    // }
    element.setAttribute('class', 'button')
    cubeButtonBox.appendChild(element);
>>>>>>> Stashed changes
});

var element = document.createElement('button');
element.id = "Save";
element.innerHTML = "Save";
element.onclick = () => {
    var aLink = document.createElement('a');
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    originCubePosition = {
        "brick": [], "water": [], "grass": [], "door": [], "glass": []
    }
    objects.forEach(element => {
        if (element.name !== 'ground') {
            originCubePosition[element.name].push(element.position)
        }
    });

    var blob = new Blob([JSON.stringify(originCubePosition)]);

    aLink.download = "saved_map.json";
    aLink.href = URL.createObjectURL(blob);
    aLink.dispatchEvent(evt);
    console.log(originCubePosition)
}
info.appendChild(element);


function buildGui() {

    gui = new GUI();

    const params = {
        'light color': spotLight.color.getHex(),
        intensity: spotLight.intensity,
        height: spotLight.position.y,
        angle: spotLight.angle,
        penumbra: spotLight.penumbra,
        decay: spotLight.decay,
        focus: spotLight.shadow.focus
    };

    gui.addColor(params, 'light color').onChange(function (val) {
        spotLight.color.setHex(val);
        render();
    });

    gui.add(params, 'intensity', 0, 2).onChange(function (val) {
        spotLight.intensity = val;
        render();
    });


    gui.add(params, 'height', 200, 1000).onChange(function (val) {
        spotLight.position.y = val;
        render();
    });

    gui.add(params, 'angle', 0, Math.PI / 3).onChange(function (val) {
        spotLight.angle = val;
        render();
    });

    gui.add(params, 'penumbra', 0, 1).onChange(function (val) {
        spotLight.penumbra = val;
        render();
    });

    gui.add(params, 'decay', 1, 2).onChange(function (val) {
        spotLight.decay = val;
        render();
    });

    gui.add(params, 'focus', 0, 1).onChange(function (val) {
        spotLight.shadow.focus = val;
        render();
    });
    gui.open();

}


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

scene.background = skybox();

var groundGeometry = new THREE.PlaneBufferGeometry(20, 20);
groundGeometry.name = 'PlaneBufferGeometry'
var groundMaterial = new THREE.MeshStandardMaterial({ roughness: 0.8, metalness: 0.4 });
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.name = 'ground'
groundGeometry.rotateX(- Math.PI / 2);
objects.push(ground);
scene.add(ground)



var load_achieve = (achieve) => {
    for (let i in cube_list) {
        if (!achieve[cube_list[i]]) continue;
        achieve[cube_list[i]].forEach(position => {
            var cube = cube_manager.getCube(cube_list[i]);
            cube.position.x = position.x
            cube.position.y = position.y
            cube.position.z = position.z
            cube.receiveShadow = true
            cube.castShadow = position.z === -525 ? true : false
            cube.name = cube_list[i]
            objects.push(cube);

            const x = cube.position.x
            const y = cube.position.y
            const z = cube.position.z
            scene.add(cube)
        })
    }
    console.log("load success")
}

jsonLoader("./json_archives/saved_map.json", (json) => {
    load_achieve(json);
    originCubePosition = json;
})

function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0 && rollOverMesh) {
        var intersect = intersects[0];
        rollOverMesh.position.copy(intersect.point).add(intersect.face.normal.divideScalar(2));
        rollOverMesh.position.divideScalar(1).floor().multiplyScalar(1).addScalar(0.5);
    }
    render();

}

function onDocumentMouseDown(event) {
<<<<<<< Updated upstream
=======
    if (!isCtrlDown) return
    if(currentCube==null) return;
>>>>>>> Stashed changes
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
        var intersect = intersects[0];
        if (isShiftDown) {
            if (intersect.object != ground) {
                if (intersect.object.name == "water") {
                    let p = intersect.object.position;
                    water_manager.remove(p.x, p.y, p.z);
                }
                scene.remove(intersect.object);
                console.log(intersect.object);
                objects.splice(objects.indexOf(intersect.object), 1);
            }
        } else {
            var voxel = cube_manager.getCube(currentCube);

            voxel.position.copy(intersect.point).add(intersect.face.normal.multiplyScalar(0.5));
            voxel.position.divideScalar(1).floor().multiplyScalar(1).addScalar(0.5);
            voxel.castShadow = true
            voxel.name = currentCube
            scene.add(voxel);
            objects.push(voxel);
            if (currentCube == "water") {
                water_manager.add_water(voxel.position.x, voxel.position.y, voxel.position.z);
            }
        }
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
document.addEventListener('pointerdown', onDocumentMouseDown, false);//鼠标点击事件
document.addEventListener('keydown', onDocumentKeyDown, false);//对shift按键的控制
document.addEventListener('keyup', onDocumentKeyUp, false);//对shift按键的控制
console.log("done");
render()
buildGui()