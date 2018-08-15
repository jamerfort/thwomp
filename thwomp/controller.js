(function(){
    // From: Underscore.js
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    var click =  debounce(function () {
        THWOMP.fireClickCenter()
    }, 30, true)

    var select =  debounce(function () {
        THWOMP.fireSelectCenter()
    }, 30, true)

    function getButton(gp, btn_key) {
        var btn = THWOMP.config['controller.buttons.' + btn_key]
        return gp.buttons[btn]
    }

    function isButtonPressed(gp, btn_key) {
        return getButton(gp, btn_key).pressed
    }

    function getAxisValue(gp, axis_key) {
        var axis = THWOMP.config['controller.axes.' + axis_key]
        var meta_btn = THWOMP.config['controller.axes.' + axis_key + '.meta_button']
        var threshold = THWOMP.config['controller.axes.' + axis_key + '.threshold']
        var scale = THWOMP.config['controller.axes.' + axis_key + '.scale']

        if (meta_btn < 0 && gp.buttons[-meta_btn].pressed) {
            // We don't want to read this axis if the meta button IS pressed
            return 0
        }

        if (meta_btn > 0 && !gp.buttons[meta_btn].pressed) {
            // We only want to read this axis if the meta button IS pressed
            return 0
        }

        var value = gp.axes[axis]

        return (Math.abs(value) >= threshold) ? (value * scale) : 0
    }

    function getControllerValues(gp) {
        var gamepad_idx = THWOMP.config['controller.index']

        var gamepads = navigator.getGamepads();
        if ( gamepads.length < 1 ) {
            return
        }

        var gp = gamepads[gamepad_idx]

        var controller = {}

        //isFirePressed
        controller.isFirePressed = isButtonPressed(gp, 'fire')
        controller.isSelectPressed = isButtonPressed(gp, 'select')
        
        //move.*
            controller.move = {}

            // left_right
            controller.move.left_right = getAxisValue(gp, 'move.left_right')

            // up_down
            controller.move.up_down = getAxisValue(gp, 'move.up_down')

            // forward_backward
            controller.move.forward_backward = getAxisValue(gp, 'move.forward_backward')
        
        //rotate.*
            controller.rotate = {}

            // left_right
            controller.rotate.left_right = getAxisValue(gp, 'rotate.left_right')

            // up_down
            controller.rotate.up_down = getAxisValue(gp, 'rotate.up_down')

            // clockwise
            controller.rotate.clockwise = getAxisValue(gp, 'rotate.clockwise')
        
        return controller
    }

    function update() {
        var controller = getControllerValues()

        if ( controller.isFirePressed ) {
            click();
        }

        if (controller.isSelectPressed) {
            select()
        }

        var movecmd = {shouldRender: false}

        if (controller.move.left_right) {
            movecmd.right = controller.move.left_right
            movecmd.shouldRender = true
        }

        if (controller.move.up_down) {
            movecmd.up = controller.move.up_down
            movecmd.shouldRender = true
        }

        if (controller.move.forward_backward) {
            movecmd.forward = controller.move.forward_backward
            movecmd.shouldRender = true
        }

        if (controller.rotate.up_down) {
            movecmd.rotate_up = controller.rotate.up_down
            movecmd.shouldRender = true
        }

        if (controller.rotate.left_right) {
            movecmd.rotate_right = controller.rotate.left_right
            movecmd.shouldRender = true
        }

        if (controller.rotate.clockwise) {
            movecmd.rotate_clockwise = controller.rotate.clockwise
            movecmd.shouldRender = true
        }

        if (movecmd.shouldRender) {
            THWOMP.move(movecmd)
        }

        requestAnimationFrame(update);

    }

    window.addEventListener('gamepadconnected', function(e){
        console.log("Gamepad detected...")
        update()
    })
})()
