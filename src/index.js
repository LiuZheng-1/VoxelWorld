import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import { Water } from 'three/examples/jsm/objects/Water2';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import {skybox} from './skybox.js'

// // init
var scene = new THREE.Scene( );
var ratio = window.innerWidth/window.innerHeight;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xCCCCCC, 1.0);


var camera = new THREE.PerspectiveCamera(45,ratio,0.1,1000);
camera.position.set(0,0,15);
camera.lookAt(0,0,1);

var controls = new OrbitControls( camera, renderer.domElement );
var clock = new THREE.Clock();

const gui = new GUI();

var cameralight = new THREE.PointLight( new THREE.Color(1,1,1), 1 );
 camera.add( cameralight );
 scene.add(camera);
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
directionalLight.position.set( - 1, 1, 1 );
scene.add( directionalLight );


//final update loop
var MyUpdateLoop = function ( ){
    renderer.render(scene,camera);
    controls.update();
    requestAnimationFrame(MyUpdateLoop);
};
requestAnimationFrame(MyUpdateLoop);

//this fucntion is called when the window is resized
var MyResize = function ( )
{
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width,height);
  camera.aspect = width/height;
  camera.updateProjectionMatrix();
  renderer.render(scene,camera);
  console.log("resizing")
};
//link the resize of the window to the update of the camera
window.addEventListener( 'resize', MyResize);





// water
const water_params = {
    color: '#ffffff',
    scale: 0.5,
    flowX: 1,
    flowY: 1,
    cube_color:"#20a8e6",
    cube_opacity:0.5,
};

var water_cube = new THREE.Object3D();

const waterGeometry = new THREE.PlaneGeometry( 1, 1 );
var water = new Water( waterGeometry, {
    color: water_params.color,
    scale: water_params.scale,
    flowDirection: new THREE.Vector2( water_params.flowX, water_params.flowY ),
    textureWidth: 1024,
    textureHeight: 1024
} );

water.position.y = 0.5;
water.rotation.x = Math.PI * - 0.5;
water_cube.add( water );

var cube_geometry = new THREE.BoxGeometry(1,0.99,1);
var cube_material = new THREE.MeshBasicMaterial( { 
    color: water_params.cube_color,
    transparent:true,
    opacity:water_params.cube_opacity
} );
var cube = new THREE.Mesh( cube_geometry, cube_material );
water_cube.add( cube );


scene.add(water_cube)
scene.background = skybox();

gui.addColor( water_params, 'color' ).onChange( function ( value ) {
    water.material.uniforms[ 'color' ].value.set( value );
} );
gui.add( water_params, 'scale', 0.01, 2 ).step( 0.01 ).onChange( function ( value ) {
    water.material.uniforms[ 'config' ].value.w = value;
} );
gui.addColor( water_params, 'cube_color' ).onChange( function ( value ) {
    cube.material.color.set(value);
    console.log(value)
} );
gui.add( water_params, 'cube_opacity', 0,1 ).step( 0.01 ).onChange( function ( value ) {
    cube.material.opacity = value;
} );
gui.open();



var groundGeometry = new THREE.PlaneGeometry( 20, 20 );
var groundMaterial = new THREE.MeshStandardMaterial( { roughness: 0.8, metalness: 0.4 } );
var ground = new THREE.Mesh( groundGeometry, groundMaterial );
ground.rotation.x = Math.PI * - 0.5;
ground.position.y = -0.5;
scene.add( ground )
const textureLoader = new THREE.TextureLoader();
textureLoader.load( 'textures/Sand_01_basecolor.png', function ( map ) {
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;
    map.repeat.set( 4, 4 );
    groundMaterial.map = map;
    groundMaterial.needsUpdate = true;
} );
textureLoader.load('textures/Sand_01_normal.png',function ( map ) {
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;
    map.repeat.set( 4, 4 );
    groundMaterial.normalMap = map;
    groundMaterial.needsUpdate = true;
} )

console.log("done");