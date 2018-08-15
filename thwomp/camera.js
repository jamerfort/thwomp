(function(){
    //#######################################
    // Camera
    //#######################################

    var fov = THWOMP.config['camera.fov']
    var near = THWOMP.config['camera.near']
    var far = THWOMP.config['camera.far']

    var camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, near, far );
    THWOMP.camera = camera

    _reticle = null

    THWOMP.removeReticle = function(){
        if ( _reticle != null ) {
            THWOMP.camera.remove(_reticle)
        }
    }

    THWOMP.setReticle = function(reticle){
        THWOMP.removeReticle()
        _reticle = reticle
        THWOMP.camera.add(_reticle)
    }

    if (THWOMP.config['reticle']) {
        THWOMP.setReticle(THWOMP.config['reticle'])
    }
    

    THWOMP.scene.add(camera)

    camera.position.x = THWOMP.config['camera.initial.x']
    camera.position.y = THWOMP.config['camera.initial.y']
    camera.position.z = THWOMP.config['camera.initial.z']

    /*
    //#######################################
    // Camera Movement Functions
    //#######################################
    var _callbacks = []
    function onMove(callback) {
        _callbacks.push(callback)
    }

    function removeOnMove(callback) {
        var idx = _callbacks.indexOf(callback)
        if (idx != -1) {
            _callbacks.split(idx, 1)
            return true
        }

        return false
    }

    function fireOnMove() {
        _callbacks.forEach(cb => cb())
    }

    function core_moveRight(d)    { camera.translateX(d); }
    function core_moveUp(d)       { camera.translateY(d); }
    function core_moveBackward(d) { camera.translateZ(d); }
    function core_rotateLeft(d)   { camera.rotateOnWorldAxis(new THREE.Vector3(0,1,0), d); }
    function core_rotateUp(d)     { camera.rotateX(d); }

    function moveRight(d)    { core_moveRight(d);     fireOnMove(); }
    function moveLeft(d)     { core_moveRight(-d);    fireOnMove(); }
    function moveUp(d)       { core_moveUp(d);        fireOnMove(); }
    function moveDown(d)     { core_moveUp(-d);       fireOnMove(); }
    function moveBackward(d) { core_moveBackward(d);  fireOnMove(); }
    function moveForward(d)  { core_moveBackward(-d); fireOnMove(); }
    function rotateLeft(d)   { core_rotateLeft(d);    fireOnMove(); }
    function rotateRight(d)  { core_rotateLeft(-d);   fireOnMove(); }
    function rotateUp(d)     { core_rotateUp(d);      fireOnMove(); }
    function rotateDown(d)   { core_rotateDown(-d);   fireOnMove(); }
    function rotateDown(d)   { camera.rotateX(-d); }

    function translateTween(motionCmd, d, options) {
        options = options || {};
        var duration = options.duration || THWOMP.config['camera.default.tween.duration'];
        var easing = options.easing || THWOMP.config['camera.default.easing']
        var last = 0;
        var tween = new TWEEN.Tween({d: last})
        tween.to({d: d}, duration).onUpdate(function(val){
            var diff = val.d - last
            last = val.d
            motionCmd(diff)
        }).easing(easing).start().onComplete(fireOnMove)

        if (!THWOMP.isAnimating()) {
            THWOMP.animate()
        }
    }

    function moveRightTween(d, options)    { translateTween(core_moveRight, d, options);     }
    function moveUpTween(d, options)       { translateTween(core_moveUp, d, options);        }
    function moveBackwardTween(d, options) { translateTween(core_moveBackward, d, options);  }
    function moveLeftTween(d, options)     { translateTween(core_moveRight, -d, options);    }
    function moveDownTween(d, options)     { translateTween(core_moveUp, -d, options);       }
    function moveForwardTween(d, options)  { translateTween(core_moveBackward, -d, options); }
    function rotateLeftTween(d, options)   { translateTween(core_rotateLeft, d, options);    }
    function rotateRightTween(d, options)  { translateTween(core_rotateLeft, -d, options);   }
    function rotateUpTween(d, options)     { translateTween(core_rotateUp, d, options);      }
    function rotateDownTween(d, options)   { translateTween(core_rotateUp, -d, options);     }

    function move(m) {
        var left = m.left || 0
        var right = m.right || 0
        var up = m.up || 0
        var down = m.down || 0
        var forward = m.forward || 0
        var backward = m.backward || 0
        var rotate_left = m.rotate_left || 0
        var rotate_right = m.rotate_right || 0
        var rotate_up = m.rotate_up || 0
        var rotate_down = m.rotate_down || 0

        var lr = right - left
        var ud = up - down
        var fb = forward - backward

        var rlr = rotate_right - rotate_left
        var rud = rotate_up - rotate_down

        if (lr)  { moveRight(lr) }
        if (ud)  { moveUp(ud) }
        if (fb)  { moveBackward(fb) }
        if (rlr) { rotateLeft(rlr) }
        if (rud) { rotateUp(rud) }

        if (m.shouldRender) {
            THWOMP.render()
        }
    }

    Object.entries({
        onMove,

        moveRight,
        moveLeft,

        moveUp,
        moveDown,

        moveBackward,
        moveForward,

        rotateLeft,
        rotateRight,

        rotateUp,
        rotateDown,

        moveRightTween,
        moveLeftTween,

        moveUpTween,
        moveDownTween,

        moveBackwardTween,
        moveForwardTween,

        rotateLeftTween,
        rotateRightTween,

        rotateUpTween,
        rotateDownTween,

        move,

    }).forEach((kv) => {
        var key = kv[0]
        var val = kv[1]
        THWOMP[key] = val
    })
    
    //#######################################
    */
})()
