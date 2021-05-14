import * as THREE from 'three';
import { Mesh } from 'three';
import { Water } from 'three/examples/jsm/objects/Water2';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export function WaterCube(water_params) {
    var water_cube = new THREE.Object3D();
    var waterGeometry = new THREE.BoxGeometry(1, 1, 1);//new THREE.PlaneGeometry(1, 1);
    var water = new Water(waterGeometry, {
        color: "#0000FF",//water_params.color,
        scale: water_params.scale,
        flowDirection: new THREE.Vector2(water_params.flowX, water_params.flowY),
        textureWidth: 1024,
        textureHeight: 1024
    });
    // water.position.y = 0.5;
    water.rotation.x = Math.PI * - 0.5;
    // water_cube.add(water);

    // var cube_geometry = new THREE.BoxGeometry(1, 1, 1);
    // var cube_material = new THREE.MeshBasicMaterial({
    //     color: water_params.cube_color,
    //     transparent: true,
    //     opacity: water_params.cube_opacity
    // });
    // var cube = new THREE.Mesh(cube_geometry, cube_material);
    // // water_cube.add(cube);
    // water_cube.Mesh = cube.Mesh;
    // console.log(water_cube);
    // return water_cube;
    // cube.add(water)
    return water
}

export class WATER_MANAGER {
    constructor(scene, params) {
        this.scene = scene;
        this.params = params
        this.geo = null;
        this.water_dict = {}
    }
    hash_xyz(x, y, z) {
        return String(parseInt(x) + "" + parseInt(y) + "" + parseInt(z));
    }
    make_geo(x, y, z) {
        var geo = new THREE.BoxBufferGeometry(1, 1, 1)
        let transform = new THREE.Object3D()
        transform.position.set(x, y, z);
        // transform.rotation.x = Math.PI * - 0.5;
        transform.updateMatrix();
        geo.applyMatrix4(transform.matrix)
        return geo
    }
    add_water(x, y, z) {
        console.log(x, y, z)
        var geo = this.make_geo(x, y, z);
        this.water_dict[this.hash_xyz(x, y, z)] = [x, y, z]

        if (this.geo == null) {
            this.geo = geo;
        } else {
            this.geo = BufferGeometryUtils.mergeBufferGeometries([this.geo, geo])
        }
        this.render()
    }
    remove(x, y, z) {
        delete this.water_dict[this.hash_xyz(x, y, z)];
        let geo_li = [];
        console.log(this.water_dict)
        for (let key in this.water_dict) {
            var w = this.water_dict[key];
            console.log(w)
            geo_li.push(this.make_geo(w[0], w[1], w[2]))
        }
        this.geo = BufferGeometryUtils.mergeBufferGeometries(geo_li);
        this.render()
    }
    removeObj() {
        this.scene.remove(this.obj)
        this.geo = null
        this.water_dict = {}
    }
    render() {
        this.scene.remove(this.obj)
        this.obj = new Water(this.geo, {
            color: this.params.color,
            scale: this.params.scale,
            flowDirection: new THREE.Vector2(this.params.flowX, this.params.flowY),
            textureWidth: 1024,
            textureHeight: 1024
        });
        // this.obj.add( new THREE.Mesh(this.box_geo,this.box_mat));
        this.scene.add(this.obj);
    }
}