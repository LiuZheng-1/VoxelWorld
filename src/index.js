import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Water } from 'three/examples/jsm/objects/Water2';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { skybox } from './objs/skybox.js'
import { jsonLoader } from './utils/json_loader'
import { CUBE_MANAGER } from './cubes/index'
import { WATER_MANAGER } from './cubes/water_cube'
import { CREATURE_MANAGER } from './creatures/index'

var originCubePosition = {
    "brick": [], "water": [], "grass": [], "door": [], "glass": [], "dirt": [], "wood": [], "sand": [], "stone": []
}

var rollOverGeo, rollOverMaterial, rollOverMesh
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var objects = [];
var isShiftDown = false
var gui

var cube_list = ["brick", "water", "grass", "door", "glass", "dirt", "wood", "sand", "stone"]
const textured_cube_setting = {
    'brick': { texture: "../dist/textures/brick/brick_diffuse.jpg" },
    "water": { color: "#20a8e6", opacity: 0 },//占个位置不显示
    'grass': { texture: '../dist/textures/grass/grass.jpg' },
    'glass': { color: "#ffffff", opacity: 0.3 },
    'dirt': { texture: "../dist/textures/minecraft_dirt.jpg" },
    'wood': { texture: "../dist/textures/wood.jpg" },
    'sand': { texture: "../dist/textures/minecraft_sand.jpg" },
    'stone': { texture: "../dist/textures/minecraft_stone.jpg" },
    'door': { texture: "../dist/textures/minecraft/door_spruce_lower.png" }
}

var currentCube = null
var currentFile = null
/*
 * Setting the basic conponents
 *
 */
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(25, 25, 25);
camera.lookAt(new THREE.Vector3());

var scene = new THREE.Scene();
var ratio = window.innerWidth / window.innerHeight;
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
var clock = new THREE.Clock();

var controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xCCCCCC, 1.0);

var cube_manager = new CUBE_MANAGER(scene);
const water_params = {
    color: '#ffffff',
    scale: 0.8,
    flowX: 1,
    flowY: 1,
    cube_color: "#20a8e6",
    cube_opacity: 0.5,
};
var water_manager = new WATER_MANAGER(scene, water_params);
var creature_manager = new CREATURE_MANAGER(scene, clock);

var cube_list  =cube_manager.getCubeList()
var creature_list  =creature_manager.get_creature_list()


var cameralight = new THREE.PointLight(new THREE.Color(1, 1, 1), 1);
camera.add(cameralight);
scene.add(camera);
const directionalLight = new THREE.DirectionalLight(0xcccccc, 0.6);
directionalLight.position.set(- 1, 1, 1);
scene.add(directionalLight);

var spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(-25, 100, 25);
spotLight.castShadow = true;
spotLight.distance = 500
scene.add(spotLight);

// var spotLightHelper = new THREE.SpotLightHelper(spotLight)
// scene.add(spotLightHelper);

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
info.style.alignItems = 'center'
info.style.justifyContent = 'center'
info.style.position = 'absolute'
info.style.top = '10px';
info.style.height = '50px'
info.style.background = '#111'
info.style.textAlign = 'center';
info.style.zIndex = 99;
info.style.padding = '5px 5px'
var cubeButtonBox = document.createElement('div');
cubeButtonBox.setAttribute('class', 'cube_box')
document.body.appendChild(cubeButtonBox)

// 加载cube的选项按钮
cube_list.forEach(cube_name => {
    var element = document.createElement('button');
    element.id = cube_name;
    element.innerHTML = cube_name;
    element.onclick = () => {
        currentCube = cube_name; // 设置当前的名称以允许cube_manager.getCube(currentCube)
    }
    var url = cube_manager.getTexture(cube_name);
    if(url==null){
        element.style = 'background: #cccccc'
    }else if(url[0]=="#"){// color
        element.style = 'background:' + url
    }else{
        element.style = 'background:url(' + url + ');background-size:50px 50px'
    }
    element.setAttribute('class', 'button')
    cubeButtonBox.appendChild(element);
});

var creatureButtonBox = document.createElement('div');
creatureButtonBox.setAttribute('class', 'creature_box')
document.body.appendChild(creatureButtonBox)
creature_list.forEach(creature_name => {
    var element = document.createElement('button');
    element.id = creature_name;
    element.innerHTML = creature_name;
    element.onclick = () => {
        currentCube = creature_name; // 
    }
    element.setAttribute('class', 'button')
    creatureButtonBox.appendChild(element);
});


