(function(){
    var _selectables = null

    THWOMP.clearSelectables = function(){
        _selectables = []
    }
    THWOMP.clearSelectables()

    THWOMP.addSelectable = function(obj){
        if ( ! obj.userData._wasSelectable ) {
            _selectables.push(obj)
        }
        obj.userData._wasSelectable = true
        obj.userData._selectable = true
    }

    THWOMP.pauseSelectable = function(obj){
        obj.userData._selectable = false
    }

    THWOMP.resumeSelectable = function(obj){
        if (obj.userData._wasSelectable) {
            obj.userData._selectable = true
        }
    }

    THWOMP.removeSelectable = function(obj){
        if (!obj.userData._wasSelectable) {
            return
        }

        var idx = _selectables.indexOf(obj)
        
        if (idx >= 0) {
            _selectables.splice(idx, 1)
        }

        delete obj.userData._wasSelectable
        delete obj.userData._selectable
    }

    var _selected = []

    THWOMP.select = function(x,y){
        var raycaster = new THREE.Raycaster();
        var ptr = new THREE.Vector2();

        ptr.x = ( x / window.innerWidth ) * 2 - 1;
        ptr.y = - ( y / window.innerHeight ) * 2 + 1;

        raycaster.setFromCamera( ptr, THWOMP.camera );

        var intersects = raycaster.intersectObjects(_selectables.filter(o => o.userData._selectable && o.userData.onSelect))

        var obj = null
        if (intersects.length) {
            obj = intersects[0].object
            if (_selected.indexOf(obj) == -1) {
                _selected.push(obj)
            }

            obj.userData.onSelect()
            THWOMP.render()
        } else {
            if (_selected.length > 0) {
                _selected.filter(s => s.userData.onSelectRemove).forEach(s => s.userData.onSelectRemove())
                _selected = []
            }
        }

    }

    THWOMP.fireSelect = function(x, y){
        THWOMP.select(x,y)
    }

    THWOMP.fireSelectCenter = function(){
        return THWOMP.fireSelect(window.innerWidth/2, window.innerHeight/2)
    }

    /*
    window.addEventListener('select', function(e){
        THWOMP.select(e.clientX, e.clientY)
    }, false)
    */

    
})()
