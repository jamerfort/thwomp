(function(){
    var get = THWOMP.utils.get

    function position(obj, options){
        obj.position.x = get(options, 'x', 0)
        obj.position.y = get(options, 'y', 0)
        obj.position.z = get(options, 'z', 0)
    }

    function rotate(obj, options){
        obj.rotation.x = get(options, 'rotX', 0)
        obj.rotation.y = get(options, 'rotY', 0)
        obj.rotation.z = get(options, 'rotZ', 0)
    }

    function place(obj, options){
        position(obj, options)
        rotate(obj, options)
    }

    function addBorder(obj, options) {
        if ( options.border != null ) {
            var edges = new THREE.EdgesGeometry( obj.geometry );
            var edge_lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial(options.border));
            obj.add(edge_lines);

            return edge_lines
        }
    }

    function Box(options) {
        options = options || {}
        var h = get(options, 'height', 1)
        var w = get(options, 'width', 1)
        var d = get(options, 'depth', 1)
        var color = get(options, 'color', 0x00ff00)

        var geometry = new THREE.BoxGeometry( w,h, d );
        var material
        if ( options.material != null ) {
            material = options.material
        } else {
            //material = new THREE.MeshLambertMaterial( { color: color, side: THREE.DoubleSide } );
            material = new THREE.MeshStandardMaterial( { color: color, side: THREE.DoubleSide } );
        }
        var box = new THREE.Mesh( geometry, material );

        options.border = {color: '#333'}

        addBorder(box, options);
        place(box, options)

        box.castShadow = true
        box.receiveShadow = true

        return box;
    }

    function Plane(options) {
        options = options || {}
        var h = get(options, 'height', 1)
        var w = get(options, 'width', 1)
        var color = get(options, 'color', 0x00ff00)

        var geometry = new THREE.PlaneGeometry( h,w );
        var material
        if ( options.material != null ) {
            material = options.material
        } else {
            //material = new THREE.MeshLambertMaterial( { color: color, side: THREE.DoubleSide } );
            material = new THREE.MeshStandardMaterial( { color: color, side: THREE.DoubleSide } );
        }
        var plane = new THREE.Mesh( geometry, material );

        place(plane, options)

        plane.receiveShadow = true;

        return plane;
    }

    function Cube(options) {
        options = options || {}
        options.height = get(options, 'side', 1)
        options.width = options.height
        options.depth = options.height

        return Box(options)
    }

    function Floor(options) {
        options = options || {}
        var width = get(options, 'width', 100)
        var depth = get(options, 'depth', 100)
        var color = get(options, 'color', 0x8080a0)

        options.width = width
        options.height = depth
        options.color = color
        options.rotX = Math.PI/2

        return Plane(options)
    }

    function TextMaterial(txt, font) {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        var x = canvas.width / 2;
        var y = canvas.height / 2;
        context.font = "30pt Calibri";
        context.textAlign = "center";
        context.fillRect(0,0,600,600);
        context.fillStyle = "red";
        context.fillText("Hello World!", x, y);

        document.body.appendChild( canvas )

        var texture = new THREE.Texture(canvas)
        texture.needsUpdate = true

        return new THREE.MeshBasicMaterial({map: texture, transparent: true})
    }

    function Label(options) {
        options = options || {}
        options.height = get(options, 'height', 2)
        options.width = get(options, 'width', 4)
        options.depth = get(options, 'depth', .1)
        options.color = get(options, 'color', 0x804080)

        //options.material = TextMaterial("This is a test", '30pt Calibri', options)

        return Box(options)
    }

    function Group(objs) {
        var grp = new THREE.Group()

        objs.forEach((o) => {grp.add(o)})

        return grp
    }

    function Line(start, end, options) {
        options = options || {}
        var color = get(options, 'color', 0x0000ff)
        var linewidth = get(options, 'linewidth', 1)

        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(start.x, start.y, start.z))
        geometry.vertices.push(new THREE.Vector3(end.x, end.y, end.z))
        var material
        if ( options.material != null ) {
            material = options.material
        } else {
            material = new THREE.LineBasicMaterial( { color: color , linewidth: linewidth} );
        }
        var line = new THREE.Line( geometry, material );
        return line;
    }

    function connect(obj1, obj2, options) {
        var pos1 = new THREE.Vector3()
        var pos2 = new THREE.Vector3()
        obj1.getWorldPosition(pos1)
        obj2.getWorldPosition(pos2)

        var line = Line(pos1, pos2, options)

        var renderLine = function(){
            var pos1 = new THREE.Vector3()
            var pos2 = new THREE.Vector3()
            obj1.getWorldPosition(pos1)
            obj2.getWorldPosition(pos2)
            line.geometry.vertices[0].setX(pos1.x)
            line.geometry.vertices[0].setY(pos1.y)
            line.geometry.vertices[0].setZ(pos1.z)
            line.geometry.vertices[1].setX(pos2.x)
            line.geometry.vertices[1].setY(pos2.y)
            line.geometry.vertices[1].setZ(pos2.z)
            line.geometry.verticesNeedUpdate = true
            line.geometry.computeBoundingSphere()
        }

        line.onBeforeRender = renderLine

        return line
    }

    function Text(text, options) {
        console.log(options)
        options = options || {};

        /////// draw text on canvas /////////

        // create a canvas element
        var canvas1 = document.createElement('canvas');
        var context1 = canvas1.getContext('2d');
        canvas1.width = 2048;
        canvas1.height = 128;
        //context1.font = "Bold 100px Arial";
        context1.font = "100px Courier";
        context1.fillStyle = "rgba(255,0,0,0.95)";
        context1.textAlign = 'center';
        context1.textBaseline = 'middle';
        context1.fillText(text, canvas1.width/2, canvas1.height/2);

        // canvas contents will be used for a texture
        var texture1 = new THREE.Texture(canvas1) 
        texture1.needsUpdate = true;

        var material1 = new THREE.MeshBasicMaterial( {map: texture1, side:THREE.DoubleSide } );
        material1.transparent = true;

        var mesh1 = new THREE.Mesh(
        new THREE.PlaneGeometry(canvas1.width/200, canvas1.height/200),
            material1
        );

        addBorder(mesh1, options);
        place(mesh1, options)

        return mesh1;
    }

    var obj = {
        position,
        rotate,
        place,
        addBorder,
        connect,

        Box,
        Plane,
        Cube,
        Floor,
        TextMaterial,
        Label,
        Group,
        Line,
        Text
    }

    Object.entries(obj).forEach((kv) => {
        var key = kv[0]
        var val = kv[1]
        THWOMP[key] = val
    })

})();
