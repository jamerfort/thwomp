(function(){

    function random(min, max) {
        var diff = max - min
        return (Math.random() * diff) + min
    }

    function randomInt(min, max) {
        return Math.floor(random(min, max))
    }

    function get(options, key, default_val){
        options = options || {};
        
        var rslt = options[key] != null ? options[key] : default_val

        return typeof rslt == 'function' ? rslt() : rslt
    }

    var _phi = 1.6180339887;
    var _colordiff = 0xffffff/_phi;
    function nextFibColor(last) {
        return Math.round((last + _colordiff) % 0xffffff)
    }

    THWOMP.utils = {
        random,
        randomInt,
        get,

        nextFibColor,
    }

})();
