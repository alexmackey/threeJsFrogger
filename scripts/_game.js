var game = (function () {

    "use strict";

    Physijs.scripts.worker = 'scripts/physijs_worker.js';
    Physijs.scripts.ammo = 'ammo.js';

    var scene = new Physijs.Scene(),
        camera,
        clock = new THREE.Clock(),
        width = window.innerWidth,
        height = window.innerHeight - 10,
        playerBox,
        renderer = new THREE.WebGLRenderer(),
        playerActive = true,
        lives = 3,
        controls;

    renderer.setSize(width, height);
    renderer.setClearColor(0xE0EEEE);

    document.getElementById("webgl-container").appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(
        35,
        width / height,
        1,
        1000
    );

    scene.add(camera);
    scene.fog = new THREE.Fog(0xE0EEEE, 250, 600);
    scene.setGravity(new THREE.Vector3(0, -100, 0));

    function init() {

        resetScene();
        pointerLock.init(camera, scene);
        sceneSetup.addSceneObjects();
        enemy.init();
        player.createPlayer();
        gameControls.init();

        render();
    }

    function resetScene() {
        camera.position.set(0, 20, 200);
        camera.rotation.set(0, 0, 0);
    }

    function removeLife() {
        lives -= 1;
        document.getElementById("numberOfLives").innerHTML = lives;

        if (lives == 0) {
            alert('game over');
        }
    }

    function render() {
        scene.simulate();
        pointerLock.controls.update();

        var delta = clock.getDelta();
        enemy.update(delta);

        if (game.wintext) {
            game.wintext.rotation.y += 0.01;
        }

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    return {
        scene: scene,
        camera: camera,
        playerBox: playerBox,
        init: init,
        controls: controls,
        playerActive: playerActive,
        resetScene: resetScene,
        lives: lives,
        removeLife: removeLife
    }

})();

window.onload = game.init();