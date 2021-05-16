import * as THREE from 'three';
import { Mesh } from 'three';
// import * as basic_cube from './basic_cubes'
import { WaterCube } from './water_cube'

// 没有特殊属性的就直接这里设定下texture吧
const textured_cube_setting = {
    'brick': { texture: "../dist/textures/brick/brick_diffuse.jpg" },
    "water": { color: "#20a8e6", opacity: 0 },//占个位置不显示
    'grass': { texture: '../dist/textures/grass/grass.jpg' },
    'glass': { color: "#ffffff", opacity: 0.3 },
    'dirt': { texture: "../dist/textures/minecraft_dirt.jpg" },
    'wood': { texture: "../dist/textures/wood.jpg" },
    'sand': { texture: "../dist/textures/minecraft_sand.jpg" },
    'stone': { texture: "../dist/textures/minecraft_stone.jpg" },
}

//MC材质大门
var createDoor = function (cubeGeo) {
    let texture = new THREE.TextureLoader().load('../dist/textures/minecraft/door_spruce_lower.png');
    texture.magFilter = THREE.NearestFilter;//指定纹理的放大方式, nearestFilter最邻近过滤
    let cubeMaterial = new THREE.MeshLambertMaterial({ map: texture });
    return new THREE.Mesh(cubeGeo, cubeMaterial)
}

export class CUBE_MANAGER {
    constructor(scene) {
        this.scene = scene;
        this.box_geo = new THREE.BoxGeometry(1, 1, 1);
        this.curr_cube = "brick";
        this.curr_geo = this.box_geo;
        this.curr_mat = null;
        this.cube_objs = {}
        this.loadCubeObjs();// 导入基础方块

        this.water_cubes = []
    }
    loadCubeObjs() {
        for (var cube in textured_cube_setting) {
            var se = textured_cube_setting[cube];
            var mat = new THREE.MeshLambertMaterial({
                map: se["texture"] ? new THREE.TextureLoader().load(se["texture"]) : null,
                color: se["color"] ? new THREE.Color(se["color"]) : null,
                transparent: se["opacity"] != undefined ? true : false,
                opacity: se["opacity"] != undefined ? se["opacity"] : null,
            });
            var mesh = new THREE.Mesh(this.box_geo, mat);
            mesh.name = cube;
            this.cube_objs[cube] = {};
            this.cube_objs[cube]["mesh"] = mesh;
        }
        /**
         * 这里手动添加些特殊方块吧
         */
        this.cube_objs["door"] = {};
        this.cube_objs["door"]["mesh"] = createDoor(this.box_geo);
    }
    setParams(cube, params) {
        this.cube_objs[cube]["params"] = params
    }
    getCube(cube) {
        var c_cube = this.cube_objs[cube]["mesh"].clone()
        return c_cube;
        // return new WaterCube(this.cube_objs["water"]["params"] );
    }

}
