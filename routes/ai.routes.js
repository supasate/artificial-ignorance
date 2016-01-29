'use strict';

module.exports = function (app) {
    var ai = require('../controllers/ai.controller');

    app.route('/ai/play').post(ai.play);
    app.route('/ai/move').post(ai.move);

};
