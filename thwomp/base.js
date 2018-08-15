var THWOMP = (function (THWOMP) {
    THWOMP.config = {};

    //#######################################
    // Renderer
    //#######################################
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    document.body.appendChild( renderer.domElement );
    THWOMP.renderer = renderer

    //#######################################
    // Animation/Rendering/etc.
    //#######################################

    THWOMP.render = function() {
        THWOMP.renderer.render( THWOMP.scene, THWOMP.camera );
    }


    var _animating = false;

    THWOMP.isAnimating = function(){
        return _animating;
    }

    THWOMP.animate = function () {
        var has_tweens = TWEEN.getAll().length > 0

        if (_animating == false ) {
            // check for tweens
            if (has_tweens) {
                _animating = true
                TWEEN.update()
                THWOMP.render()
                requestAnimationFrame(THWOMP.animate)
            }
        } else {
            // do we stop animations?
            if (!has_tweens) {
                _animating = false
            } else {
                TWEEN.update()
                THWOMP.render()
                requestAnimationFrame(THWOMP.animate)
            }
        }
    }

    THWOMP.lookAtObj = function (obj, duration, easing) {
        var camera = THWOMP.camera
        duration = duration || 1000
        easing = easing || TWEEN.Easing.Bounce.Out
        //easing = easing || TWEEN.Easing.Elastic.Out

        var startPos = new THREE.Euler().copy(camera.rotation)

        var v3 = new THREE.Vector3()
        obj.getWorldPosition(v3)
        camera.lookAt(v3)
        
        var endPos = new THREE.Euler().copy(camera.rotation)
        camera.rotation.copy(startPos)

        var tween = new TWEEN.Tween(camera.rotation).to({x: endPos.x, y: endPos.y, z: endPos.z}, duration).easing(easing).start()

        if (!_animating) {
            THWOMP.animate()
        }
    }

    THWOMP.viewObj = function (obj) {
        var camera = THWOMP.camera
        var v3 = obj.userData.bestView.clone() || new THREE.Vector3(0,0,5)

        obj.getWorldPosition(camera.position)
        obj.getWorldQuaternion(camera.quaternion)

        obj.localToWorld(v3)
        camera.position.copy(v3)

        camera.lookAt(obj.position)

        THWOMP.render()
    }

    return THWOMP;
})({})


