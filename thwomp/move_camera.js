(function(){

    function core_moveRight(d)       { THWOMP.camera.translateX(d); }
    function core_moveUp(d)          { THWOMP.camera.translateY(d); }
    function core_moveBackward(d)    { THWOMP.camera.translateZ(d); }
    function core_rotateLeft(d)      { THWOMP.camera.rotateOnWorldAxis(new THREE.Vector3(0,1,0), d); }
    function core_rotateUp(d)        { THWOMP.camera.rotateX(d); }
    function core_rotateClockwise(d) { THWOMP.camera.rotateZ(d); }

    function moveRight(d)              { core_moveRight(d);        THWOMP.fireOnMoveObj(THWOMP.camera); }
    function moveLeft(d)               { core_moveRight(-d);       THWOMP.fireOnMoveObj(THWOMP.camera); }
    function moveUp(d)                 { core_moveUp(d);           THWOMP.fireOnMoveObj(THWOMP.camera); }
    function moveDown(d)               { core_moveUp(-d);          THWOMP.fireOnMoveObj(THWOMP.camera); }
    function moveBackward(d)           { core_moveBackward(d);     THWOMP.fireOnMoveObj(THWOMP.camera); }
    function moveForward(d)            { core_moveBackward(-d);    THWOMP.fireOnMoveObj(THWOMP.camera); }
    function rotateLeft(d)             { core_rotateLeft(d);       THWOMP.fireOnMoveObj(THWOMP.camera); }
    function rotateRight(d)            { core_rotateLeft(-d);      THWOMP.fireOnMoveObj(THWOMP.camera); }
    function rotateUp(d)               { core_rotateUp(d);         THWOMP.fireOnMoveObj(THWOMP.camera); }
    function rotateDown(d)             { core_rotateDown(-d);      THWOMP.fireOnMoveObj(THWOMP.camera); }
    function rotateClockwise(d)        { }//core_rotateClockwise(d);  THWOMP.fireOnMoveObj(THWOMP.camera); }
    function rotateCounterClockwise(d) { }//core_rotateClockwise(-d); THWOMP.fireOnMoveObj(THWOMP.camera); }

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
        }).easing(easing).start().onComplete(function(){
            THWOMP.fireOnMoveObj(THWOMP.camera)
        })

        if (!THWOMP.isAnimating()) {
            THWOMP.animate()
        }
    }

    function moveRightTween(d, options)              { translateTween(core_moveRight, d, options);        }
    function moveUpTween(d, options)                 { translateTween(core_moveUp, d, options);           }
    function moveBackwardTween(d, options)           { translateTween(core_moveBackward, d, options);     }
    function moveLeftTween(d, options)               { translateTween(core_moveRight, -d, options);       }
    function moveDownTween(d, options)               { translateTween(core_moveUp, -d, options);          }
    function moveForwardTween(d, options)            { translateTween(core_moveBackward, -d, options);    }
    function rotateLeftTween(d, options)             { translateTween(core_rotateLeft, d, options);       }
    function rotateRightTween(d, options)            { translateTween(core_rotateLeft, -d, options);      }
    function rotateUpTween(d, options)               { translateTween(core_rotateUp, d, options);         }
    function rotateDownTween(d, options)             { translateTween(core_rotateUp, -d, options);        }
    function rotateClockwiseTween(d, options)        {}// translateTween(core_rotateClockwise, d, options);  }
    function rotateCounterClockwiseTween(d, options) {}// translateTween(core_rotateClockwise, -d, options); }


    function moveCamera(m) {
        var axes = THWOMP.movementToAxes(m)

        if (axes.lr)  { moveRight(       axes.lr  ) }
        if (axes.ud)  { moveUp(          axes.ud  ) }
        if (axes.fb)  { moveBackward(    axes.fb  ) }
        if (axes.rlr) { rotateLeft(      axes.rlr ) }
        if (axes.rud) { rotateUp(        axes.rud ) }
        if (axes.rcw) { rotateClockwise( axes.rcw ) }

        if (m.shouldRender) {
            THWOMP.render()
        }
    }

    function moveCameraTween(m, options) {
        var axes = THWOMP.movementToAxes(m)

        if (axes.lr)  { moveRightTween(       axes.lr  , options) }
        if (axes.ud)  { moveUpTween(          axes.ud  , options) }
        if (axes.fb)  { moveBackwardTween(    axes.fb  , options) }
        if (axes.rlr) { rotateLeftTween(      axes.rlr , options) }
        if (axes.rud) { rotateUpTween(        axes.rud , options) }
        if (axes.rcw) { rotateClockwiseTween( axes.rcw , options) }

    }

    Object.entries({
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

        rotateClockwise,
        rotateCounterClockwise,

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

        rotateClockwiseTween,
        rotateCounterClockwiseTween,

        moveCamera,
        moveCameraTween,

    }).forEach((kv) => {
        var key = kv[0]
        var val = kv[1]
        THWOMP[key] = val
    })
    
    //#######################################
})()
