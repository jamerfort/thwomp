(function(){
    var _clickables = null

    THWOMP.clearClickables = function(){
        _clickables = []
    }
    THWOMP.clearClickables()

    THWOMP.addClickable = function(obj){
        if ( ! obj.userData._wasClickable ) {
            _clickables.push(obj)
        }
        obj.userData._wasClickable = true
        obj.userData._clickable = true
    }

    THWOMP.pauseClickable = function(obj){
        obj.userData._clickable = false
    }

    THWOMP.resumeClickable = function(obj){
        if (obj.userData._wasClickable) {
            obj.userData._clickable = true
        }
    }

    THWOMP.removeClickable = function(obj){
        if (!obj.userData._wasClickable) {
            return
        }

        var idx = _clickables.indexOf(obj)
        
        if (idx >= 0) {
            _clickables.splice(idx, 1)
        }

        delete obj.userData._wasClickable
        delete obj.userData._clickable
    }

    THWOMP.click = function(x,y){
        var raycaster = new THREE.Raycaster();
        var ptr = new THREE.Vector2();

        ptr.x = ( x / window.innerWidth ) * 2 - 1;
        ptr.y = - ( y / window.innerHeight ) * 2 + 1;

        raycaster.setFromCamera( ptr, THWOMP.camera );

        var intersects = raycaster.intersectObjects(_clickables.filter(o => o.userData._clickable && o.userData.onClick))

        if (intersects.length) {
            intersects[0].object.userData.onClick()
            THWOMP.render()
        }

    }

    THWOMP.fireClick = function(x, y){
        var e = new Event('click');
        e.clientX = x
        e.clientY = y
        window.dispatchEvent(e);
    }

    THWOMP.fireClickCenter = function(){
        return THWOMP.fireClick(window.innerWidth/2, window.innerHeight/2)
    }

    window.addEventListener('click', function(e){
        THWOMP.click(e.clientX, e.clientY)
    }, false)

    
})()
