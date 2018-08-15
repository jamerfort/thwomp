(function(){

    THWOMP.Reticles = {}

    THWOMP.Reticles.Point = function () {
        var grp = new THREE.Group();

        var reticle1 = new THREE.Mesh(
            new THREE.RingBufferGeometry( 0.85 * .01, .01, 32),
            new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide })
        );
        var reticle2 = new THREE.Mesh(
            new THREE.RingBufferGeometry( 0.001, 0.85 * .01, 32),
            new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide })
        );

        grp.add(reticle1)
        grp.add(reticle2)

        grp.position.z = -2;
   
        return grp
    }

})()
