import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Water } from 'three/examples/jsm/objects/Water2';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { skybox } from './objs/skybox.js'
import {jsonLoader} from './utils/json_loader'
import { CUBE_MANAGER} from './cubes/index'
import { WATER_MANAGER} from './cubes/water_cube'

// var origin = '{"grass":[{"x":-475,"y":25,"z":-475},{"x":-475,"y":25,"z":-375},{"x":-475,"y":25,"z":-425},{"x":-425,"y":25,"z":-475},{"x":-425,"y":25,"z":-425},{"x":-425,"y":25,"z":-375},{"x":-425,"y":25,"z":-325},{"x":-475,"y":25,"z":-325},{"x":-475,"y":25,"z":-225},{"x":-425,"y":25,"z":-275},{"x":-475,"y":25,"z":-275},{"x":-425,"y":25,"z":-225},{"x":-375,"y":25,"z":-325},{"x":-375,"y":25,"z":-425},{"x":-375,"y":25,"z":-475},{"x":-375,"y":25,"z":-375},{"x":-375,"y":25,"z":-275},{"x":-475,"y":25,"z":-175},{"x":-175,"y":25,"z":-475},{"x":-175,"y":25,"z":-425},{"x":-225,"y":25,"z":-475},{"x":-225,"y":25,"z":-425},{"x":-225,"y":25,"z":-375},{"x":-325,"y":25,"z":-275},{"x":-375,"y":25,"z":-225},{"x":-425,"y":25,"z":-175},{"x":-475,"y":25,"z":-125},{"x":-125,"y":25,"z":-475},{"x":-475,"y":25,"z":475},{"x":-475,"y":25,"z":425},{"x":-475,"y":25,"z":375},{"x":-475,"y":25,"z":325},{"x":-475,"y":25,"z":275},{"x":-475,"y":25,"z":225},{"x":-475,"y":25,"z":175},{"x":-425,"y":25,"z":475},{"x":-425,"y":25,"z":425},{"x":-425,"y":25,"z":375},{"x":-425,"y":25,"z":325},{"x":-425,"y":25,"z":275},{"x":-425,"y":25,"z":225},{"x":-375,"y":25,"z":275},{"x":-375,"y":25,"z":325},{"x":-375,"y":25,"z":375},{"x":-375,"y":25,"z":425},{"x":-375,"y":25,"z":475},{"x":-325,"y":25,"z":475},{"x":-325,"y":25,"z":425},{"x":-325,"y":25,"z":375},{"x":-325,"y":25,"z":325},{"x":-275,"y":25,"z":375},{"x":-275,"y":25,"z":425},{"x":-275,"y":25,"z":475},{"x":-225,"y":25,"z":475},{"x":-225,"y":25,"z":425},{"x":-175,"y":25,"z":475},{"x":-125,"y":25,"z":475},{"x":-175,"y":25,"z":425},{"x":-225,"y":25,"z":375},{"x":-275,"y":25,"z":325},{"x":-325,"y":25,"z":275},{"x":-375,"y":25,"z":225},{"x":-425,"y":25,"z":175},{"x":-475,"y":25,"z":125},{"x":475,"y":25,"z":475},{"x":475,"y":25,"z":425},{"x":475,"y":25,"z":375},{"x":475,"y":25,"z":325},{"x":475,"y":25,"z":275},{"x":475,"y":25,"z":225},{"x":475,"y":25,"z":175},{"x":475,"y":25,"z":125},{"x":425,"y":25,"z":175},{"x":425,"y":25,"z":475},{"x":425,"y":25,"z":425},{"x":425,"y":25,"z":375},{"x":425,"y":25,"z":275},{"x":425,"y":25,"z":325},{"x":425,"y":25,"z":225},{"x":375,"y":25,"z":225},{"x":375,"y":25,"z":275},{"x":375,"y":25,"z":325},{"x":375,"y":25,"z":375},{"x":375,"y":25,"z":425},{"x":375,"y":25,"z":475},{"x":325,"y":25,"z":475},{"x":325,"y":25,"z":425},{"x":325,"y":25,"z":375},{"x":325,"y":25,"z":325},{"x":325,"y":25,"z":275},{"x":275,"y":25,"z":375},{"x":275,"y":25,"z":425},{"x":275,"y":25,"z":475},{"x":225,"y":25,"z":475},{"x":225,"y":25,"z":425},{"x":225,"y":25,"z":375},{"x":375,"y":25,"z":175},{"x":425,"y":25,"z":125},{"x":475,"y":25,"z":75},{"x":475,"y":25,"z":-75},{"x":475,"y":25,"z":-125},{"x":475,"y":25,"z":-175},{"x":475,"y":25,"z":-225},{"x":475,"y":25,"z":-275},{"x":475,"y":25,"z":-325},{"x":475,"y":25,"z":-375},{"x":475,"y":25,"z":-425},{"x":475,"y":25,"z":-475},{"x":425,"y":25,"z":-475},{"x":375,"y":25,"z":-475},{"x":325,"y":25,"z":-475},{"x":275,"y":25,"z":-475},{"x":225,"y":25,"z":-475},{"x":175,"y":25,"z":-475},{"x":125,"y":25,"z":-475},{"x":75,"y":25,"z":-475},{"x":125,"y":25,"z":-425},{"x":175,"y":25,"z":-425},{"x":275,"y":25,"z":-425},{"x":225,"y":25,"z":-425},{"x":325,"y":25,"z":-425},{"x":375,"y":25,"z":-425},{"x":425,"y":25,"z":-425},{"x":425,"y":25,"z":-375},{"x":375,"y":25,"z":-375},{"x":325,"y":25,"z":-375},{"x":275,"y":25,"z":-375},{"x":225,"y":25,"z":-375},{"x":175,"y":25,"z":-375},{"x":225,"y":25,"z":-325},{"x":275,"y":25,"z":-325},{"x":325,"y":25,"z":-325},{"x":375,"y":25,"z":-325},{"x":425,"y":25,"z":-325},{"x":425,"y":25,"z":-275},{"x":375,"y":25,"z":-275},{"x":325,"y":25,"z":-275},{"x":275,"y":25,"z":-275},{"x":325,"y":25,"z":-225},{"x":375,"y":25,"z":-225},{"x":425,"y":25,"z":-225},{"x":425,"y":25,"z":-175},{"x":375,"y":25,"z":-175},{"x":425,"y":25,"z":-125},{"x":-75,"y":25,"z":475},{"x":-125,"y":25,"z":425},{"x":-175,"y":25,"z":375},{"x":-225,"y":25,"z":325},{"x":-275,"y":25,"z":275},{"x":-325,"y":25,"z":225},{"x":-375,"y":25,"z":175},{"x":-425,"y":25,"z":125},{"x":-475,"y":25,"z":75},{"x":-475,"y":25,"z":-75},{"x":-425,"y":25,"z":-125},{"x":-375,"y":25,"z":-175},{"x":-325,"y":25,"z":-225},{"x":-175,"y":25,"z":-375},{"x":-125,"y":25,"z":-425},{"x":-75,"y":25,"z":-475},{"x":175,"y":25,"z":175},{"x":125,"y":25,"z":175},{"x":125,"y":25,"z":125},{"x":75,"y":25,"z":125},{"x":25,"y":25,"z":175},{"x":25,"y":25,"z":125},{"x":-25,"y":25,"z":125},{"x":-25,"y":25,"z":175},{"x":-125,"y":25,"z":175},{"x":-75,"y":25,"z":175},{"x":-75,"y":25,"z":125},{"x":-75,"y":25,"z":75},{"x":-75,"y":25,"z":25},{"x":-25,"y":25,"z":-225},{"x":25,"y":25,"z":-225},{"x":75,"y":25,"z":-225},{"x":125,"y":25,"z":-225},{"x":225,"y":25,"z":-225},{"x":225,"y":25,"z":-175},{"x":225,"y":25,"z":-125},{"x":175,"y":25,"z":-125},{"x":175,"y":25,"z":-175},{"x":175,"y":25,"z":-225},{"x":125,"y":25,"z":-175},{"x":-325,"y":25,"z":-325}],"water":[{"x":75,"y":25,"z":-25},{"x":125,"y":25,"z":-75},{"x":75,"y":25,"z":-75},{"x":125,"y":25,"z":-125},{"x":75,"y":25,"z":-125},{"x":25,"y":25,"z":-125},{"x":25,"y":25,"z":-25},{"x":25,"y":25,"z":-75},{"x":25,"y":25,"z":75},{"x":25,"y":25,"z":25},{"x":-25,"y":25,"z":75},{"x":-25,"y":25,"z":25},{"x":-25,"y":25,"z":-75},{"x":25,"y":25,"z":-175},{"x":75,"y":25,"z":-175},{"x":-325,"y":25,"z":-475},{"x":-275,"y":25,"z":-475},{"x":-325,"y":25,"z":-425},{"x":-275,"y":25,"z":-425},{"x":-275,"y":25,"z":-375},{"x":-325,"y":25,"z":-375},{"x":-275,"y":25,"z":-325},{"x":-275,"y":25,"z":-275},{"x":-225,"y":25,"z":-325},{"x":-225,"y":25,"z":-275},{"x":-225,"y":25,"z":-225},{"x":-175,"y":25,"z":-225},{"x":-175,"y":25,"z":-175},{"x":-125,"y":25,"z":-225},{"x":-125,"y":25,"z":-175},{"x":-125,"y":25,"z":-125},{"x":-75,"y":25,"z":-125},{"x":-25,"y":25,"z":-125},{"x":-75,"y":25,"z":-75},{"x":-25,"y":25,"z":-25},{"x":-75,"y":25,"z":-25},{"x":125,"y":25,"z":75},{"x":75,"y":25,"z":25},{"x":75,"y":25,"z":75},{"x":175,"y":25,"z":75},{"x":175,"y":25,"z":125},{"x":225,"y":25,"z":125},{"x":225,"y":25,"z":175},{"x":275,"y":25,"z":125},{"x":275,"y":25,"z":175},{"x":275,"y":25,"z":225},{"x":325,"y":25,"z":225},{"x":275,"y":25,"z":275},{"x":275,"y":25,"z":325},{"x":225,"y":25,"z":275},{"x":225,"y":25,"z":325},{"x":175,"y":25,"z":325},{"x":125,"y":25,"z":325},{"x":125,"y":25,"z":375},{"x":175,"y":25,"z":375},{"x":175,"y":25,"z":425},{"x":125,"y":25,"z":425},{"x":125,"y":25,"z":475},{"x":75,"y":25,"z":425},{"x":75,"y":25,"z":475},{"x":175,"y":25,"z":475}],"brick":[{"x":25,"y":25,"z":475},{"x":25,"y":25,"z":425},{"x":75,"y":25,"z":375},{"x":175,"y":25,"z":275},{"x":225,"y":25,"z":225},{"x":325,"y":25,"z":25},{"x":325,"y":25,"z":75},{"x":325,"y":25,"z":-25},{"x":325,"y":25,"z":-125},{"x":325,"y":25,"z":-75},{"x":325,"y":25,"z":-175},{"x":375,"y":25,"z":-125},{"x":375,"y":25,"z":-75},{"x":375,"y":25,"z":-25},{"x":375,"y":25,"z":25},{"x":375,"y":25,"z":75},{"x":375,"y":25,"z":125},{"x":425,"y":25,"z":75},{"x":425,"y":25,"z":25},{"x":425,"y":25,"z":-25},{"x":425,"y":25,"z":-75},{"x":475,"y":25,"z":25},{"x":475,"y":25,"z":-25},{"x":25,"y":25,"z":-475},{"x":-25,"y":25,"z":-475},{"x":25,"y":25,"z":-425},{"x":75,"y":25,"z":-425},{"x":-25,"y":25,"z":-425},{"x":-75,"y":25,"z":-425},{"x":-125,"y":25,"z":-375},{"x":25,"y":25,"z":-375},{"x":75,"y":25,"z":-375},{"x":125,"y":25,"z":-375},{"x":175,"y":25,"z":-325},{"x":125,"y":25,"z":-325},{"x":75,"y":25,"z":-325},{"x":-25,"y":25,"z":-325},{"x":25,"y":25,"z":-325},{"x":-75,"y":25,"z":-325},{"x":-125,"y":25,"z":-325},{"x":-175,"y":25,"z":-325},{"x":225,"y":25,"z":-275},{"x":175,"y":25,"z":-275},{"x":125,"y":25,"z":-275},{"x":25,"y":25,"z":-275},{"x":75,"y":25,"z":-275},{"x":-25,"y":25,"z":-275},{"x":-75,"y":25,"z":-275},{"x":-275,"y":25,"z":-225},{"x":-275,"y":25,"z":-175},{"x":-275,"y":25,"z":-125},{"x":-275,"y":25,"z":-75},{"x":-275,"y":25,"z":-25},{"x":-275,"y":25,"z":25},{"x":-275,"y":25,"z":75},{"x":-275,"y":25,"z":125},{"x":-275,"y":25,"z":175},{"x":-275,"y":25,"z":225},{"x":-325,"y":25,"z":175},{"x":-325,"y":25,"z":125},{"x":-325,"y":25,"z":75},{"x":-325,"y":25,"z":-25},{"x":-325,"y":25,"z":25},{"x":-325,"y":25,"z":-75},{"x":-325,"y":25,"z":-125},{"x":-325,"y":25,"z":-175},{"x":-375,"y":25,"z":-125},{"x":-375,"y":25,"z":-75},{"x":-375,"y":25,"z":-25},{"x":-375,"y":25,"z":25},{"x":-375,"y":25,"z":75},{"x":-375,"y":25,"z":125},{"x":-425,"y":25,"z":75},{"x":-425,"y":25,"z":25},{"x":-425,"y":25,"z":-25},{"x":-425,"y":25,"z":-75},{"x":-475,"y":25,"z":-25},{"x":175,"y":25,"z":225},{"x":125,"y":25,"z":225},{"x":75,"y":25,"z":225},{"x":25,"y":25,"z":225},{"x":-25,"y":25,"z":225},{"x":-75,"y":25,"z":225},{"x":-125,"y":25,"z":225},{"x":-175,"y":25,"z":225},{"x":-225,"y":25,"z":225},{"x":-225,"y":25,"z":275},{"x":-175,"y":25,"z":275},{"x":-125,"y":25,"z":275},{"x":-75,"y":25,"z":275},{"x":-25,"y":25,"z":275},{"x":25,"y":25,"z":275},{"x":75,"y":25,"z":275},{"x":125,"y":25,"z":275},{"x":75,"y":25,"z":325},{"x":25,"y":25,"z":325},{"x":-75,"y":25,"z":325},{"x":-25,"y":25,"z":325},{"x":-125,"y":25,"z":325},{"x":-175,"y":25,"z":325},{"x":-125,"y":25,"z":375},{"x":-75,"y":25,"z":375},{"x":-25,"y":25,"z":375},{"x":25,"y":25,"z":375},{"x":-25,"y":25,"z":425},{"x":-75,"y":25,"z":425},{"x":-25,"y":25,"z":475},{"x":-475,"y":25,"z":25},{"x":275,"y":25,"z":25},{"x":275,"y":25,"z":-25},{"x":275,"y":25,"z":-75},{"x":275,"y":25,"z":-125},{"x":275,"y":25,"z":-175},{"x":275,"y":25,"z":-225},{"x":-225,"y":25,"z":-175},{"x":-225,"y":25,"z":-125},{"x":-225,"y":25,"z":25},{"x":-225,"y":25,"z":-25},{"x":-225,"y":25,"z":75},{"x":-225,"y":25,"z":175},{"x":-175,"y":25,"z":175},{"x":-125,"y":25,"z":125},{"x":-175,"y":25,"z":125},{"x":-225,"y":25,"z":125},{"x":-175,"y":25,"z":75},{"x":75,"y":25,"z":175},{"x":325,"y":25,"z":125},{"x":325,"y":25,"z":175},{"x":275,"y":25,"z":75},{"x":225,"y":25,"z":25},{"x":225,"y":25,"z":75},{"x":225,"y":25,"z":-75},{"x":225,"y":25,"z":-25},{"x":175,"y":25,"z":-75},{"x":175,"y":25,"z":-25},{"x":175,"y":25,"z":25},{"x":125,"y":25,"z":-25},{"x":125,"y":25,"z":25},{"x":-125,"y":25,"z":25},{"x":-125,"y":25,"z":75},{"x":-125,"y":25,"z":-75},{"x":-175,"y":25,"z":-25},{"x":-125,"y":25,"z":-25},{"x":-175,"y":25,"z":25},{"x":-175,"y":25,"z":-125},{"x":-175,"y":25,"z":-75},{"x":-225,"y":25,"z":-75},{"x":-75,"y":25,"z":-225},{"x":-75,"y":25,"z":-175},{"x":-25,"y":25,"z":-175},{"x":-125,"y":25,"z":-275},{"x":-75,"y":25,"z":-375},{"x":-25,"y":25,"z":-375},{"x":-175,"y":25,"z":-275}],"door":[]}'
// var originCubePosition = JSON.parse(origin)

