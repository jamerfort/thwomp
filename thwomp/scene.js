(function(){

    //#######################################
    // Scene, Render
    //#######################################
    var scene = new THREE.Scene();
    THWOMP.scene = scene

        //#######################################
        // Background/Lighting
        //#######################################

        if (THWOMP.config['scene.background.color']) {
            scene.background = new THREE.Color( THWOMP.config['scene.background.color'] );
        }

        //scene.add(new THREE.AmbientLight(0x404040))
        scene.add(new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 ))
        var light = new THREE.DirectionalLight( 0xffffff, 1 );
        light.position.set( -1, 100, 100 ).normalize();
        light.castShadow = true;
        //light.shadowDarkness = 0.1;
        scene.add( light );

        /*
        hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
        hemiLight.color.setHSL( 0.6, 1, 0.6 );
        hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
        hemiLight.position.set( 0, 50, 0 );
        scene.add( hemiLight );
        */

        //#######################################
    
    THWOMP.add = function (obj) {
        THWOMP.scene.add(obj)
    }

    _background = null
    THWOMP.setBackground360 = function (imgurl, radius, segmentCount) {
        radius = radius || THWOMP.config['scene.background.360.radius']
        segmentCount = segmentCount || THWOMP.config['scene.background.360.segmentCount']

        if (_background != null) {THWOMP.scene.remove(_background)}

        var geometry = new THREE.SphereGeometry(radius, segmentCount,segmentCount)
        new THREE.TextureLoader().load(imgurl, function(texture){
            var material = new THREE.MeshBasicMaterial({ map: texture })
            material.side = THREE.BackSide
            var mesh = new THREE.Mesh(geometry, material)

            _background = mesh

            THWOMP.scene.add(mesh)
            THWOMP.render()
        })
    }

    if (THWOMP.config['scene.background.360.url']) {
        THWOMP.setBackground360(THWOMP.config['scene.background.360.url'])
    }
})()
