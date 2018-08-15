(function(){
    var _hoverables = null
    var _last_hovered = null

    THWOMP.clearHoverables = function(){
        _hoverables = []
    }
    THWOMP.clearHoverables()

    THWOMP.addHoverable = function(obj){
        if ( ! obj.userData._wasHoverable ) {
            _hoverables.push(obj)
        }
        obj.userData._wasHoverable = true
        obj.userData._hoverable = true
        obj.userData._hovering = false
    }

    THWOMP.pauseHoverable = function(obj){
        obj.userData._hoverable = false
    }

    THWOMP.resumeHoverable = function(obj){
        if (obj.userData._wasHoverable) {
            obj.userData._hoverable = true
        }
    }

    THWOMP.removeHoverable = function(obj){
        if (!obj.userData._wasHoverable) {
            return
        }

        var idx = _hoverables.indexOf(obj)
        
        if (idx >= 0) {
            _hoverables.splice(idx, 1)
        }

        delete obj.userData._wasHoverable
        delete obj.userData._hoverable
    }

    var _last_hovered_object = null

    function exitLastHovered() {
            if (_last_hovered_object != null) {
                // Exit the last object
                if (_last_hovered_object.userData.onHoverExit) {
                    _last_hovered_object.userData.onHoverExit()
                }

                _last_hovered_object.userData._hovering = false

                _last_hovered_object = null

                return true
            }

            return false
    }

    THWOMP.handleHoverMove = function(x,y, options){
        var raycaster = new THREE.Raycaster();
        var ptr = new THREE.Vector2();

        ptr.x = ( x / window.innerWidth ) * 2 - 1;
        ptr.y = - ( y / window.innerHeight ) * 2 + 1;

        raycaster.setFromCamera( ptr, THWOMP.camera );

        var intersects = raycaster.intersectObjects(_hoverables.filter(o => o.userData._hoverable && (o.userData.onHover || o.userData.onHoverEnter || o.userData.onHoverExit) ) )

        if (intersects.length) {
            var obj = intersects[0].object

            if (_last_hovered_object != obj) {
                exitLastHovered()
                _last_hovered_object = obj
            }

            if (!obj.userData._hovering) {
                 obj.userData._hovering = true
                if (obj.userData.onHoverEnter) {
                    obj.userData.onHoverEnter()
                }
            }

            if (obj.userData.onHover) { obj.userData.onHover() }

            THWOMP.render()
        } else {
            if (exitLastHovered()) {
                THWOMP.render()
            }
        }

    }

    THWOMP.fireHoverMove = function(x, y, options){
        THWOMP.handleHoverMove(x,y, options)
    }

    THWOMP.fireHoverMoveCenter = function(options){
        return THWOMP.fireHoverMove(window.innerWidth/2, window.innerHeight/2, options)
    }

    setTimeout(function(){
        THWOMP.fireHoverMoveCenter({source: 'pointer'})
    }, 1000)

    THWOMP.onMove(function(){
        THWOMP.fireHoverMoveCenter({source: 'pointer'})
    })

    window.addEventListener('mousemove', function(e){
        THWOMP.handleHoverMove(e.clientX, e.clientY, {source: 'mouse'})
    }, false)

})()
