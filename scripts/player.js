var player=(function(){

    "use strict";

    var movementRate = 3,
        playerBox,
        playerBoxMaterial,
        finishLineZPos=-920;

    function init(){
    }

    function moveX(movement) {
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

        checkIfPlayerAtFinish();
    }

    function checkIfPlayerAtFinish(){

        if(playerBox.position.z<=finishLineZPos){

            if(game.wintext){
                //dont display win text twice!
                return;
            }

            text.createText('You win!', 'winText');
        }
    }

    function createPlayer(){

        playerBoxMaterial = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0x0000ff,
                opacity: 0
            }),
            0.1, //friction
            0.5 //restitution/bounciness
        );

        var personMaterial = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0x0000ff,
                transparent: true,
                opacity: 0.8
            }),
            0.1, //friction
            0.5 //restitution/bounciness
        );

        var playerHead = new Physijs.SphereMesh(
            new THREE.SphereGeometry(5, 14, 14),
            personMaterial,
            0.1
        );

        var playerBody = new Physijs.BoxMesh(
            new THREE.BoxGeometry(6, 10, 5),
            personMaterial,
            0.1
        );
        playerHead.add(playerBody);
        playerBody.position.y = -8;

        var playerLLeg = new Physijs.BoxMesh(
            new THREE.BoxGeometry(2, 10, 5),
            personMaterial,
            0.1
        );
        playerBody.add(playerLLeg);
        playerLLeg.position.y = -10;
        playerLLeg.position.x = -2;

        var playerRLeg = new Physijs.BoxMesh(
            new THREE.BoxGeometry(2, 10, 5),
            personMaterial,
            0.1
        );
        playerBody.add(playerRLeg);
        playerRLeg.position.y = -10;
        playerRLeg.position.x = 2;

        playerBox =  new Physijs.BoxMesh(
            new THREE.CubeGeometry(10, 16, 10),
            playerBoxMaterial,
            0.1
        );
        playerBox.position.set(0, 24, 50);
        playerBox.name = "playerBox";
        playerBox.add(playerHead);

        game.scene.add(playerBox);
    }

    return{
        init: init,
        createPlayer: createPlayer,
        moveX: moveX,
        moveZ: moveZ
    }

})();