import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water2';

export function WaterCube(water_params,x_pos = 0,y_pos = 0){
    var water_cube = new THREE.Object3D();
    water_cube.position.x = x_pos
    water_cube.position.y = y_pos;

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


    return water_cube;
}