var element = document.createElement('button');
element.id = "Save";
element.innerHTML = "Save";
element.setAttribute("class", "save");
element.onclick = () => {
    var aLink = document.createElement('a');
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    originCubePosition = {
        "brick": [], "water": [], "grass": [], "door": [], "glass": [], "dirt": [], "wood": [], "sand": [], "stone": []
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
}

var upload = document.createElement('input');
upload.id = "Upload";
upload.type = "file"
upload.accept = ".json";
upload.setAttribute("class", "upload");
upload.onchange = evt => {
    const file = evt.target.files[0]
    currentFile = file
    evt.value = null
    uploadInput.value = upload.value
}
var uploadInput = document.createElement('input');
uploadInput.id = 'uploadInput'
uploadInput.disabled = true
uploadInput.placeholder = 'please upload a json file'
uploadInput.setAttribute("class", "upload_input");




var read = document.createElement('button');
read.id = "read";
read.innerHTML = "Load";
read.setAttribute("class", "read");

const fileReader = new FileReader()
read.onclick = () => {
    if (currentFile) {
        fileReader.readAsText(currentFile, 'utf-8')
        fileReader.onloadend = function (evt) {
            const positions = JSON.parse(evt.target.result)
            objects.forEach(obj => {
                if (obj.name !== 'ground') {
                    scene.remove(obj)
                }
            })
            water_manager.removeObj()
            objects = []
            objects.push(ground)
            load_achieve(positions)
        }
    } else {
        alert('Please select the source data json file!')
    }
}

info.appendChild(element);
info.appendChild(read);
info.appendChild(upload);
info.appendChild(uploadInput);

function buildGui() {

    gui = new GUI();

    const params = {
        'light color': spotLight.color.getHex(),
        intensity: spotLight.intensity,
        height: spotLight.position.y,
        angle: spotLight.angle,
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


    gui.add(params, 'height', 0, 400).onChange(function (val) {
        spotLight.position.y = val;
        render();
    });

    gui.add(params, 'angle', 0, Math.PI / 3).onChange(function (val) {
        spotLight.angle = val;
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
    creature_manager.update_all();
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
            cube.receiveShadow = position.y === 0.5 ? true : false
            cube.castShadow = position.y === 0.5 ? false : true
            cube.name = cube_list[i]
            objects.push(cube);

            const x = cube.position.x
            const y = cube.position.y
            const z = cube.position.z
            scene.add(cube)
            if (cube_list[i] == "water") {
                water_manager.add_water(x, y, z);
            }
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

var isCtrlDown = false
function onDocumentMouseDown(event) {
    if (!isCtrlDown) return;
    if (!currentCube==null) return;
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
        var intersect = intersects[0];
        if (isShiftDown) {
            console.log(intersect.object)
            if (intersect.object != ground) {
                if (intersect.object.name == "water") {
                    let p = intersect.object.position;
                    water_manager.remove(p.x, p.y, p.z);
                }
                if (intersect.object.name == "creature") {
                    
                    creature_manager.remove_obj(intersect.object.creature_id);
                }
                scene.remove(intersect.object);
                objects.splice(objects.indexOf(intersect.object), 1);
            }
        } else {
            var voxel;
            // add a creature
            if(creature_list.indexOf(currentCube) != -1){
                console.log("creature")
                var p = new THREE.Vector3(0,0,0);
                p.copy(intersect.point).add(intersect.face.normal.multiplyScalar(0.5));
                p.divideScalar(1).floor().multiplyScalar(1).addScalar(0.5);
                var creature_id = creature_manager.add_creature(currentCube,p);
                voxel = cube_manager.getCube("creature");
                voxel.creature_id = creature_id;
            }else{
                // add a cube
                var voxel = cube_manager.getCube(currentCube);
            }
            

            voxel.position.copy(intersect.point).add(intersect.face.normal.multiplyScalar(0.5));
            voxel.position.divideScalar(1).floor().multiplyScalar(1).addScalar(0.5);
            voxel.receiveShadow = voxel.position.y === 0.5 ? true : false
            voxel.castShadow = voxel.position.y === 0.5 ? false : true
            // voxel.name = currentCube
            // console.log(voxel.position);
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
        case 17: isCtrlDown = true; break
    }
}
function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 16: isShiftDown = false; break;
        case 17: isCtrlDown = false; break

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