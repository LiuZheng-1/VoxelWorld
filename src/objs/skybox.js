import * as THREE from 'three';

export function skybox(opt="Epic_BlueSunset"){
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    console.log("loading skybox:"+opt)
    cubeTextureLoader.setPath( 'textures/skyboxs/'+opt+'/' );
    const cubeTexture = cubeTextureLoader.load( [
        "Left+X.png", "Right-X.png",
        "Up+Y.png", "Down-Y.png",
        "Front+Z.png", "Back-Z.png"
    ] );
    return cubeTexture
}