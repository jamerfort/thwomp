THWOMP.config['scene.background.color'] = 0xdddddd

//THWOMP.config['scene.background.360.url'] = '/path/to/360.jpg'
THWOMP.config['scene.background.360.radius'] = 1000
THWOMP.config['scene.background.360.segmentCount'] = 32

THWOMP.config['camera.fov'] = 50
THWOMP.config['camera.near'] = .1
THWOMP.config['camera.far'] = 2000

THWOMP.config['camera.initial.x'] = 0
THWOMP.config['camera.initial.y'] = 0
THWOMP.config['camera.initial.z'] = 5

//THWOMP.config['camera.default.easing'] = TWEEN.Easing.Quartic.InOut
//THWOMP.config['camera.default.easing'] = TWEEN.Easing.Cubic.InOut
//THWOMP.config['camera.default.easing'] = TWEEN.Easing.Linear.None
THWOMP.config['camera.default.easing'] = TWEEN.Easing.Sinusoidal.InOut

THWOMP.config['camera.default.tween.duration'] = 100

//THWOMP.config['object.default.easing'] = TWEEN.Easing.Quartic.InOut
//THWOMP.config['object.default.easing'] = TWEEN.Easing.Cubic.InOut
//THWOMP.config['object.default.easing'] = TWEEN.Easing.Linear.None
THWOMP.config['object.default.easing'] = TWEEN.Easing.Sinusoidal.InOut

THWOMP.config['object.default.tween.duration'] = 100

THWOMP.config['reticle'] = THWOMP.Reticles.Point()

THWOMP.config['keyboard.delta'] = .25
THWOMP.config['keyboard.deltaX'] = 1 
THWOMP.config['keyboard.deltaY'] = 1 
THWOMP.config['keyboard.deltaZ'] = 5
THWOMP.config['keyboard.deltaRotate'] = Math.PI/10


THWOMP.config['controller.index'] = 0

//Controller Button configs
THWOMP.config['controller.buttons.fire'] = 1
THWOMP.config['controller.buttons.select'] = 2

//Controller Joystick configs
THWOMP.config['controller.axes.move.left_right'] = 0
THWOMP.config['controller.axes.move.left_right.meta_button'] = null
THWOMP.config['controller.axes.move.left_right.threshold'] = 0.05
THWOMP.config['controller.axes.move.left_right.scale'] = .3 

THWOMP.config['controller.axes.move.up_down'] = 2
THWOMP.config['controller.axes.move.up_down.meta_button'] = 4 
THWOMP.config['controller.axes.move.up_down.threshold'] = 0.05
THWOMP.config['controller.axes.move.up_down.scale'] = -.3

THWOMP.config['controller.axes.move.forward_backward'] = 1
THWOMP.config['controller.axes.move.forward_backward.meta_button'] = null 
THWOMP.config['controller.axes.move.forward_backward.threshold'] = 0.05
THWOMP.config['controller.axes.move.forward_backward.scale'] = -.3 

THWOMP.config['controller.axes.rotate.up_down'] = 2
THWOMP.config['controller.axes.rotate.up_down.meta_button'] = -4 
THWOMP.config['controller.axes.rotate.up_down.threshold'] = 0.05
THWOMP.config['controller.axes.rotate.up_down.scale'] = -.02

THWOMP.config['controller.axes.rotate.left_right'] = 5
THWOMP.config['controller.axes.rotate.left_right.meta_button'] = -4
THWOMP.config['controller.axes.rotate.left_right.threshold'] = 0.05
THWOMP.config['controller.axes.rotate.left_right.scale'] = .02

THWOMP.config['controller.axes.rotate.clockwise'] = 5
THWOMP.config['controller.axes.rotate.clockwise.meta_button'] = 4
THWOMP.config['controller.axes.rotate.clockwise.threshold'] = 0.05
THWOMP.config['controller.axes.rotate.clockwise.scale'] = .02
