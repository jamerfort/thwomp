(function(){

    var keys = {
        'enter': 13,
        'shift': 16,
        'spacebar': 32,
        'left': 37,
        'up': 38,
        'right': 39,
        'down': 40,
    }

    document.addEventListener('keydown', function(e){

        switch (e.key.toLowerCase()) {
            case 'enter':
                if (e.shiftKey) {
                    THWOMP.fireSelectCenter()
                } else {
                    THWOMP.fireClickCenter()
                }
                break

            case 'k':
            case 'arrowup':
                if (e.shiftKey) {
                    THWOMP.moveTween({rotate_up: THWOMP.config['keyboard.deltaRotate']})
                } else {
                    THWOMP.moveTween({up: THWOMP.config['keyboard.deltaY']})
                }
                break

            case 'j':
            case 'arrowdown':
                if (e.shiftKey) {
                    THWOMP.moveTween({rotate_down: THWOMP.config['keyboard.deltaRotate']})
                } else {
                    THWOMP.moveTween({down: THWOMP.config['keyboard.deltaY']})
                }
                break

            case 'h':
            case 'arrowleft':
                if (e.shiftKey) {
                    THWOMP.moveTween({rotate_left: THWOMP.config['keyboard.deltaRotate']})
                } else {
                    THWOMP.moveTween({left: THWOMP.config['keyboard.deltaX']})
                }
                break

            case 'l':
            case 'arrowright':
                if (e.shiftKey) {
                    THWOMP.moveTween({rotate_right: THWOMP.config['keyboard.deltaRotate']})
                } else {
                    THWOMP.moveTween({right: THWOMP.config['keyboard.deltaX']})
                }
                break

            case 'i':
                if (e.shiftKey) {
                    THWOMP.moveTween({rotate_counter_clockwise: THWOMP.config['keyboard.deltaRotate']})
                } else {
                    THWOMP.moveTween({forward: THWOMP.config['keyboard.deltaZ']})
                }
                break

            case 'o':
                if (e.shiftKey) {
                    THWOMP.moveTween({rotate_clockwise: THWOMP.config['keyboard.deltaRotate']})
                } else {
                    THWOMP.moveTween({backward: THWOMP.config['keyboard.deltaZ']})
                }
                break

            case ' ':
                if (e.shiftKey) {
                    THWOMP.moveTween({backward: THWOMP.config['keyboard.deltaZ']})
                } else {
                    THWOMP.moveTween({forward: THWOMP.config['keyboard.deltaZ']})
                }
                break

            case '<':
                THWOMP.moveTween({rotate_counter_clockwise: THWOMP.config['keyboard.deltaRotate']})
                break

            case '>':
                THWOMP.moveTween({rotate_clockwise: THWOMP.config['keyboard.deltaRotate']})
                break

        }
    })

})()
