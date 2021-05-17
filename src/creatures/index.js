import * as THREE from 'three';
import {Seagull} from './seagul'
export class CREATURE_MANAGER {
    constructor(scene,clock) {
        this.scene = scene;
        this.clock = clock;
        this.obj_dict = {};
        this.last_id = 0;
        this.creature_list = ['seagul']

        var cube_material = new THREE.MeshBasicMaterial({
            color: "#ffffff",
            transparent: true,
            opacity: 0.5
        });
        var cube_geometry = new THREE.BoxGeometry(1, 1, 1);
        this.cube = new THREE.Mesh(cube_geometry, cube_material);
    }
    update_all(){
        var interval = this.clock.getDelta()
        for(let id in this.obj_dict){
            if(this.obj_dict[id]["mixer"]!= undefined){
                this.obj_dict[id]["mixer"].update(interval);
            }
        }
    }
    get_creature_list(){
        return this.creature_list;
    }
    add_creature(name,x,y,z){
        var creature_id = this.last_id;
        this.last_id+=1;
        this.obj_dict[creature_id]={}
        this.cube.position.x = x;
        this.cube.position.y = y;
        this.cube.position.z = z;
        this.scene.add(this.cube)
        switch(name){
            case "seagul":
                Seagull((obj,mixer)=>{
                    obj.creature_id = creature_id;
                    obj.position.x = x;
                    obj.position.y = y;
                    obj.position.z = z;
                    
                    this.obj_dict[creature_id]["mixer"] = mixer;
                    this.scene.add(obj)
                    console.log("log seagul success")
                    this.scene.remove(this.cube);
                })
        }
        
    }
}