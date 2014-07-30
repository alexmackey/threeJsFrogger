var player=(function(){

    "use strict";

    var movementRate = 3,
        playerBox,
        playerBoxMaterial;

    function init(){


    }

    function moveX(movement) {
        //game.camera.position.x += movementRate * movement;
        game.camera.position.x += movementRate * movement;
        game.camera.__dirtyPosition = true;
        playerBox.position.x  += movementRate * movement;
        playerBox.__dirtyPosition = true;

    }

    function moveZ(movement) {
        game.camera.position.z += movementRate * movement;
        game.camera.__dirtyPosition = true;
        playerBox.position.z += movementRate  * movement;
        playerBox.__dirtyPosition = true;

        checkIfAtFinish();
    }

    function checkIfAtFinish(){
        if(playerBox.position.z<=-920){

            if(game.wintext) return;

            createText('You win!');

            return;
            game.scene.remove(playerBox);
            game.resetScene();
            player.createPlayer();
            game.playerActive = true;
        }
    }

    function createText(textContent){
        var text3d = new THREE.TextGeometry( textContent, {

            size: 50,
            height: 20,
            curveSegments: 2,
            font: "helvetiker"

        });


        var textMaterial = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff} );
        var textMesh = new THREE.Mesh( text3d, textMaterial );
        textMesh.position.set(-120, 60, -1200);
        game.scene.add(textMesh);
        game.wintext= textMesh;
    }

    function createPlayer(){

        playerBoxMaterial = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0x0000ff,
                transparent: true,
                opacity: 0.8
            }),
            0.1, //friction
            0.5 //restitution/bounciness
        );

        playerBox = new Physijs.BoxMesh(
            new THREE.CubeGeometry(2, 14, 2),
            playerBoxMaterial,
            0.1
        );

        playerBox.position.set(0, 7.6, 50);
        playerBox.name = "playerBox";

        game.scene.add(playerBox);
    }

    return{
        init: init,
        createPlayer: createPlayer,
        moveX: moveX,
        moveZ: moveZ
    }

})();