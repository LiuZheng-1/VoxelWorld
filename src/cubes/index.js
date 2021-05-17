import * as THREE from 'three';
import { Mesh } from 'three';
// import * as basic_cube from './basic_cubes'
import {WaterCube} from './water_cube'

// setting of cubes have no specific properity
const textured_cube_setting = {
    'brick':{ texture:"../dist/textures/brick/brick_diffuse.jpg"},
    "water":{ color:"#20a8e6",opacity:0},//占个位置不显示
    'grass':{ texture:'../dist/textures/grass/grass.jpg'},
    'glass':{ color:"#ffffff",opacity:0.3},
}

//MC door
var createDoor = function (cubeGeo) {
    let texture = new THREE.TextureLoader().load('../dist/textures/minecraft/door_spruce_lower.png');
    texture.magFilter = THREE.NearestFilter;
    let cubeMaterial = new THREE.MeshLambertMaterial({ map: texture });
    cubeMaterial.texture_url = '../dist/textures/minecraft/door_spruce_lower.png'
    return new THREE.Mesh(cubeGeo, cubeMaterial)
}

export function MC_Material_Loader(name,dir,has_s=false,has_n=true,iscube=false,has_side=false){
    var mat = new THREE.MeshPhongMaterial({
        transparent:true,
    });
    if(iscube){
        const cubeTextureLoader = new THREE.CubeTextureLoader();
        cubeTextureLoader.setPath( '../dist/textures/'+dir+"/" );
        const side = ""
        if(has_side==true){
            side = "_side"
        }
        mat.map = cubeTextureLoader.load( [
            name+side+".png", name+side+".png",
            name+"_top.png", name+"_bottom.png",
            name+".png", name+".png"
        ] );
        // normal
        if(has_n==true){
            mat.normal = cubeTextureLoader.load( [
                name+side+"_n.png", name+side+"_n.png",
                name+"_top_n.png", name+"_bottom_n.png",
                name+"_n.png", name+"_n.png"
            ] );
        }
        //specular
        if(has_s==true){
            mat.specularMap = cubeTextureLoader.load( [
                name+side+"_s.png", name+side+"_s.png",
                name+"_top_s.png", name+"_bottom_s.png",
                name+"_s.png", name+"_s.png"
            ] );
        }
    }else{
        const textureLoader = new THREE.TextureLoader();
        textureLoader.setPath( '../dist/textures/'+dir+"/" );
        mat.map = textureLoader.load(name+".png",);
        if(has_n==true){ mat.normalMap = textureLoader.load(name+"_n.png",);}
        if(has_s==true){ mat.specularMap = textureLoader.load(name+"_s.png",);}
    }
    // mat.normalScale.set(0.45,0.45)
    mat.texture_url = '../dist/textures/'+dir+"/" + name+".png"

    return mat;
}

export class CUBE_MANAGER {
    constructor(scene) {
        this.scene = scene;
        this.box_geo = new THREE.BoxGeometry(1, 1, 1);
        this.curr_cube = "brick";
        this.curr_geo = this.box_geo;
        this.curr_mat = null;
        this.cube_objs = {}
        this.loadCubeObjs();// 

        this.water_cubes=[]
    }
    loadCubeObjs() { // load the basic cubes
        for (var cube in textured_cube_setting) {
            var se = textured_cube_setting[cube];
            var mat = new THREE.MeshLambertMaterial({
                map: se["texture"] ? new THREE.TextureLoader().load(se["texture"]) : null,
                color: se["color"] ? new THREE.Color(se["color"]) : null,
                transparent: se["opacity"] != undefined ? true : false,
                opacity: se["opacity"] != undefined ? se["opacity"] : null,
                normal:se["normal"] != undefined ? se["normal"] : null,
            });
            this.addCube(cube,this.box_geo,mat)
        }
        /**
         * adding special cube in here
         */
        this.cube_objs["door"]={};
        this.cube_objs["door"]["mesh"] = createDoor(this.box_geo);

        var mat = MC_Material_Loader("acacia_leaves","block");
        this.addCube("acacia_leaves",this.box_geo,mat);

        var mat = MC_Material_Loader("oak_leaves","block",true);
        mat.color = new THREE.Color("#11dd11")
        this.addCube("oak_leaves",this.box_geo,mat)

        var mat = MC_Material_Loader("sandstone","block",true);
        this.addCube("sandstone",this.box_geo,mat);

        var mat = MC_Material_Loader("andesite","block",true);
        this.addCube("andesite",this.box_geo,mat);

        var mat = MC_Material_Loader("jungle_planks","block",true);
        this.addCube("jungle_planks",this.box_geo,mat);


    }
    addCube(cube,geo,mat){
        var mesh = new THREE.Mesh(geo, mat);
        mesh.name = cube;
        this.cube_objs[cube] = {};
        this.cube_objs[cube]["mesh"] = mesh;
    }
    setParams(cube,params){
        this.cube_objs[cube]["params"] = params
    }
    getCube(cube){
        var c_cube = this.cube_objs[cube]["mesh"].clone()
        console.log(c_cube)
        return c_cube;
    }
    // TODO
    getTexture(cube){
        if(textured_cube_setting[cube]== undefined ) {
            if(this.cube_objs[cube]!= undefined){
                return this.cube_objs[cube]["mesh"].material.texture_url;
            }
            return null
        }
        if(textured_cube_setting[cube].texture!= undefined){
            return textured_cube_setting[cube].texture;
        }else if(textured_cube_setting[cube].color != undefined){
            return textured_cube_setting[cube].color
        }
        
        return null
    }
    getCubeList(){
        return Object.keys(this.cube_objs)
    }

}
