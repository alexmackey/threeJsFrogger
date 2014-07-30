var sceneSetup = (function() {

    "use strict";

    function createRoad(zPos){

        var road = new THREE.Mesh(
            new THREE.BoxGeometry( 2000, 1, 250 ),
            new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('content/road2.jpg') }), //http://opengameart.org/sites/default/files/oga-textures/tunnel_road.jpg
            0
        );

        road.name= "road";
        road.position.y = 1;
        road.position.z = zPos;

        game.scene.add(road);
    }

    function createLake(zPos){

        var lake = new THREE.Mesh(
            new THREE.BoxGeometry( 2000, 1, 250 ),
            new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('content/water.jpg') }), //http://opengameart.org/node/10510
            0
        );

        lake.name= "lake";
        lake.position.y = 1;
        lake.position.z = zPos;

        game.scene.add(lake);
    }

    function createTree(x,z){

        var treeBaseWidth = support.getRand(15, 22);

        var tree = new THREE.Mesh(
            new THREE.CylinderGeometry(1, treeBaseWidth, 60, 9, 9, false),
            new THREE.MeshLambertMaterial({ ambient: 0x003311 * support.getRand(0, 5), map: THREE.ImageUtils.loadTexture('content/tree.jpg') }), //http://opengameart.org/node/8149
            0
        );

        var stump = new THREE.Mesh(
            new THREE.CylinderGeometry(5, 5, 20, 9, 9, false),
            new THREE.MeshLambertMaterial({ ambient: 0x552211  }),
            0
        );

        tree.add(stump);

        stump.position.y = -40;

        tree.name= "tree";
        tree.position.set(x, 40, z);

        game.scene.add(tree);
    }



    function addSceneObjects(){

        var texture =    THREE.ImageUtils.loadTexture('content/grass2.png'); //http://opengameart.org/sites/default/files/grass_0_0.png

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 25, 25 );

        var material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ map: texture }),
            0.9,
            0.1
        );

        var ground = new Physijs.BoxMesh(
            new THREE.BoxGeometry( 2000, 1, 2000 ),
            material,
            0
        );

        ground.name="ground";
        ground.position.y = 0

        game.scene.add(ground);



        createRoad(-100);


        for (var i = 0; i < 20; i++)
        {
            createTree(support.getRand(-500, 500), support.getRand(-250, -320));
        }


        createRoad(-500);

        createLake(-900);

        var ambientLight = new THREE.AmbientLight(0xcccccc);
        game.scene.add(ambientLight);

        var spotLight = new THREE.SpotLight( 0xffffff);
        spotLight.position.set( 0, 200, -50 );
        game.scene.add(spotLight);

    }

    return {
        addSceneObjects: addSceneObjects
    }

})();