var originCubePosition={
    "brick":[],"water":[],"grass":[],"door":[],"glass":[]
}

var rollOverGeo, rollOverMaterial, rollOverMesh
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var objects = [];
var isShiftDown = false
var cubeGeo, cubeMaterial
var cube
var gui

var matrix = []

var cube_list = ["brick","water","grass","door","glass"]
var currentCube = cube_list[0]
/*
 * Setting the basic conponents
 *
 */
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);//设置透视投影的相机
camera.position.set(5, 8, 13);//设置相机坐标
camera.lookAt(new THREE.Vector3());//设置视野的中心坐标

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
var water_manager = new WATER_MANAGER(scene,water_params);



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



for (let x = 0; x < 20; x++) {
    matrix.push([])
    for (let y = 0; y < 20; y++) {
        matrix[x].push([])
        for (let z = 0; z < 20; z++) {
            matrix[x][y].push('')
        }
    }
}
// matrix[0][0][0] {x: -475, y: 25, z: -475}
// matrix[0][0][1] z + 50 * 1
// matrix[0][1][0] y + 50 * 1
// matrix[1][0][0] x + 50 * 1







var createPreview = function () {
    scene.remove(rollOverMesh)
    rollOverGeo = new THREE.BoxGeometry(1, 1, 1);
    rollOverMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });
    rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
    scene.add(rollOverMesh);
}
createPreview();



