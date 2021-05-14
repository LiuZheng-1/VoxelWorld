import * as THREE from 'three';

var createDoor = function () {
    // createPreview();
    cubeGeo = new THREE.BoxGeometry(50, 50, 50);
    var texture = new THREE.TextureLoader().load('../dist/textures/minecraft/door_spruce_lower.png');
    texture.magFilter = THREE.NearestFilter;//指定纹理的放大方式, nearestFilter最邻近过滤
    cubeMaterial = new THREE.MeshLambertMaterial({ map: texture });
    // currentCube = 'door'
}