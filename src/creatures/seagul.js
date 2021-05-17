import * as THREE from 'three';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'

export function Seagull(callback){
    var loader = new FBXLoader();
    const model_texture = textureLoader.load("models/Seagull/Seagull_COL_1k.png");
    loader.load("models/Seagull/Seagul_1.fbx", function(obj) {
        console.log(obj);
        obj.children[1].material[0].map = model_texture;
        obj.traverse((child)=>{
            if(child.type=="SkinnedMesh"){
                child.material[0].map = model_texture;
            }
        });
        // obj.scale.set(0.01,0.01,0.01);
        // obj.translateY(0.2);
        var mixer = new THREE.AnimationMixer(obj);
        var AnimationAction = mixer.clipAction(obj.animations[0]);
        AnimationAction.play();

        callback(obj,mixer);
    })
}