var exportCubePosition = function () {
    const ary = {
        'grass': [],
        'water': [],
        'brick': [],
        'door': [],
    }
    objects.forEach(obj => {
        switch (obj.name) {
            case 'ground':
                break;
            default:
                ary[obj.name].push(obj.position)
                break;
        }
    })
    console.log(JSON.stringify(ary));
}

// // init

// create box
var info = document.createElement('div');
document.body.appendChild(info)
console.log(info.class);
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
    element.onclick = ()=>{
        currentCube = cube_name; // 设置当前的名称以允许cube_manager.getCube(currentCube)
    }
    info.appendChild(element);
});
var element = document.createElement('button');
element.id = "Save";
element.innerHTML = "Save";
element.onclick = ()=>{
    var aLink = document.createElement('a');
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    var blob = new Blob([JSON.stringify(originCubePosition)]);
    // var evt = document.createEvent("HTMLEvents");
    // evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
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

var groundGeometry = new THREE.PlaneBufferGeometry(1000, 1000);
groundGeometry.name = 'PlaneBufferGeometry'
var groundMaterial = new THREE.MeshStandardMaterial({ roughness: 0.8, metalness: 0.4 });
// var groundGeometry = new THREE.BoxGeometry(50, 50,50);
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.name = 'ground'
groundGeometry.rotateX(- Math.PI / 2);
objects.push(ground);
scene.add(ground)



var load_achieve = (achieve)=>{
    for (let i in cube_list){
        if(!achieve[cube_list[i]]) continue;
        achieve[cube_list[i]].forEach(position=>{
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
            // matrix[x][y][z] = cube.name
            scene.add(cube)
        })
    }
    console.log("load success")
}
// 读取
jsonLoader("./json_archives/saved_map.json",(json)=>{
    load_achieve(json);
    originCubePosition = json;
})


console.log(JSON.stringify(matrix));

function onDocumentMouseMove(event) {
    event.preventDefault();//取消事件的默认动作
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0 && rollOverMesh) {
        var intersect = intersects[0];
        // console.log(intersects);
        rollOverMesh.position.copy(intersect.point).add(intersect.face.normal.divideScalar(2));
        // rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
        rollOverMesh.position.divideScalar(1).floor().multiplyScalar(1).addScalar(0.5);
    }
    render();

}

