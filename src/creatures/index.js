import {Seagull} from './seagul'
export class CREATURE_MANAGER {
    constructor(scene,clock) {
        this.scene = scene;
        this.clock = clock;
        this.obj_dict = {};
        this.last_id = 0;
        this.creature_list = ['seagul']
    }
    update_all(){
        for(let id in this.obj_dict){
            if(this.obj_dict[id]["mixer"]!= undefined){
                this.obj_dict[id]["mixer"].update(this.clock.getDelta());
            }
        }
    }
    get_creature_list(){
        return this.creature_list;
    }
    add_creature(name,x,y,z){
        this.obj_dict[this.last_id]={}
        switch(name){
            case "seagul":
                Seagull((obj,mixer)=>{
                    obj.id = this.last_id;
                    obj.position.x = x;
                    obj.position.y = y;
                    obj.position.z = z;
                    this.scene.add(obj)
                    this.obj_dict[this.last_id]["mixer"] = mixer;
                })
        }
        this.last_id+=1;
    }
}