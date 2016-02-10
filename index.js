// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

var $ = require('jquery');
var init = require('./dist/urth/widgets/ext/notebook/js/init/init');

exports.init =  init;

var Events = function () {};

var events = new Events();


//shim in IPython
window.IPython = {
    notebook: {
        events: $([events])
    }
};
