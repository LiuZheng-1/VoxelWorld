import {Seagull} from './seagul'
export class CREATURE_MANAGER {
    constructor(scene) {
        this.scene = scene;
        this.obj_dict = {};
        this.last_id = 0;
    }
    update_all(){
        for(let id in this.obj_dict){
            if(this.obj_dict[id]["mixer"]!= undefined){
                this.obj_dict[id]["mixer"]
            }
        }
    }
    add_creature(name,x,y,z){
        var creature;
        this.obj_dict[this.last_id]={}
        switch(name){
            case "seagul":
                Seagull(this.scene,this.obj_dict[this.last_id],this.last_id)
        }
        this.last_id+=1;
    }
}