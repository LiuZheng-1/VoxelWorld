import * as THREE from 'three';
// import * as basic_cube from './basic_cubes'

// 没有特殊属性的就直接这里设定下texture吧
const textured_cube_setting = {
    'brick':{ texture:"../dist/textures/brick/brick_diffuse.jpg"},
    "water":{ texture:"../dist/textures/water/Water_2_M_Normal.jpg"},
    'grass':{ texture:'../dist/textures/grass/grass.jpg'}
}

export class CUBE_MANAGER{
    constructor(scene){
        this.scene = scene;
        this.box_geo = new THREE.BoxGeometry(50, 50, 50);
        this.curr_cube = "brick";
        this.curr_geo = this.box_geo;
        this.curr_mat = null;
        this.cube_objs = {}
        this.loadCubeObjs();// 导入基础方块
    }
    loadCubeObjs(){
        for(var cube in textured_cube_setting){
            var se = textured_cube_setting[cube];
            var mat = new THREE.MeshLambertMaterial({ 
                map: se["texture"]?   new THREE.TextureLoader().load(se["texture"]):null,
                color:se["color"]?    new THREE.Color(se["color"]):null,
            });
            var mesh = new THREE.Mesh(this.box_geo, mat);
            this.cube_objs[cube] = mesh;
        }
    }
    getCube(cube){
        return this.cube_objs[cube].clone();
    }

}
