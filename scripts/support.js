var support = (function () {

    "use strict";

    function getRand(min, max) {
        return Math.random() * (max - min) + min;
    }

    return {
        getRand: getRand
    }

})();