function onDocumentMouseDown(event) {
    // event.preventDefault();
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
        var intersect = intersects[0];
        if (isShiftDown) {
            if (intersect.object != ground) {
                if (intersect.object.name=="water"){
                    let p = intersect.object.position;
                    water_manager.remove(p.x,p.y,p.z);
                }
                scene.remove(intersect.object);
                objects.splice(objects.indexOf(intersect.object), 1);
            }
        } else {
            // var voxel = new THREE.Mesh(cubeGeo, cubeMaterial);
            var voxel = cube_manager.getCube(currentCube);
    
            //var voxel = WaterCube(water_params);
            voxel.position.copy(intersect.point).add(intersect.face.normal.multiplyScalar(0.5));
            // voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
            voxel.position.divideScalar(1).floor().multiplyScalar(1).addScalar(0.5);
            voxel.castShadow = true
            // voxel.receiveShadow = true
            voxel.name = currentCube
            scene.add(voxel);
            objects.push(voxel);
            // matrix[0][0][0] {x: -475, y: 25, z: -475}
            console.log(voxel.position);
            if(currentCube=="water"){
                water_manager.add_water(voxel.position.x,voxel.position.y,voxel.position.z);
            }
            // console.log((voxel.position.x - (-475)) / 50);
            // console.log((voxel.position.y - 25) / 50);
            // console.log((voxel.position.z - (-475)) / 50);
            // const x = (voxel.position.x - (-475)) / 50
            // const y = (voxel.position.y - 25) / 50
            // const z = (voxel.position.z - (-475)) / 50
            // matrix[x][y][z] = voxel.name
            originCubePosition[currentCube].push(voxel.position)

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