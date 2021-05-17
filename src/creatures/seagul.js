import * as THREE from 'three';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'

export function Seagull(callback){
    const loader = new FBXLoader();
    const textureLoader = new THREE.TextureLoader();
    const model_texture = textureLoader.load("models/Seagull/Seagull_COL_1k.png");
    loader.load("models/Seagull/Seagul_1.fbx", function(obj) {
        console.log(obj);
        // obj.children[1].material[0].map = model_texture;
        obj.traverse((child)=>{
            if(child.type=="SkinnedMesh"){
                child.material.map = model_texture;
            }
        });
        obj.scale.set(0.01,0.01,0.01);
        // obj.translateY(0.2);
        var mixer = new THREE.AnimationMixer(obj);
        var actions = []; //所有的动画数组
        console.log(obj.animations.length)
        var play_i = 2;
        for(var i=0; i<obj.animations.length; i++){
            actions[i] = mixer.clipAction(obj.animations[i]);
            if(i==play_i){
                actions[i].play()
            }else{
                actions[i].stop()
            }
        }
        // var AnimationAction = mixer.clipAction(obj.animations[0]);
        // AnimationAction.play();

        callback(obj,mixer);
    })
}