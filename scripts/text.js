var text = (function () {

    "use strict";

    function createText(textContent, name) {

        var text3d = new THREE.TextGeometry(textContent, {
            size: 50,
            height: 20,
            curveSegments: 2,
            font: "helvetiker"
        });

        var textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000});
        var textMesh = new THREE.Mesh(text3d, textMaterial);

        textMesh.position.set(-120, 60, -1200);
        textMesh.name = textContent;

        game.scene.add(textMesh);

        game.wintext = textMesh;
    }

    return{
        createText: createText
    }

})();
