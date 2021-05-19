import * as THREE from 'three';
import { Cat } from './cat';
import {Seagull} from './seagul'
export class CREATURE_MANAGER {
    constructor(scene,clock) {
        this.scene = scene;
        this.clock = clock;
        this.obj_dict = {};
        this.last_id = 0;
        this.creature_list = ['seagul','cat']
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
    add_obj(id,pos,obj,mixer){
        obj.creature_id = id;
        obj.position.add(pos);
        this.obj_dict[id]["mixer"] = mixer;
        this.scene.add(obj)
    }
    add_creature(name,pos){
        var creature_id = this.last_id;
        this.last_id+=1;
        this.obj_dict[creature_id]={}
        switch(name){
            case "seagul":
                Seagull((obj,mixer)=>{
                    this.add_obj(creature_id, pos,obj,mixer)
                });
                break;
            case "cat":
                Cat((obj,mixer)=>{
                    this.add_obj(creature_id, pos,obj,mixer)
                });
                break;
        }
        
    }
}