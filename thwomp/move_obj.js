(function(){

    function cameraToLocal(obj, cam_v3) {
        cam_v3.normalize()

        var cam_pos = new THREE.Vector3()
        THWOMP.camera.getWorldPosition(cam_pos)

        var obj_pos = new THREE.Vector3()
        obj.getWorldPosition(obj_pos)

        THWOMP.camera.localToWorld(cam_v3)

        cam_v3.sub(cam_pos).add(obj_pos)

        obj.worldToLocal(cam_v3)

        return cam_v3
    }

    function core_moveAlongCameraAxis(obj, cam_v3, d) {
        cameraToLocal(obj, cam_v3)
        obj.translateOnAxis(cam_v3, d)
    }

    function core_rotateOnCameraAxis(obj, cam_v3, d) {
        cameraToLocal(obj, cam_v3)
        obj.rotateOnAxis(cam_v3, d)
    }

    function core_moveRight(obj, d)    { return core_moveAlongCameraAxis(obj, new THREE.Vector3(1,0,0 ), d); }
    function core_moveUp(obj, d)       { return core_moveAlongCameraAxis(obj, new THREE.Vector3(0,1,0 ), d); }
    function core_moveBackward(obj, d) { return core_moveAlongCameraAxis(obj, new THREE.Vector3(0,0,1), d); }

    function core_rotateLeft(obj, d)      { return core_rotateOnCameraAxis(obj, new THREE.Vector3(0,-1,0), d); }
    function core_rotateUp(obj, d)        { return core_rotateOnCameraAxis(obj, new THREE.Vector3(-1,0,0), d); }
    function core_rotateClockwise(obj, d) { return core_rotateOnCameraAxis(obj, new THREE.Vector3(0,0,1),  d); }

    function moveObjRight(obj, d)              { core_moveRight(obj, d);        THWOMP.fireOnMoveObj(obj); }
    function moveObjLeft(obj, d)               { core_moveRight(obj, -d);       THWOMP.fireOnMoveObj(obj); }
    function moveObjUp(obj, d)                 { core_moveUp(obj, d);           THWOMP.fireOnMoveObj(obj); }
    function moveObjDown(obj, d)               { core_moveUp(obj, -d);          THWOMP.fireOnMoveObj(obj); }
    function moveObjBackward(obj, d)           { core_moveBackward(obj, d);     THWOMP.fireOnMoveObj(obj); }
    function moveObjForward(obj, d)            { core_moveBackward(obj, -d);    THWOMP.fireOnMoveObj(obj); }
    function rotateObjLeft(obj, d)             { core_rotateLeft(obj, d);       THWOMP.fireOnMoveObj(obj); }
    function rotateObjRight(obj, d)            { core_rotateLeft(obj, -d);      THWOMP.fireOnMoveObj(obj); }
    function rotateObjUp(obj, d)               { core_rotateUp(obj, d);         THWOMP.fireOnMoveObj(obj); }
    function rotateObjDown(obj, d)             { core_rotateDown(obj, -d);      THWOMP.fireOnMoveObj(obj); }
    function rotateObjClockwise(obj, d)        { core_rotateClockwise(obj, d);  THWOMP.fireOnMoveObj(obj); }
    function rotateObjCounterClockwise(obj, d) { core_rotateClockwise(obj, -d); THWOMP.fireOnMoveObj(obj); }

    function translateObjTween(obj, motionCmd, d, options) {
        options = options || {};
        var duration = options.duration || THWOMP.config['object.default.tween.duration'];
        var easing = options.easing || THWOMP.config['object.default.easing']
        var last = 0;
        var tween = new TWEEN.Tween({d: last})
        tween.to({d: d}, duration).onUpdate(function(val){
            var diff = val.d - last
            last = val.d
            motionCmd(obj, diff)
        }).easing(easing).start().onComplete(function(){
            THWOMP.fireOnMoveObj(obj)
        })

        if (!THWOMP.isAnimating()) {
            THWOMP.animate()
        }
    }

    function moveObjRightTween(obj, d, options)               { translateObjTween(obj, core_moveRight, d, options);        }
    function moveObjUpTween(obj, d, options)                  { translateObjTween(obj, core_moveUp, d, options);           }
    function moveObjBackwardTween(obj, d, options)            { translateObjTween(obj, core_moveBackward, d, options);     }
    function moveObjLeftTween(obj, d, options)                { translateObjTween(obj, core_moveRight, -d, options);       }
    function moveObjDownTween(obj, d, options)                { translateObjTween(obj, core_moveUp, -d, options);          }
    function moveObjForwardTween(obj, d, options)             { translateObjTween(obj, core_moveBackward, -d, options);    }
    function rotateObjLeftTween(obj, d, options)              { translateObjTween(obj, core_rotateLeft, d, options);       }
    function rotateObjRightTween(obj, d, options)             { translateObjTween(obj, core_rotateLeft, -d, options);      }
    function rotateObjUpTween(obj, d, options)                { translateObjTween(obj, core_rotateUp, d, options);         }
    function rotateObjDownTween(obj, d, options)              { translateObjTween(obj, core_rotateUp, -d, options);        }
    function rotateObjClockwiseTween(obj, d, options)         { translateObjTween(obj, core_rotateClockwise, d, options);  }
    function rotateObjCounterClockwiseTween(obj, d, options)  { translateObjTween(obj, core_rotateClockwise, -d, options); }

    function moveObj(obj, m) {
        var axes = THWOMP.movementToAxes(m)

        if (axes.lr)  { moveObjRight(       obj, axes.lr  ) }
        if (axes.ud)  { moveObjUp(          obj, axes.ud  ) }
        if (axes.fb)  { moveObjBackward(    obj, axes.fb  ) }
        if (axes.rlr) { rotateObjLeft(      obj, axes.rlr ) }
        if (axes.rud) { rotateObjUp(        obj, axes.rud ) }
        if (axes.rcw) { rotateObjClockwise( obj, axes.rcw ) }

        if (m.shouldRender) {
            THWOMP.render()
        }
    }

    function moveObjTween(obj, m, options) {
        var axes = THWOMP.movementToAxes(m)

        if (axes.lr)  { moveObjRightTween(       obj, axes.lr  , options) }
        if (axes.ud)  { moveObjUpTween(          obj, axes.ud  , options) }
        if (axes.fb)  { moveObjBackwardTween(    obj, axes.fb  , options) }
        if (axes.rlr) { rotateObjLeftTween(      obj, axes.rlr , options) }
        if (axes.rud) { rotateObjUpTween(        obj, axes.rud , options) }
        if (axes.rcw) { rotateObjClockwiseTween( obj, axes.rcw , options) }
    }

    Object.entries({
        moveObjRight,
        moveObjLeft,

        moveObjUp,
        moveObjDown,

        moveObjBackward,
        moveObjForward,

        rotateObjLeft,
        rotateObjRight,

        rotateObjUp,
        rotateObjDown,

        rotateObjClockwise,
        rotateObjCounterClockwise,

        moveObjRightTween,
        moveObjLeftTween,

        moveObjUpTween,
        moveObjDownTween,

        moveObjBackwardTween,
        moveObjForwardTween,

        rotateObjLeftTween,
        rotateObjRightTween,

        rotateObjUpTween,
        rotateObjDownTween,

        rotateObjClockwiseTween,
        rotateObjCounterClockwiseTween,

        moveObj,
        moveObjTween,

    }).forEach((kv) => {
        var key = kv[0]
        var val = kv[1]
        THWOMP[key] = val
    })
    
    //#######################################
})()
