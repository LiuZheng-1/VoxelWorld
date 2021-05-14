import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water2';

export function WaterCube(water_params) {
    // var water_cube = new THREE.Object3D();
    // var waterGeometry = new THREE.PlaneGeometry(50, 50);
    // var water = new Water(waterGeometry, {
    //     color: water_params.color,
    //     scale: water_params.scale,
    //     flowDirection: new THREE.Vector2(water_params.flowX, water_params.flowY),
    //     textureWidth: 1024,
    //     textureHeight: 1024
    // });
    // water.position.y = 0.5;
    // water.rotation.x = Math.PI * - 0.5;
    // water_cube.add(water);

    var cube_geometry = new THREE.BoxGeometry(50, 50, 50);
    // var cube_material = new THREE.MeshBasicMaterial({
    //     color: water_params.cube_color,
    //     transparent: true,
    //     opacity: water_params.cube_opacity
    // });
    // // var stone_texture = new THREE.TextureLoader().load('../dist/textures/Sand_01_normal.png');
    // // cube_material.map = stone_texture;
    // var cube = new THREE.Mesh(cube_geometry, cube_material);
    // water_cube.add(cube);
    // console.log(water_cube);
    // return water_cube;
    var water = new Water(cube_geometry, {
        color: water_params.color,
        scale: water_params.scale,
        flowDirection: new THREE.Vector2(water_params.flowX, water_params.flowY),
        textureWidth: 1024,
        textureHeight: 1024
    });
    return water
}