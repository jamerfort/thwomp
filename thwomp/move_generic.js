(function(){

    //#######################################
    // Move Target
    //#######################################
    var _obj = null

    function setDefaultMoveObj() {
        _obj = THWOMP.camera
    }

    setDefaultMoveObj()

    function getMoveObj() {
        return _obj
    }

    function setMoveObj(obj) {
        _obj = obj
    }
    //#######################################

    //#######################################
    // Move Handlers
    //#######################################
    function onMoveObj(obj, callback) {
        if (!obj.userData._moveCallbacks) {
            obj.userData._moveCallbacks = []
        }   

        obj.userData._moveCallbacks.push(callback)


        function remover() {
            var _callbacks = obj.userData._moveCallbacks
            var idx = _callbacks.indexOf(callback)
            if (idx != -1) {
                _callbacks.splice(idx, 1)
                return true
            }

            return false
        }

        return remover
    }

    function onMove(callback) {
        return onMoveObj(THWOMP.camera, callback)
    }

    function fireOnMoveObj(obj) {
        if (obj.userData._moveCallbacks) {
            obj.userData._moveCallbacks.forEach(cb => cb())
        }
    }
    //#######################################


    //#######################################
    // Components to Axes
    //#######################################
    function movementToAxes(m) {
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
        var rotate_clockwise = m.rotate_clockwise || 0
        var rotate_counter_clockwise = m.rotate_counter_clockwise || 0

        var lr = right - left
        var ud = up - down
        //var fb = forward - backward
        var fb = backward - forward

        //var rlr = rotate_right - rotate_left
        var rlr = rotate_left - rotate_right
        var rud = rotate_up - rotate_down
        //var rcw = rotate_clockwise - rotate_counter_clockwise
        var rcw = rotate_counter_clockwise - rotate_clockwise

        var rslt = {
            lr,
            ud,
            fb,
            rlr,
            rud,
            rcw,
        }

        return rslt
    }
    //#######################################
    
    function move(m) {
        var obj = getMoveObj()
        if (obj == THWOMP.camera) {
            return THWOMP.moveCamera(m)
        } else {
            return THWOMP.moveObj(obj, m)
        }
    }
    
    function moveTween(m, options) {
        var obj = getMoveObj()
        if (obj == THWOMP.camera) {
            return THWOMP.moveCameraTween(m, options)
        } else {
            return THWOMP.moveObjTween(obj, m, options)
        }
    }

    Object.entries({
        onMoveObj,
        onMove,
        fireOnMoveObj,

        setMoveObj,
        setDefaultMoveObj,
        getMoveObj,

        movementToAxes,

        move,
        moveTween,

    }).forEach((kv) => {
        var key = kv[0]
        var val = kv[1]
        THWOMP[key] = val
    })
    
    //#######################################
})()
