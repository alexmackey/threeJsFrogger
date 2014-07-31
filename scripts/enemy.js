var enemy = (function () {

    "use strict";

    var enemies = [];

    function createEnemy(origin, speed, startPos, zPos) {

        var enemy = new Physijs.BoxMesh(
            new THREE.CubeGeometry(50, 30, 25),
            Physijs.createMaterial(
                new THREE.MeshPhongMaterial({
                    ambient: Math.random() * 0xffffff
                }),
                0, //friction
                0 //restitution/bounciness
            ),
            100
        );

        var tyre1 = new Physijs.BoxMesh(new THREE.CylinderGeometry(8, 8, 26, 12, 12, false), new THREE.MeshBasicMaterial({color: 0x000000 }), 0);
        tyre1.position.x = -17;
        tyre1.position.y = -10;
        tyre1.rotation.x = 90 * (Math.PI / 180);

        var tyre2 = new Physijs.BoxMesh(new THREE.CylinderGeometry(8, 8, 26, 12, 12, false), new THREE.MeshBasicMaterial({color: 0x000000 }), 0);
        tyre2.position.x = 17;
        tyre2.position.y = -10;
        tyre2.rotation.x = 90 * (Math.PI / 180);

        enemy.add(tyre1);
        enemy.add(tyre2);

        startPos = origin == 'right' ? startPos : -startPos;

        enemy.position.set(startPos, 18, zPos);

        enemy.userData = {
            origin: origin,
            speed: speed,
            startPos: startPos,
            zPos: zPos
        }

        enemy.name = 'enemy';
        enemy.addEventListener('collision', handleCollision);

        enemies.push(enemy);

        game.scene.add(enemy);
    }

    function handleCollision(objectCollidedWith) {

        if (objectCollidedWith.name == "playerBox") {
            pointerLock.controls.enabled = false;
            game.playerActive = false;
            game.removeLife();

            setTimeout(handlePlayerKilled, 2000);
        }

    }

    function createEnemies() {

        //road 1
        createEnemy('right', 0.5, -200, -5);
        createEnemy('right', 0.5, 200, -5);

        //road 2
        createEnemy('left', 0.2, -350, -60);
        createEnemy('left', 0.2, 0, -60);

        //road 3
        createEnemy('right', 1.3, -200, -130);
        createEnemy('left', 1.3, -300, -190);

        //road 4
        createEnemy('right', 1.3, -200, -520);
    }

    function handlePlayerKilled() {

        var playerBox = game.scene.getObjectByName('playerBox');
        game.scene.remove(playerBox);

        game.resetScene();
        player.createPlayer();
        game.playerActive = true;
    }

    function update(delta) {

        if (enemies.length == 0) return;

        for (var i = 0; i < enemies.length; i++) {

            var enemy = enemies[i];
            var movement = enemy.userData.origin == 'right' ? 200 : -200;

            enemy.position.x -= movement * (delta * enemy.userData.speed);

            if ((enemy.userData.origin == 'right' && enemy.position.x < -400) || (enemy.userData.origin == 'left' && enemy.position.x > 400)) {
                //restart enemy over other side
                enemy.position.x = enemy.userData.origin == 'right' ? 400 : -400;
            }
            else {
                //rotate tyres
                enemy.children[0].rotation.y += 1;
                enemy.children[1].rotation.y += 1;
                enemy.__dirtyPosition = true;
            }
        }
    }

    function init() {
        createEnemies();
    }

    return {
        init: init,
        update: update
    }

})();